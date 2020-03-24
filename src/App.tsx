import React from "react";
import "_variables.scss";
import { MusicPlayerProvider } from "./components/MusicPlayer/Context";
import { LoginContextProvider } from "./hooks/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./routes/routes";
import { PrivateRoute } from "routes/PrivateRoute";

export default function App() {
  return (
    <LoginContextProvider>
      <Router
        {...(process.env.NODE_ENV === "production" && {
          basename: "/soundbound"
        })}
      >
        <MusicPlayerProvider>
          <Switch>
            {privateRoutes.map(({ render: Component, ...route }) => (
              <PrivateRoute key={route.path} {...route}>
                <Component />
              </PrivateRoute>
            ))}
            {publicRoutes.map(({ render: Component, ...route }) => (
              <Route key={route.path} {...route}>
                <Component />
              </Route>
            ))}
          </Switch>
        </MusicPlayerProvider>
      </Router>
    </LoginContextProvider>
  );
}
