import React from "react";
import { Link } from "react-router";

import classes from "./Dropdown.module.scss";

const SingleDropdownLink = (props) => {
  return (
    <Link
      onClick={props.data.fn}
      to={props.data.to}
      className={`links ${classes["single__dropdown-container"]}`}
    >
      <p>{props.data.label}</p>
    </Link>
  );
};

const Dropdown = (props) => {
  const linksRenderer = props.data.links.map((l, i) => (
    <SingleDropdownLink data={l} key={i} />
  ));
  return <div className={`${classes.container}`}>{linksRenderer}</div>;
};

export default Dropdown;
