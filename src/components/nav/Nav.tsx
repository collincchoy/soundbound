import React, { useState } from "react";
import { useLoginContext } from "../../hooks";
import sb from "./soundbound.png";

function CurrentUser(props: {
  pictureUrl: string;
  name: string;
  logout: () => void;
}) {
  const { name, pictureUrl, logout } = props;
  const [isClicked, setIsClicked] = useState(false);
  return (
    <div
      className={`navbar-item has-dropdown ${isClicked ? "is-active" : ""}`}
      style={{ alignItems: "center" }}
    >
      <div className="is-arrowless">
        <div
          className="button is-dark"
          onClick={() => setIsClicked(!isClicked)}
        >
          <div className="media">
            <figure className="media-left">
              <div className="image is-32x32">
                <img
                  className="is-rounded"
                  style={{ width: "auto", height: "auto" }}
                  src={pictureUrl}
                  alt="Current user profile"
                />
              </div>
            </figure>
            <div className="media-content">
              <h2>{name}</h2>
            </div>
          </div>
        </div>
      </div>
      <div className={`navbar-dropdown is-right`}>
        <a className="navbar-item" onClick={logout}>
          Logout
        </a>
      </div>
    </div>
  );
}

function LoggedInUser() {
  const { isLoggedIn, currentUser, login, logout } = useLoginContext();

  const logInButton = (
    <button className="button is-light" onClick={() => login()}>
      Log in
    </button>
  );

  const currentUserProps = {
    name: currentUser?.display_name ?? "John Smith",
    pictureUrl: currentUser?.images[0]?.url ?? "#",
    logout
  };
  return isLoggedIn ? (
    <CurrentUser {...currentUserProps} />
  ) : (
    <div className="navbar-item">{logInButton}</div>
  );
}

export default function NavHeader() {
  const NavMenuLeft = (
    <div className="navbar-start">
      <a className="navbar-item" href="/">
        Top
      </a>

      <a className="navbar-item" href="/">
        Lab
      </a>

      <div className="navbar-item has-dropdown is-hoverable">
        <a className="navbar-link" href="/">
          Discover
        </a>

        <div className="navbar-dropdown">
          <a className="navbar-item" href="/">
            Artists
          </a>
          <a className="navbar-item" href="/">
            Genres
          </a>
          <hr className="navbar-divider" />
          <a className="navbar-item">Report an issue</a>
        </div>
      </div>
    </div>
  );

  const NavMenuRight = (
    <div className="navbar-end">
      <LoggedInUser />
    </div>
  );

  const [isBurgerActive, setIsBurgerActive] = useState(false);
  const NavBurger = () => {
    return (
      <a
        role="button"
        className={`navbar-burger burger ${isBurgerActive ? "is-active" : ""}`}
        onClick={() => setIsBurgerActive(!isBurgerActive)}
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
        href="#"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    );
  };
  return (
    <nav
      className="navbar is-dark"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <img src={sb} alt="logo" />
        </a>
        <NavBurger />
      </div>
      <div
        id="navbarBasicExample"
        className={`navbar-menu ${isBurgerActive ? "is-active" : ""}`}
      >
        {NavMenuLeft}
        {NavMenuRight}
      </div>
    </nav>
  );
}
