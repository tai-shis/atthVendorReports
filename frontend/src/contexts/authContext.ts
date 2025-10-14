import { createContext } from "react";
import type { User } from "../models/user";

interface AuthContextData {
  user: User | undefined;
  isAuthenticated: boolean;
  authToken: string | undefined;
  loading: boolean;
  register: (email: string, password: string, vendorID: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// will be honest, not sure how context works completely
export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);