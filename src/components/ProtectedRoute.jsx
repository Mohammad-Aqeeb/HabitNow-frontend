"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Spinner from "./Spinner/Spinner";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated , loading} = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  if(loading){
    return <Spinner></Spinner>
  }
  if (!isAuthenticated) {
    return null; // or a loading spinner
  }

  return children;
};

export default ProtectedRoute;