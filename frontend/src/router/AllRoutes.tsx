import App from "@/App";
import { ProtectedRoute } from "@/components/Protected/ProtectedRoute";
import DashBoard from "@/pages/Dashboard/Dashboard";
import SignInPage from "@/pages/sign-in/SignInPage";
import SignUpPage from "@/pages/sign-up/SignUpPage";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "sign-in",
        element: <SignInPage />,
      },
      {
        path: "sign-up",
        element: <SignUpPage />,
      },
      {
        path: "",
        element: (
          <ProtectedRoute>
            <DashBoard />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
