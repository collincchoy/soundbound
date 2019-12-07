import { Container } from "react-bulma-components";

import React from "react";

import { spotify } from "./api";

export default function SpotifyErrorMessage(props: { status: number, message: string }) {
  const { status, message } = props;
  if (status === 401) {
    return (
      <Container>
        Oops you need to authorize this app:
            <a href={spotify.authorizeUrl.toString()}>Click here to authorize.</a>
      </Container>);
  } else {
    return (
      <Container>
        Uh oh. An Error Occurred: {status} {message}
      </Container>
    );
  }
}