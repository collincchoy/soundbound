import React from "react";
import "./App.css";
import { Section } from "react-bulma-components";
import { TopPage } from "./pages/Top";
import { MusicPlayerProvider } from "./components/MusicPlayer/Context";
import NavBar from "./components/Nav/Bar";
import { LoginContextProvider } from "./hooks";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MusicPlayer from "./components/MusicPlayer";

function App() {
  return (
    <div className="App">
      <LoginContextProvider>
        <Router>
          <NavBar />
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
            <MusicPlayer />
          </MusicPlayerProvider>
        </Router>
      </LoginContextProvider>
    </div>
  );
}

export default App;
