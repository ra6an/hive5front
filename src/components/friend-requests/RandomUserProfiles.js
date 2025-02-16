import React from "react";

import classes from "./RandomUserProfiles.module.scss";

// COMPONENTS
import UsersContainer from "../users/UsersContainer";

const RandomUserProfiles = (props) => {
  console.log(props.data);
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h2>{`Meet New People`}</h2>
        <div className={`primary-bg ${classes.horizontal}`} />
      </div>
      <UsersContainer data={props.data} />
    </div>
  );
};

export default RandomUserProfiles;
