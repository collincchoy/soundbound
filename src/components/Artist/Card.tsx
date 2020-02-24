import React from "react";

import { ArtistImage } from "../../spotify/types";

type ArtistCardProps = {
  name: string;
  image: ArtistImage;
  onClick?: () => void;
};

export default function ArtistCard(props: ArtistCardProps) {
  const { name, image, onClick } = props;
  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title" style={{ justifyContent: "center" }}>
          {props.name}
        </p>
      </header>
      <div
        className="card-image"
        onClick={onClick}
        style={{ cursor: "pointer" }}
      >
        <figure className="image is-square">
          <img src={image.url} alt={name} />
        </figure>
      </div>
    </div>
  );
}
