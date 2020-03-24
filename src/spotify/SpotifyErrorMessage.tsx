import React from "react";

import { spotify } from "./api";

const SpotifyErrorMessage: React.FC<{ status: number; message: string }> = ({
  status,
  message
}) => {
  return (
    <div className="container message is-danger">
      <div className="message-header">
        <p>Error</p>
        <button className="delete" aria-label="delete"></button>
      </div>
      <div className="message-body">
        {status === 401 ? (
          <span>
            Oops you need to&nbsp;
            <a href={spotify.authorizeUrl.toString()}>reauthorize this app.</a>
          </span>
        ) : (
          <span>
            Uh oh. An Error Occurred: {status} {message}
          </span>
        )}
      </div>
    </div>
  );
};

export default SpotifyErrorMessage;
