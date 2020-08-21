import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import CardButtonOverlay from "./CardButtonOverlay";

export default function PlayButton(
  props: React.PropsWithoutRef<JSX.IntrinsicElements["button"]>
) {
  return (
    <CardButtonOverlay title="Play" {...props}>
      <FontAwesomeIcon icon={faPlay} size="3x" />
    </CardButtonOverlay>
  );
}
