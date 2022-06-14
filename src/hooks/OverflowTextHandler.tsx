import React, { useState } from "react";

import { isOverflowing, debounce } from "utils";

// May convert this to use styles in JS
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    overflow: "hidden",
  },
  scrollOnOverflowText: {
    width: "100%",
    transition: "transform 1s",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  scrollOnOverflowText_hover: {
    overflow: "unset",
    textOverflow: "unset",
    width: "unset",
    transition: "transform 3s linear",
    transform: "translateX(-100%)",
  },
};

export function useOverflowTextHandler<T extends HTMLElement>() {
  const [hasOverflowingText, setHasOverflowingText] = useState(false);
  const elRef = React.useRef<T>(null);
  const text = elRef.current?.textContent;
  React.useEffect(() => {
    if (elRef.current !== null) {
      const handleResize = debounce(() => {
        setHasOverflowingText(!!elRef.current && isOverflowing(elRef.current));
      }, 1000);
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [elRef, text]);
  return {
    hasOverflowingText,
    elRef,
  };
}
