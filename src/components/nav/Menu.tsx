import React from "react";
import { Link } from "react-router-dom";

export default function NavMenu() {
  return (
    <>
      <Link className="navbar-item" to="/top">
        Top
      </Link>

      <Link className="navbar-item" to="/">
        Lab
      </Link>

      <div className="navbar-item has-dropdown is-hoverable">
        <Link className="navbar-link" to="/">
          Discover
        </Link>

        <div className="navbar-dropdown">
          <Link className="navbar-item" to="/">
            Artists
          </Link>
          <Link className="navbar-item" to="/">
            Genres
          </Link>
          <hr className="navbar-divider" />
          <Link className="navbar-item" to="/">
            Report an issue
          </Link>
        </div>
      </div>
    </>
  );
}
