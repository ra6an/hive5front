import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import classes from "./FriendRequests.module.scss";

// COMPONENTS
import FriendReqContainer from "../components/friend-requests/FriendReqContainer";

// STORE
import { getNonFriendUsers } from "../store/reducers/user-slice";
import { userActions } from "../store/redux-store";

const FriendRequests = (props) => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  const { token, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token || !isAuthenticated) return;

    dispatch(getNonFriendUsers(token));

    return () => {
      dispatch(userActions.setUsers({ data: [] }));
    };
  }, [dispatch, token, isAuthenticated]);

  return (
    <div className={classes.container}>
      <FriendReqContainer data={users} />
    </div>
  );
};

export default FriendRequests;
