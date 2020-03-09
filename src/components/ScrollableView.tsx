import React, { useRef, useState, useEffect } from "react";
import { debounce } from "utilities";

const styles: { [key: string]: React.CSSProperties } = {};

styles.wrapper = {
  scrollBehavior: "smooth"
};

const buttonConfiguration = {
  offset: "30px",
  showHideTransitionDuration: "0.7s"
};
styles.backToTopButton = {
  position: "fixed",
  bottom: buttonConfiguration.offset,
  left: "50%",
  transform: "translate(-50%)"
};

styles.hidden = {
  visibility: "hidden",
  opacity: 0,
  transition: `visibility 0s ${buttonConfiguration.showHideTransitionDuration}, opacity ${buttonConfiguration.showHideTransitionDuration} linear`
};
styles.showing = {
  visibility: "visible",
  opacity: 1,
  transition: `opacity ${buttonConfiguration.showHideTransitionDuration} linear`
};

const ScrollToTopButton = (props: React.HTMLAttributes<HTMLButtonElement>) => {
  return (
    <button className="button is-rounded is-inverted" {...props}>
      Back to top
    </button>
  );
};

const ScrollableView: React.FC<{ showButtonAt?: string }> = ({
  children,
  showButtonAt,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const scrollToTop = () => {
    ref.current?.scrollIntoView();
  };

  const [showButton, setShowButton] = useState(false);
  const handleScroll = debounce(() => {
    if (window.pageYOffset > window.innerHeight / 2) {
      !showButton && setShowButton(true);
    } else {
      showButton && setShowButton(false);
    }
  }, 0.8);
  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  });
  return (
    <div ref={ref} style={styles.wrapper}>
      {children}
      <ScrollToTopButton
        onClick={scrollToTop}
        style={{
          ...styles.backToTopButton,
          ...(showButton ? styles.showing : styles.hidden)
        }}
      />
    </div>
  );
};

export default ScrollableView;
