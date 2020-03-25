import React, { useState } from "react";
import styled from "styled-components";
import { useLoginContext } from "../../hooks/Login";
import { HashLink as Link } from "react-router-hash-link";

const StyledCurrentUser = styled.div.attrs(props => ({
  className: "button is-dark",
  ...props
}))`
  && {
    background-color: transparent;
  }
`;

function ProfileWithDropdown(props: {
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
        <StyledCurrentUser onClick={() => setIsClicked(!isClicked)}>
          <div className="media" style={{ alignItems: "center" }}>
            <figure className="media-left image">
              <img
                className="is-rounded"
                style={{ width: "auto", height: "auto" }}
                src={pictureUrl}
                alt="Current user profile"
              />
            </figure>
            <div className="media-content">
              <h2>{name}</h2>
            </div>
          </div>
        </StyledCurrentUser>
      </div>
      <div className={`navbar-dropdown is-right`}>
        <Link to="/#about" className="navbar-item">
          About
        </Link>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid*/}
        <a className="navbar-item" href="" onClick={logout}>
          Logout
        </a>
      </div>
    </div>
  );
}

export default function NavRight() {
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
    <ProfileWithDropdown {...currentUserProps} />
  ) : (
    <div className="navbar-item">{logInButton}</div>
  );
}
