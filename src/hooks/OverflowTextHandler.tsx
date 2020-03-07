import React, { useState } from "react";

import { isOverflowing, debounce } from "utilities";

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    overflow: "hidden"
  },
  scrollOnOverflowText: {
    width: "100%",
    transition: "transform 1s",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  scrollOnOverflowText_hover: {
    overflow: "unset",
    textOverflow: "unset",
    width: "unset",
    transition: "transform 3s linear",
    transform: "translateX(-100%)"
  }
};

export function useOverflowTextHandler<T extends HTMLElement>() {
  const [hasOverflowingText, setHasOverflowingText] = useState(false);
  const elRef = React.useRef<T>(null);
  // const elementWidth = elRef?.current?.clientWidth;
  const [elementWidth, setElementWidth] = useState(0);
  React.useEffect(() => {
    if (elRef.current !== null) {
      setHasOverflowingText(isOverflowing(elRef.current));
      setElementWidth(elRef.current.clientWidth);
      const handleResize = () => {
        console.log("hi");
        if (elRef.current?.clientWidth !== elementWidth) {
          elRef.current && setElementWidth(elRef.current.clientWidth);
        }
      };
      window.addEventListener("resize", debounce(handleResize, 1500));
      return () =>
        setTimeout(
          () => window.removeEventListener("resize", handleResize),
          50
        ) && undefined;
    }
  }, [elRef, elementWidth]);
  return {
    hasOverflowingText,
    elRef
  };
}
