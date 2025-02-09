import React from "react";

import classes from "./Home.module.scss";

// COMPONENTS
import HomeContainer from "../components/home/HomeContainer";

const Home = (props) => {
  return (
    <div className={`${classes.container}`}>
      <HomeContainer />
    </div>
  );
};

export default Home;
