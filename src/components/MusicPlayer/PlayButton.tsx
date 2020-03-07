import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

export default function PlayButton(
  props: React.PropsWithoutRef<JSX.IntrinsicElements["button"]>
) {
  return (
    <button className="button" title="Play" {...props}>
      <FontAwesomeIcon icon={faPlay} />
    </button>
  );
}
