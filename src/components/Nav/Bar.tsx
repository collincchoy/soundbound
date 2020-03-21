import React, { useState } from "react";
import soundboundLogo from "./soundbound.png";
import { Link } from "react-router-dom";
import NavMenu from "./Menu";
import LoggedInUser from "./LoggedInUser";
import styled from "styled-components";

const StyledLogo = styled.img`
  && {
    max-height: 2rem;
  }
`;

export default function NavBar() {
  const [isBurgerActive, setIsBurgerActive] = useState(false);
  const NavBurger = () => {
    return (
      /* eslint-disable-next-line jsx-a11y/anchor-is-valid */
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
      className="navbar is-transparent"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <StyledLogo src={soundboundLogo} alt="logo" />
          </Link>
          <NavBurger />
        </div>
        <div
          id="navbarBasicExample"
          className={`navbar-menu ${isBurgerActive ? "is-active" : ""}`}
        >
          <div className="navbar-start">
            <NavMenu />
          </div>
          <div className="navbar-end">
            <LoggedInUser />
          </div>
        </div>
      </div>
    </nav>
  );
}
