import React from "react";
import NavMenu from "./NavMenu";

export default {
  component: NavMenu,
  title: "NavMenu",
};

export const Default = () => {
  return (
    <div className="navbar-menu">
      <NavMenu />
    </div>
  );
};
