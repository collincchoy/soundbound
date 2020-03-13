import React from "react";
import { ReactComponent as BubblesFigure } from "./figures/Bubbles.svg";
import { ReactComponent as MixingPotFigure } from "./figures/MixingPot.svg";

const ContainerStyles: React.CSSProperties = {
  position: "relative"
};

const BubbleStyles: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translateY(-86%) translateX(-50%)"
};

const MixingPot = () => {
  return (
    <div style={ContainerStyles}>
      <BubblesFigure style={BubbleStyles} />
      <MixingPotFigure />
    </div>
  );
};

export default MixingPot;
