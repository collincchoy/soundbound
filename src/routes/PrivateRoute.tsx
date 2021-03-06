import React from "react";
import { Redirect, RouteProps, Route } from "react-router";
import { useLoginContext } from "../hooks/Login";

export const PrivateRoute: React.FC<RouteProps> = ({ children, ...props }) => {
  const { isLoggedIn } = useLoginContext();
  return (
    <Route {...props}>{!isLoggedIn ? <Redirect to="/" /> : children}</Route>
  );
};
