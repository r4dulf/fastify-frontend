import { useMeQuery } from "../../api/query/me";
import { createContext } from "react";

type AuthContextType = {
  user: ReturnType<typeof useMeQuery>["data"];
  isLoading: boolean;
  isLoginPending: boolean;
  isAuthenticated: boolean;

  register: (credentials: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);
