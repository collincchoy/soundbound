import React from "react";
import "./App.css";
import { TopPage } from "./pages/Top";
import { MusicPlayerProvider } from "./components/MusicPlayer/Context";
import NavBar from "./components/Nav/Bar";
import { LoginContextProvider } from "./hooks";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MusicPlayer from "./components/MusicPlayer";
import TopArtistsPage from "./pages/Top/Artists";
import TopTracksPage from "./pages/Top/Tracks";

function App() {
  return (
    <div className="App">
      <LoginContextProvider>
        <Router>
          <NavBar />
          <MusicPlayerProvider>
            <div id="content">
              <Switch>
                <Route path="/top/artists">
                  <TopArtistsPage />
                </Route>
                <Route path="/top/tracks">
                  <TopTracksPage />
                </Route>
                <Route path="/">
                  <TopPage />
                </Route>
              </Switch>
            </div>
            <MusicPlayer />
          </MusicPlayerProvider>
        </Router>
      </LoginContextProvider>
    </div>
  );
}

export default App;
