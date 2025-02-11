import React from "react";

import classes from "./FriendReqContainer.module.scss";

// COMPONENTS
import PendingFriendReq from "./PendingFriendReq";
import RandomUserProfiles from "./RandomUserProfiles";

const FriendReqContainer = (props) => {
  return (
    <div className={classes.container}>
      <PendingFriendReq />
      <RandomUserProfiles />
    </div>
  );
};

export default FriendReqContainer;
