import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import classes from "./Users.module.scss";

// COMPONENTS
import UsersContainer from "../components/users/UsersContainer";

// STORE
import { getNonFriendUsers } from "../store/reducers/user-slice";
import { userActions } from "../store/redux-store";

const Users = (props) => {
  const dispatch = useDispatch();
  const { isAuthenticated, token } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.user);

  useEffect(() => {
    if (!token || !isAuthenticated) return;

    dispatch(getNonFriendUsers(token));

    return () => {
      dispatch(userActions.setUsers({ data: [] }));
    };
  }, [token, isAuthenticated, dispatch]);

  return (
    <div className={`${classes.container}`}>
      <div className={`${classes["users__container"]}`}>
        <UsersContainer data={users} />
      </div>
    </div>
  );
};

export default Users;
