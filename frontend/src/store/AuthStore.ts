import { create } from "zustand";

interface AuthState {
  auth: Record<string, any>;
  setAuth: (auth: Record<string, any>) => void;
}

const AuthStore = create<AuthState>((set) => ({
  auth: {},
  setAuth: (auth) => set({ auth }),
}));

export default AuthStore;
