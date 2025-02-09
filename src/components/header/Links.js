import React from "react";

import classes from "./Links.module.scss";

// COMPONENTS
import SingleLink from "./SingleLink";

// ICON
import {
  MdOutlineExplore,
  MdOutlineHome,
  MdOutlineSearch,
} from "react-icons/md";

const Links = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes["inner__container"]}>
        <SingleLink icon={MdOutlineExplore} isActive={false} path="/explore" />
        <SingleLink icon={MdOutlineHome} isActive={true} path="/home" />
        <SingleLink icon={MdOutlineSearch} isActive={false} />
      </div>
    </div>
  );
};

export default Links;
