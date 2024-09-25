"use client";

import { handleRequest } from "./../_utils/axios/client";
import axiosClient from "../_utils/axios/client";
import Cookies from "js-cookie";

export async function signIn(username: string, password: string) {
  const { data, error } = await handleRequest(
    axiosClient.post("/auth/login", {
      username,
      password,
    })
  );

  if (error) {
    return { error };
  }

  const { jwtToken, message } = data;
  console.log(message, jwtToken);

  Cookies.set("token", jwtToken, {
    expires: 30,
  });

  return;
}
