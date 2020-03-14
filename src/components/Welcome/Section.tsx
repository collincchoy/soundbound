import React from "react";

const Section: React.FC<{
  renderAfter?: () => JSX.Element;
} & React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  renderAfter,
  ...props
}) => (
  <section
    className={`hero is-fullheight has-text-centered is-bold ${className}`}
    {...props}
  >
    <div className="hero-body">
      <div className="container" style={{ maxWidth: "800px" }}>
        {children}
      </div>
      {renderAfter && renderAfter()}
    </div>
  </section>
);

export default Section;
