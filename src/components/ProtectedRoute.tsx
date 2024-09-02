'use client'

import { useContext, ReactNode, useEffect } from "react";
import { AuthContext } from "@/components/AuthContext";
import { useRouter } from "next/navigation";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/"); 
    }
  }, [isLoggedIn, router]);

//   if (!isLoggedIn) {
//     return null; 
//   }

  return <>{children}</>;
};