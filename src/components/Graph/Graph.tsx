import React from "react";

const Graph = () => {
  return (
    <div>
      <svg width="200" height="200">
        <ellipse cx="100" cy="100" rx="100" ry="100" />
        <line stroke="white" />
      </svg>
    </div>
  );
};

export default Graph;
