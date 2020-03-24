import WelcomePage from "../pages/Welcome";
import TopArtistsPage from "../pages/Top/Artists";
import TopTracksPage from "../pages/Top/Tracks";
import LabPage from "../pages/Lab";
import OauthCallbackPage from "pages/OauthCallback";

export const publicRoutes = [
  {
    path: "/",
    component: WelcomePage,
    extraProps: {
      exact: true
    }
  },
  {
    path: "/oauth_callback",
    component: OauthCallbackPage
  }
];

export const privateRoutes = [
  {
    path: "/top/artists",
    component: TopArtistsPage
  },
  {
    path: "/top/tracks",
    component: TopTracksPage
  },
  {
    path: "/lab",
    component: LabPage
  }
];
