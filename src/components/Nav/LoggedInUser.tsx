import React, { useState } from "react";
import { useLoginContext } from "../../hooks";

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
        </div>
      </div>
      <div className={`navbar-dropdown is-right`}>
        <a className="navbar-item" href="." onClick={logout}>
          Logout
        </a>
      </div>
    </div>
  );
}

export default function LoggedInUser() {
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
