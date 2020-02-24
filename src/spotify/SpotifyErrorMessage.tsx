import React from "react";

import { spotify } from "./api";

export default function SpotifyErrorMessage(props: {
  status: number;
  message: string;
}) {
  const { status, message } = props;
  return (
    <div className="container">
      {status === 401 ? (
        <span>
          Oops you need to authorize this app
          <a href={spotify.authorizeUrl.toString()}>Click here to authorize.</a>
        </span>
      ) : (
        <span>
          Uh oh. An Error Occurred: {status} {message}
        </span>
      )}
    </div>
  );
}
