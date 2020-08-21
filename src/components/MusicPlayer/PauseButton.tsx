import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause } from "@fortawesome/free-solid-svg-icons";
import CardButtonOverlay from "./CardButtonOverlay";

export default function PauseButton(
  props: React.PropsWithoutRef<JSX.IntrinsicElements["button"]>
) {
  return (
    <CardButtonOverlay title="Pause" {...props}>
      <FontAwesomeIcon icon={faPause} size="3x" />
    </CardButtonOverlay>
  );
}
