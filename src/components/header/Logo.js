import React from "react";

import classes from "./Logo.module.scss";

import logoImg from "../../images/hive5logo400.png";

const Logo = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes["logo__box"]}>
        <img src={logoImg} alt="logo" />
      </div>
    </div>
  );
};

export default Logo;
