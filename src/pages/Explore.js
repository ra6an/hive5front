import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import classes from "./Explore.module.scss";

// STORE
import { postActions } from "../store/redux-store";

// COMPONENTS
import HomeContainer from "../components/home/HomeContainer";

const Explore = (props) => {
  const dispatch = useDispatch();
  console.log(props.fetchExplore?.get);
  useEffect(() => {
    if (!props.fetchExplore?.set) return;
    props.fetchExplore?.set(true);
  }, [props?.fetchExplore?.set]);

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

export default Explore;
