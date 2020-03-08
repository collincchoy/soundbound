import React from "react";
import "_variables.scss";
import { MusicPlayerProvider } from "./components/MusicPlayer/Context";
import { LoginContextProvider } from "./hooks/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route
  // Redirect
} from "react-router-dom";
import TopArtistsPage from "./pages/Top/Artists";
import TopTracksPage from "./pages/Top/Tracks";
import LabPage from "./pages/Lab";
import WelcomePage from "./pages/Welcome";

function App() {
  return (
    <LoginContextProvider>
      <Router>
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
              <WelcomePage />
              {/* <TopArtistsPage /> */}
              {/* <Redirect to="/top/artists" /> Note: this breaks auth flow - race condition in token parsing and this redirect*/}
            </Route>
          </Switch>
        </MusicPlayerProvider>
      </Router>
    </LoginContextProvider>
  );
}

export default App;
