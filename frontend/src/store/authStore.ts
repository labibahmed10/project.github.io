import { create } from "zustand";
import { persist } from "zustand/middleware"; // For persisting the access token

interface IUserAuth {
  email: string;
  token: string;
}

interface IActions {
  logIn: (data: IUserAuth) => void;
  logOut: () => void;
}

const initialState: IUserAuth = {
  email: "",
  token: "",
};

const userStore = create<IUserAuth & IActions>()(
  persist(
    (setState) => ({
      ...initialState,

      logIn: (data: IUserAuth) => {
        setState({
          email: data.email,
          token: data.token,
        });
      },

      logOut: () => {
        setState({
          ...initialState,
        });
      },
    }),
    {
      name: "auth",
    }
  )
);

export default userStore;
