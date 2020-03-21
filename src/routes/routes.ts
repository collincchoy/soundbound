import WelcomePage from "../pages/Welcome";
import TopArtistsPage from "../pages/Top/Artists";
import TopTracksPage from "../pages/Top/Tracks";
import LabPage from "../pages/Lab";

export const publicRoutes = [
  {
    path: "/",
    component: WelcomePage,
    extraProps: {
      exact: true
    }
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
