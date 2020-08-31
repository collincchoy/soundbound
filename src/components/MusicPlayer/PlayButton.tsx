import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import CardButtonOverlay from "./CardButtonOverlay";

export default function PlayButton(props: {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
}) {
  return (
    <CardButtonOverlay title="Play" {...props}>
      <FontAwesomeIcon icon={faPlay} size="3x" />
    </CardButtonOverlay>
  );
}
