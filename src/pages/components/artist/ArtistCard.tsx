import React from "react";
import "react-bulma-components/dist/react-bulma-components.min.css";
import { Card, Heading } from "react-bulma-components";

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
      <Card.Header >
        <Card.Header.Title className="has-text-centered">
        {/* <Heading size={4}>{props.name}</Heading> */}
          {props.name}
        </Card.Header.Title>
      </Card.Header>
      <Card.Content>
        <a>
          <Card.Image {...props} src={image.url} alt={name} size="square" />
        </a>
      </Card.Content>
    </Card>
  );
};
