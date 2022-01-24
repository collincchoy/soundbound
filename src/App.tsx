import React from "react";
import "_variables.scss";
import { MusicPlayerProvider } from "./components/MusicPlayer/Context";
import { LoginContextProvider } from "./hooks/Login";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./routes/routes";

export default function App() {
  return (
    <LoginContextProvider>
      <Router
        {...(process.env.NODE_ENV === "production" && {
          basename: "/soundbound",
        })}
      >
        <MusicPlayerProvider>
          <Routes>
            {privateRoutes}
            {publicRoutes}
          </Routes>
        </MusicPlayerProvider>
      </Router>
    </LoginContextProvider>
  );
}
