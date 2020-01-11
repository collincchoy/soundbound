import React, { useState } from "react";
import { useLoginContext } from "../hooks";

function CurrentUser(props: { pictureUrl: string; name: string, logout: () => void}) {
  const { name, pictureUrl, logout } = props;
  const [isClicked, setIsClicked] = useState(false);
  return (
    <div className={`navbar-item has-dropdown ${isClicked ? "is-active" : ""}`}>
      <div className="navbar-link is-arrowless">
        <button
          className="button is-white"
          onClick={() => setIsClicked(!isClicked)}
        >
          <div className="media">
            <figure className="media-left">
              <div className="image is-32x32">
                <img className="is-rounded" style={{width: 'auto', height: 'auto'}} src={pictureUrl} alt="Current user profile" />
              </div>
            </figure>
            <div className="media-content">
              <h2>{name}</h2>
            </div>
          </div>
        </button>
      </div>
      <div className={`navbar-dropdown is-right`}>
        <a className="navbar-item" onClick={logout}>Logout</a>
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
  }
  return isLoggedIn ? (
    <CurrentUser {...currentUserProps}/>
  ) : (
    <div className="navbar-item">{logInButton}</div>
  );
}

export default function NavHeader() {
  const Logo = (
    <a className="navbar-item" href="https://bulma.io">
      <img
        src="https://bulma.io/images/bulma-logo.png"
        width="112"
        height="28"
      />
    </a>
  );

  const NavMenuLeft = (
    <div className="navbar-start">
      <a className="navbar-item">Home</a>

      <a className="navbar-item">Documentation</a>

      <div className="navbar-item has-dropdown is-hoverable">
        <a className="navbar-link">More</a>

        <div className="navbar-dropdown">
          <a className="navbar-item">About</a>
          <a className="navbar-item">Jobs</a>
          <a className="navbar-item">Contact</a>
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
        className={`navbar-burger burger ${isBurgerActive ? "is-active": ""}`}
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
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        {Logo}
        <NavBurger />
      </div>
      <div id="navbarBasicExample" className={`navbar-menu ${isBurgerActive ? "is-active": ""}`}>
        {/* {NavMenuLeft} */}
        {NavMenuRight}
      </div>
    </nav>
  );
}
