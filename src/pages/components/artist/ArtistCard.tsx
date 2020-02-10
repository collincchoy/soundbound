import React from "react";
import "react-bulma-components/dist/react-bulma-components.min.css";
import { Card } from "react-bulma-components";

import { ArtistImage } from "../../../spotify/types";

type ArtistCardProps = {
  name: string;
  image: ArtistImage;
  onClick?: () => void;
};

export default function ArtistCard(props: ArtistCardProps) {
  const { name, image } = props;
  return (
    <Card>
      <Card.Header>
        <Card.Header.Title
          className="has-text-centered"
          style={{ justifyContent: "center" }}
        >
          {/* <Heading size={4}>{props.name}</Heading> */}
          {props.name}
        </Card.Header.Title>
      </Card.Header>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a>
          <Card.Image {...props} src={image.url} alt={name} size="square" />
        </a>
    </Card>
  );
}
