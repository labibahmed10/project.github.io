import { ReactNode } from "react";
import userStore from "@/store/authStore";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { token } = userStore();

  if (!token) {
    return <Navigate to="/sign-in" replace />; // Redirect to login on unauthorized access
  }

  return children; // Render the child component if authorized
};
