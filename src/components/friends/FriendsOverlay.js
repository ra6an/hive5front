import React from "react";

import classes from "./FriendsOverlay.module.scss";

// COMPONENTS
import FriendsContainer from "./FriendsContainer";
import Messages from "./Messages";

const FriendsOverlay = (props) => {
  return (
    <div className={classes.container}>
      <Messages />
      <FriendsContainer />
    </div>
  );
};

export default FriendsOverlay;
