import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause } from "@fortawesome/free-solid-svg-icons";

export default function PauseButton(
  props: React.PropsWithoutRef<JSX.IntrinsicElements["button"]>
) {
  return (
    <button className="button" title="Pause" {...props}>
      <FontAwesomeIcon icon={faPause} />
    </button>
  );
}
