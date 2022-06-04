import React from "react";

interface Props {
  size?: number;
}

const Node = ({ size = 150 }: Props) => {
  return (
    <svg width={size} height={size}>
      <ellipse cx={size / 2} cy={size / 2} rx={size / 2} ry={size / 2} />
      <line stroke="white" />
    </svg>
  );
};

export default Node;
