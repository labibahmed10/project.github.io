/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import useAuthStore from "../store/authStore";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  headers: {
    "Content-type": "application/json",
  },
});

instance.interceptors.request.use(
  (request) => request,
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

const useLoginMutation = () => {
  const { logIn } = useAuthStore();

  return useMutation({
    mutationFn: async (userData: { email: string; password: string }) => {
      return await instance.post("/login", userData);
    },
    onSuccess: (data) => {
      const {
        data: { data: userData },
      } = data;
      return logIn(userData);
    },
    onError: (error) => console.error("Login error:", error), // Handle errors
  });
};

const useSignupMutation = () => {
  const { logIn } = useAuthStore();

  return useMutation({
    mutationFn: async (userData: { name: string; email: string; password: string }) => {
      return await instance.post("/signup", userData);
    },
    onSuccess: (data) => {
      const {
        data: { data: userData },
      } = data;
      return logIn(userData);
    }, // Update store with token
    onError: (error) => console.error("Login error:", error), // Handle errors
  });
};

export { useLoginMutation, useSignupMutation };
