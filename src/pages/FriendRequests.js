import React from "react";

import classes from "./FriendRequests.module.scss";

// COMPONENTS
import FriendReqContainer from "../components/friend-requests/FriendReqContainer";

const FriendRequests = (props) => {
  return (
    <div className={classes.container}>
      <FriendReqContainer />
    </div>
  );
};

export default FriendRequests;
