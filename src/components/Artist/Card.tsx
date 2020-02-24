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
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a>
        <div className="card-image" onClick={onClick}>
          <figure className="image is-square">
            <img src={image.url} alt={name} />
          </figure>
        </div>
      </a>
    </div>
  );
}
