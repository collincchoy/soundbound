import React from "react";
import "./App.css";
import { Section } from "react-bulma-components";
import { TopPage } from "./pages/Top";
import { MusicPlayerProvider } from "./components/musicPlayer";
import NavHeader from "./components/nav/Nav";
import { LoginContextProvider } from "./hooks";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <LoginContextProvider>
        <Router>
          <NavHeader />
          <MusicPlayerProvider>
            <Section id="content">
              <Switch>
                <Route path="/top">
                  <TopPage />
                </Route>
                <Route path="/">
                  <TopPage />
                </Route>
              </Switch>
            </Section>
          </MusicPlayerProvider>
        </Router>
      </LoginContextProvider>
    </div>
  );
}

export default App;
