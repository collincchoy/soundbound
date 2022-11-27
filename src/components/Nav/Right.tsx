import React, { useState } from "react";
import styled from "styled-components";
import { useLoginContext } from "../../hooks/Login";
import { HashLink as Link } from "react-router-hash-link";

const StyledCurrentUser = styled.div.attrs((props) => ({
  className: "is-dark",
  ...props,
}))`
  cursor: pointer;
  padding: 1em;

  &:hover {
    opacity: 0.8;
  }
`;

const StyledDropdown = styled.div.attrs((props) => ({
  className: "navbar-dropdown is-right",
  ...props,
}))`
  a {
    color: hsl(0, 0%, 21%); /*dark from bulma*/
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
      <StyledDropdown>
        <Link to="/#about" className="navbar-item">
          About
        </Link>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid*/}
        <a className="navbar-item" href="" onClick={logout}>
          Logout
        </a>
      </StyledDropdown>
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
    logout,
  };
  return isLoggedIn ? (
    <ProfileWithDropdown {...currentUserProps} />
  ) : (
    <div className="navbar-item">{logInButton}</div>
  );
}
