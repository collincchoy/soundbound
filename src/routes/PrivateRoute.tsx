import React from "react";
import { Navigate } from "react-router";
import { useLoginContext } from "../hooks/Login";

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isLoggedIn } = useLoginContext();
  if (!isLoggedIn) return <Navigate to="/" />;
  return children;
};
