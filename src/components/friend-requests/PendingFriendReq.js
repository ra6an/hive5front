import React from "react";
import { useSelector } from "react-redux";

import classes from "./PendingFriendReq.module.scss";

// COMPONENTS
import SingleFriendRequest from "./SingleFriendRequest";

const PendingFriendReq = (props) => {
  const { pendingFriendRequests } = useSelector((state) => state.auth);

  const _friendReqRenderer = pendingFriendRequests.map((r) => (
    <SingleFriendRequest key={r.id} data={r} />
  ));
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h2>{`Pending Requests (${pendingFriendRequests.length})`}</h2>
        <div className={`primary-bg ${classes.horizontal}`} />
      </div>
      <div className={classes.requests}>{_friendReqRenderer}</div>
    </div>
  );
};

export default PendingFriendReq;
