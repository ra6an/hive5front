import React from "react";

import classes from "./SingleUser.module.scss";

// COMPONENTS
import UserContainer from "../components/user/UserContainer";

const SingleUser = (props) => {
  return (
    <div className={classes.container}>
      <UserContainer />
    </div>
  );
};

export default SingleUser;
