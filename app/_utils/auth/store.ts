import { create, State } from "zustand";
import {
  createJSONStorage,
  persist,
  PersistStorage,
  StateStorage,
  StorageValue,
} from "zustand/middleware";
import Cookies from "js-cookie";
import { UserDTO } from "@/app/_models/user"; // 사용자 정의 User 모델
import { apiRequest } from "../axios/client";
import { signIn, signUp } from "@/app/_services/auth";
import RegisterModel from "@/app/_models/register";
import { useEffect, useState } from "react";

// **상태 인터페이스**
interface AuthState {
  isAuthenticated: boolean;
  user: null | UserDTO;
  token: null | string;
  tempToken: null | string; // Google 가입을 위한 임시 토큰
  error: string | null;
}

// **액션 인터페이스**
interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  register: (model: RegisterModel) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
  saveToken: (token: string) => void;
  saveTempToken: (tempToken: string) => void;
}

// **상태와 액션을 합친 스토어 인터페이스**
type AuthStore = AuthState & AuthActions;

const isProduction = process.env.NODE_ENV === "production";

// **스토어 생성**
export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // **초기 상태**
      isAuthenticated: false,
      user: null,
      token: null,
      tempToken: null,
      error: null,

      // **액션 구현**
      // 로그인 후 사용자 정보 받기
      login: async (email, password) => {
        set({ error: null });
        const { data, error } = await signIn(email, password);
        if (error) {
          set({ error: error.response?.data?.message || "로그인 실패" });
          return;
        }

        if (data) {
          const { data: user, error } = await apiRequest<UserDTO>("/users/me", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${data.jwtToken}`,
            },
          });
          if (error) {
            set({ error: error.response?.data?.message || "사용자 정보 오류" });
            return;
          }
          set({
            isAuthenticated: true,
            token: data.jwtToken,
            user,
            error: null,
          });
        }
      },

      // 회원가입
      register: async (model) => {
        set({ error: null });
        const { data, error } = await signUp(model);
        if (error) {
          set({ error: error.response?.data?.message || "회원가입 오류" });
        }
        if (data) {
          const { data: user, error } = await apiRequest<UserDTO>("/users/me", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${data.jwtToken}`,
            },
          });
          if (error) {
            set({ error: error.response?.data?.message || "사용자 정보 오류" });
            return;
          }
          set({
            isAuthenticated: true,
            token: data.jwtToken,
            tempToken: null,
            user,
            error: null,
          });
        }
      },

      // 로그아웃
      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
          token: null,
          tempToken: null,
          error: null,
        });
      },

      // 사용자 정보 가져오기
      fetchUser: async () => {
        const token = get().token;
        if (!token) {
          set({ error: "로그인 정보가 없습니다" });
          return;
        }

        set({ error: null });
        const { data: user, error } = await apiRequest<UserDTO>("/users/me", {
          method: "GET",
        });
        if (error) {
          set({ error: error.response?.data?.message || "사용자 정보 오류" });
          return;
        }
        set({ user });
      },

      saveToken: (token: string) => {
        set({ token });
      },
      saveTempToken: (tempToken: string) => {
        set({ tempToken });
      },
    }),
    {
      name: "ccrm-auth", // 저장할 키 이름
    }
  )
);

// **Hydration Error 방지를 위한 커스텀 훅**
const useStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F
) => {
  const result = store(callback) as F;
  const [data, setData] = useState<F>();

  useEffect(() => {
    setData(result);
  }, [result]);

  return data;
};

const useAuth = () => useStore(useAuthStore, (state) => state);
export default useAuth;
