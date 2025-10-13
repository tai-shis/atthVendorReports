// Types
import type { ReactNode } from "react";
import type { User } from "../models/user";

import { AuthContext } from "../contexts/authContext";
import { useAuth } from "../hooks/useAuth";
import { useState, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router";
import { Loader2Icon } from "lucide-react";
import axios from 'axios';


const apiURL = import.meta.env.API_URL || 'http://localhost:8080';

// All of these comments are for personal reference/journaling and learning while I re-read the code I wrote during a hackathon
export function AuthProvider({ children }: { children: ReactNode }) {
  // We store and manage the auth token on local window storage
  const [authToken, setAuthToken] = useState<string | undefined>(
    localStorage.getItem('authToken') ?? undefined
  );

  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  // Login provider
  // This function will be called in the frontend in a wrapper function that calls this one
  // wrapper function will handle catching, displaying errors, etc.
  async function register(email: string, password: string, vendorName: string) {
    // when you are loading, we want to make sure not to pass authentication checks
    // see in ProtectedRoutes.
    setLoading(true); 

    await axios.post(
      `${apiURL}/auth/login`,
      { email, password, vendorName }
    ).catch((err) => {
      setLoading(false);
      throw new Error(err.response.data.error);
    });

    setLoading(false);
    navigate("/login");
  }

  async function login(email: string, password: string) {
    setLoading(true);

    const res = await axios.post(
      `${apiURL}/auth/login`,
      { email, password }
    ).catch((err) => {
      setLoading(false);
      throw new Error(err.response.data.error);
    });

    setAuthToken(res.data.authToken);
    localStorage.setItem('authToken', res.data.authToken);
    setLoading(false);
  }

  function logout() {
    setAuthToken(undefined);
    localStorage.removeItem('authToken');
    navigate("/");
  }

  // on change of authToken, we can store user info
  useEffect(() => {
    if (authToken) {
      // for reference, jwt tokens are header.payload.signatore so index 1 gets us the user
      setUser(JSON.parse(atob(authToken.split('.')[1])).vendorName);
      setIsAuthenticated(true);
    } else {
      setUser(undefined);
      setIsAuthenticated(false);
    }
  }, [authToken]);

  // on load, check if we have a token in local storage
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      setAuthToken(authToken);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{user, isAuthenticated, authToken, loading, register, login, logout}}
    >
      {children}
    </AuthContext.Provider>
  );
} 

export const ProtectedRoutes = () => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return (
      <div className='flex justify-center w-screen h-screen items-center'>
        <Loader2Icon className="w-10 h-10 animate-spin" />
      </div>
    );
  } 
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}