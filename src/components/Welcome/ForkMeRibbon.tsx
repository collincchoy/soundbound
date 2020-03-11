import React from "react";
import classes from "./index.module.scss";

const ForkMeRibbon = () => {
  return (
    <a
      className={`${classes["github-fork-ribbon"]} ${classes["left-bottom"]} ${classes.fixed}`}
      href="https://github.com/collincchoy/soundbound"
      data-ribbon="Fork me on GitHub"
      title="Fork me on GitHub"
    >
      Fork me on GitHub
    </a>
  );
};

export default ForkMeRibbon;
