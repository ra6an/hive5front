import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import classes from "./Home.module.scss";

// COMPONENTS
import HomeContainer from "../components/home/HomeContainer";

// STORE
import { postActions } from "../store/redux-store";

const Home = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    props.fetchHome.set(true);
  }, [props.fetchHome.set]);

  useEffect(() => {
    return () => {
      dispatch(postActions.setPosts({ data: [] }));
    };
  }, [dispatch]);

  return (
    <div className={`${classes.container}`}>
      <HomeContainer />
    </div>
  );
};

export default Home;
