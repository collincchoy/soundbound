import React from "react";
import { Redirect } from "react-router-dom";

import WelcomePage from "../pages/Welcome";
import TopArtistsPage from "../pages/Top/Artists";
import TopTracksPage from "../pages/Top/Tracks";
import LabPage from "../pages/Lab";
import OauthCallbackPage from "pages/OauthCallback";

export const publicRoutes = [
  {
    path: "/",
    exact: true,
    render: WelcomePage,
  },
  {
    path: "/oauth_callback",
    exact: false,
    render: OauthCallbackPage,
  },
];

export const privateRoutes = [
  {
    path: "/top",
    exact: true,
    render: () => <Redirect to="/top/tracks" />,
  },
  {
    path: "/top/artists",
    exact: false,
    render: TopArtistsPage,
  },
  {
    path: "/top/tracks",
    exact: false,
    render: TopTracksPage,
  },
  {
    path: "/lab",
    exact: false,
    render: LabPage,
  },
];
