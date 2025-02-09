import React, { Fragment } from "react";
import { Link } from "react-router";
import { useLocation } from "react-router";

import classes from "./SingleLink.module.scss";

const SingleLink = (props) => {
  const location = useLocation();

  return (
    <Fragment>
      {props.path ? (
        <Link to={`${props.path}`} className={`${classes.container}`}>
          <div
            className={`${classes["icon__box"]} links ${
              location.pathname === props.path ? classes.active : ""
            }`}
          >
            <props.icon className={classes.icon} />
          </div>
        </Link>
      ) : (
        <div to={`${props.path}`} className={`${classes.container}`}>
          <div
            className={`${classes["icon__box"]} links ${
              location.pathname === props.path ? classes.active : ""
            }`}
          >
            <props.icon className={classes.icon} />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default SingleLink;
