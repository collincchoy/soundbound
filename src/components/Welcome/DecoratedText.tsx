import React from "react";

const DecoratedText: React.FC<{
  color: string;
  hoverColor?: string;
  linkTo?: string;
  style?: React.CSSProperties;
}> = ({ color, hoverColor, children, linkTo, ...props }) => {
  const [isHover, setIsHover] = React.useState(false);
  const styles: React.CSSProperties = {
    fontWeight: "bold", // The lower-case Nunito "r" is weird in "reflection". bold normalizes it so the hover background doesn't show
    textDecoration: "underline",
    color,
    background: `linear-gradient(to right, ${hoverColor ??
      color} 50%, transparent 50%`,
    backgroundSize: "200% 100%",
    backgroundPosition: isHover ? "left bottom" : "right bottom",
    transition: "background-position 0.8s ease",
    ...props.style
  };
  return linkTo ? (
    <a
      href={linkTo}
      style={styles}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {children}
    </a>
  ) : (
    <span style={styles}>{children}</span>
  );
};

export default DecoratedText;
