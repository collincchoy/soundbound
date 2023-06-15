import React from "react";
import styled from "styled-components";

const Container = styled.div.attrs({ className: "container" })`
  max-width: 800px;
`;

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
      <Container>{children}</Container>
      {renderAfter && renderAfter()}
    </div>
  </section>
);

export default Section;
