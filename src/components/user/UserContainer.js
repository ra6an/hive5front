import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import classes from "./UserContainer.module.scss";

// COMPONENTS
import UserBanner from "./UserBanner";
import HomeContainer from "../home/HomeContainer";

// STORE
import { userActions } from "../../store/redux-store";
import { getUser } from "../../store/reducers/user-slice";
import { getPosts } from "../../store/reducers/post-slice";

const UserContainer = (props) => {
  const dispatch = useDispatch();
  const params = useParams();
  const { token, isAuthenticated } = useSelector((state) => state.auth);
  const [currUsername, setCurrUsername] = useState("");

  useEffect(() => {
    setCurrUsername(params.username);
  }, [params.username]);

  useEffect(() => {
    if (!isAuthenticated || !token) return;
    if (currUsername === "") return;

    dispatch(getPosts(token, { user: currUsername }));
    dispatch(getUser(token, { username: currUsername }));
  }, [currUsername, token, isAuthenticated, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(userActions.setSingleUser({}));
    };
  }, [dispatch]);

  return (
    <div className={classes.container}>
      <UserBanner />
      <HomeContainer cantPost={true} />
    </div>
  );
};

export default UserContainer;
