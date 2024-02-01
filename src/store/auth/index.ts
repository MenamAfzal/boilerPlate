import { create } from "zustand";

import { removeToken, setToken } from "@/storage";

interface AuthState {
  token: string | null;
  status: "signOut" | "signIn";
  login: (data: string) => void;
  setUserToken: (data: string) => void;
  logOut: () => void;
  loginFromVerifyCode: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  status: "signOut",
  token: null,
  login: (token: string) => {
    set({ status: "signIn", token });
    setToken(token);
  },
  loginFromVerifyCode: () => {
    set({ status: "signIn" });
  },
  setUserToken: (token: string) => {
    set({ token });
    setToken(token);
  },
  logOut: () => {
    set({ status: "signOut", token: null });
    removeToken();
  },
}));

// login
export const login = (token) => {
  return useAuth.getState().login(token);
};

// logOut
export const logOut = () => {
  return useAuth.getState().logOut();
};

export const getAuthToken = () => {
  return useAuth.getState().token;
};

export const setUserToken = (data) => {
  return useAuth.getState().setUserToken(data);
};

export const loginFromVerifyCode = () => {
  return useAuth.getState().loginFromVerifyCode();
};
