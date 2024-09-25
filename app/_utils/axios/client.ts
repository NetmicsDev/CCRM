"use client";
import { SimpleError } from "@/app/_types/error";
import axios, { AxiosError, AxiosResponse } from "axios";
import Cookies from "js-cookie"; // 클라이언트에서 쿠키를 읽기 위한 js-cookie
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Axios 인스턴스 생성
const axiosClient = axios.create({
  baseURL: `http://${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_SERVER_PORT}/api`, // 기본 API URL 설정
  timeout: 10000, // 10초 타임아웃 설정
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터: JWT 토큰을 자동으로 헤더에 추가
axiosClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token"); // 쿠키에서 JWT 토큰 가져오기
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Authorization 헤더에 토큰 추가
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터: 에러 처리 (필요한 경우)
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // 인증 실패 처리
    if (
      error.response?.status === 401 &&
      window.location.pathname !== "/sign-in"
    ) {
      console.error("인증 오류: 로그인이 필요합니다.");
      // revalidatePath 는 server에서만 가능
      // revalidatePath("/");

      // NEXT_REDIRECT_ERROR 발생
      // redirect는 try-catch문 말고 finally안에서 동작해야한다
      // 컴포넌트 내부에 선언하는 것도 가능하지만 이렇게 내부동작 중에 호출할 수는 없는듯.
      // redirect("/sign-in");
      return Promise.reject<SimpleError>({
        type: "unauthorized",
        message: "401 ERROR - Move to Sign-in Page",
      });
    }
    return Promise.reject(error);
  }
);

// 공통 처리 함수: 요청을 보낸 후 성공 및 실패 처리
export const handleRequest = async (
  promise: Promise<AxiosResponse>
): Promise<{ data?: any; error?: SimpleError }> => {
  let data, error;
  try {
    const response = await promise;
    data = response.data; // 성공 시 데이터 반환
  } catch (_error: any) {
    // 에러 처리: SimpleError 타입으로 변환
    if (axios.isAxiosError(_error)) {
      error = {
        type: "axios",
        message: _error.response?.data?.message,
      };
    } else if (_error.type === "unauthorized") {
      error = _error;
    } else {
      error = {
        type: "unknown",
        message: _error instanceof Error ? _error.message : "unknown error",
      };
    }
  } finally {
    if (error && error.type === "unauthorized") {
      redirect("/sign-in");
    }
  }

  return { data, error };
};

export default axiosClient;
