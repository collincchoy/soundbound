import React from "react";

import { ArtistImage } from "../../spotify/types";
import { useOverflowTextHandler } from "hooks";

type ArtistCardProps = {
  name: string;
  image: ArtistImage;
  onClick?: () => void;
};

export default function ArtistCard({ name, image, onClick }: ArtistCardProps) {
  const { hasOverflowingText, elRef } = useOverflowTextHandler<
    HTMLParagraphElement
  >();
  return (
    <div className="card">
      <header className="card-header">
        <div className="card-header-title overflow-container">
          <p
            ref={elRef}
            className={`has-text-centered scroll-on-overflow ${
              hasOverflowingText ? "overflowing" : ""
            }`}
          >
            {name}
          </p>
        </div>
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
