'use client'

import React, { createContext, useState, ReactNode, useEffect } from "react";
import { clearAuthHeader, setAuthHeader } from "../helpers/api";

interface AuthContextProps {
  token: string | null;
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  token: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const checkToken = () => {
      console.log(token);
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        setToken(savedToken);
        setAuthHeader(savedToken);
      }
      setIsLoading(false);
    };

    checkToken();
  }, []);

  const login = (token: string) => {
    setToken(token);
    localStorage.setItem("token", token);
    setAuthHeader(token);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    clearAuthHeader()
  };

  const isLoggedIn = !!token;

  return (
    <AuthContext.Provider value={{ token, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
