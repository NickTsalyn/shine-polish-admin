'use client'

import {useState} from "react";
import { useContext, ReactNode, useEffect } from "react";
import { AuthContext } from "@/components/AuthContext";
import { useRouter } from "next/navigation";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      if (isLoading) {
        setIsLoading(false);
      } else if (!isLoggedIn) {
        router.push("/"); 
      }
    };
    checkAuth();
  }, [isLoggedIn, router, isLoading]);

  return <>{children}</>;
};