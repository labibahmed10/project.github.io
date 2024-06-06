import App from "@/App";
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
        path: "dashboard",
        element: <DashBoard />,
      },
    ],
  },
]);

export default router;
