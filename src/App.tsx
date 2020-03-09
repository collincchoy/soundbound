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
      <Router>
        <MusicPlayerProvider>
          <Switch>
            {privateRoutes.map(route => (
              <PrivateRoute path={route.path} key={route.path}>
                <route.component />
              </PrivateRoute>
            ))}
            {publicRoutes.map(route => (
              <Route path={route.path} key={route.path}>
                <route.component />
              </Route>
            ))}
          </Switch>
        </MusicPlayerProvider>
      </Router>
    </LoginContextProvider>
  );
}
