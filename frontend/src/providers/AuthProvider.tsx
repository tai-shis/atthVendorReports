// Types
import type { ReactNode } from "react";
import { User } from "../models/user";

import { AuthContext } from "../contexts/authContext";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from 'axios';


const apiURL = import.meta.env.API_URL || 'http://localhost:8080';

// All of these comments are for personal reference/journaling and learning while I re-read the code I wrote during a hackathon
export function AuthProvider({ children }: { children: ReactNode }) {
  // We store and manage the auth token on local window storage
  const [authToken, setAuthToken] = useState<string | undefined>(
    window.localStorage.getItem('authToken') ?? undefined
  );

  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  // Login provider
  // This function will be called in the frontend in a wrapper function that calls this one
  // wrapper function will handle catching, displaying errors, etc.
  async function register(email: string, password: string, vendor_id: string) {
    // when you are loading, we want to make sure not to pass authentication checks
    // see in ProtectedRoutes.
    setLoading(true); 

    await axios.post(
      `${apiURL}/auth/register`,
      { email, password, vendor_id }
    ).catch((err) => {
      setLoading(false);
      throw new Error(err.response.data.error);
    });

    setLoading(false);
    navigate("/login");
  }

  async function login(email: string, password: string) {
    setLoading(true);

    const { 
      data: { authToken } 
    } = await axios.post<{authToken: string}>(
      `${apiURL}/auth/login`,
      { email, password }
    ).catch((err) => {
      setLoading(false);
      throw new Error(err.response.data.error);
    });

    setAuthToken(authToken);
    window.localStorage.setItem('authToken', authToken);
    setLoading(false);
    navigate("/");
  }

  function logout() {
    setAuthToken(undefined);
    window.localStorage.removeItem('authToken');
    navigate("/login");
  }

  // why the fuck did this solve all of my problems
  // useEffect(() => {
  //   console.log(loading, isAuthenticated);
  //   setLoading(false);
  // }, [isAuthenticated]);

  // on change of authToken, we can store user info
  // for reference, jwt tokens are header.payload.signatore so index 1 gets us the user
  useEffect(() => {
    if (!authToken) {
      setUser(undefined);
      setIsAuthenticated(false);
    } else { // the token literally exists, we checked it
      const payload = JSON.parse(atob(authToken.split('.')[1]))
      if (payload.exp > Date.now()) { // make sure the token isnt expired
        setUser(undefined);
        setIsAuthenticated(false);
      } else {   
        setUser(payload.sub);
        setIsAuthenticated(true);
      } 
    }
  }, [authToken]);

  // on load, check if we have a token in local storage
  useEffect(() => {
    setLoading(true);
    const authToken = window.localStorage.getItem('authToken');
    if (authToken) {
      setAuthToken(authToken);
    }
    setLoading(false);   
  }, []);



  return (
    <AuthContext.Provider
      value={{user, isAuthenticated, authToken, loading, register, login, logout}}
    >
      {children}
    </AuthContext.Provider>
  );
} 

