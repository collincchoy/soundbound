import React from "react";
import { MusicPlayerProvider } from "./components/MusicPlayer/Context";
import NavBar from "./components/Nav/Bar";
import { LoginContextProvider } from "./hooks";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import MusicPlayer from "./components/MusicPlayer";
import TopArtistsPage from "./pages/Top/Artists";
import TopTracksPage from "./pages/Top/Tracks";
import LabPage from "./pages/Lab";

function App() {
  return (
    <LoginContextProvider>
      <Router>
        <NavBar />
        <MusicPlayerProvider>
          <Switch>
            <Route path="/lab">
              <LabPage />
            </Route>
            <Route path="/top/artists">
              <TopArtistsPage />
            </Route>
            <Route path="/top/tracks">
              <TopTracksPage />
            </Route>
            <Route path="/">
              <Redirect to="/top/artists" />
            </Route>
          </Switch>
          <MusicPlayer />
        </MusicPlayerProvider>
      </Router>
    </LoginContextProvider>
  );
}

export default App;
