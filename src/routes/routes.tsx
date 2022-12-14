import React from "react";
import { Navigate, Route } from "react-router-dom";

import WelcomePage from "../pages/Welcome";
import TopArtistsPage from "../pages/Top/Artists";
import TopTracksPage from "../pages/Top/Tracks";
import LabPage from "../pages/Lab";
import OauthCallbackPage from "pages/OauthCallback";
import { PrivateRoute } from "./PrivateRoute";
import { DiscoverPage } from "pages/Discover";

export const publicRoutes = (
  <>
    <Route path="/" element={<WelcomePage />} />
    <Route path="/oauth_callback/*" element={<OauthCallbackPage />} />
  </>
);

export const privateRoutes = (
  <>
    <Route
      path="/top"
      element={
        <PrivateRoute>
          <Navigate to="/top/tracks" />
        </PrivateRoute>
      }
    />

    <Route
      path="/top/artists"
      element={
        <PrivateRoute>
          <TopArtistsPage />
        </PrivateRoute>
      }
    />

    <Route
      path="/top/tracks"
      element={
        <PrivateRoute>
          <TopTracksPage />
        </PrivateRoute>
      }
    />

    <Route
      path="/lab"
      element={
        <PrivateRoute>
          <LabPage />
        </PrivateRoute>
      }
    />

    <Route
      path="/discover"
      element={
        <PrivateRoute>
          <DiscoverPage />
        </PrivateRoute>
      }
    >
      <Route path=":artistId" />
    </Route>
  </>
);
