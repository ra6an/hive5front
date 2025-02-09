import React from "react";

import classes from "./AuthBtn.module.scss";

const AuthBtn = (props) => {
  return (
    <button type="submit" className={`auth-btn ${classes.container}`}>
      {props.title}
    </button>
  );
};

export default AuthBtn;
