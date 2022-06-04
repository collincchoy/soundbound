import React from "react";

interface Props {
  size?: number;
  fill?: string;
}

const Node = ({ size = 150, fill = "#C4C4C4" }: Props) => {
  return (
    <svg width={size} height={size}>
      <ellipse
        cx={size / 2}
        cy={size / 2}
        rx={size / 2}
        ry={size / 2}
        fill={fill}
      />
      <line stroke="white" />
    </svg>
  );
};

export default Node;
