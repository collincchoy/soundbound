import React from "react";
import NavItem from "./NavItem";

export default {
  component: NavItem,
  title: "NavItem",
};

const defaultProps = {
  name: "Top",
  linkTo: "/top",
  subMenuItems: [
    { name: "artists", linkTo: "/top/artists" },
    { name: "tracks", linkTo: "/top/tracks" },
  ],
};

export const Default = () => {
  return <NavItem {...defaultProps} />;
};
