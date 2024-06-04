import App from "@/App";
import SignInPage from "@/pages/sign-in/SignInPage";
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
    ],
  },
]);

export default router;
