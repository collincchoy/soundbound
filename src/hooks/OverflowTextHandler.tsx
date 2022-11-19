import React, { useState } from "react";

import { isOverflowing, debounce } from "utils";

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
