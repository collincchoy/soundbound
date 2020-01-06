import React, { useState } from "react";
import { useLoginContext } from "../hooks";

function CurrentUser(props: { pictureUrl: string; name: string }) {
  const { name, pictureUrl } = props;
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
              <img src={pictureUrl} alt="Current user profile" />
            </figure>
            <h2>{name}</h2>
          </div>
        </button>
      </div>
      <div className={`navbar-dropdown is-right`}>
        <a className="navbar-item">Logout</a>
      </div>
    </div>
  );
}

function LoggedInUser() {
  const { isLoggedIn, currentUser, login } = useLoginContext();

  const logInButton = (
    <button className="button is-light" onClick={() => login()}>
      Log in
    </button>
  );

  const name = currentUser?.display_name ?? "John Smith",
    pictureUrl = currentUser?.images[0]?.url ?? "#";
  return isLoggedIn ? (
    <CurrentUser name={name} pictureUrl={pictureUrl} />
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
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        {Logo}
        <a
          role="button"
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          href="#"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div id="navbarBasicExample" className="navbar-menu">
        {NavMenuLeft}
        {NavMenuRight}
      </div>
    </nav>
  );
}
