import React from "react";

import classes from "./SingleAuthInput.module.scss";

const SingleAuthInput = (props) => {
  return (
    <div className={`${classes.container}`}>
      {props.data.showLabel && (
        <label className={`background`} name={props.data.label}>
          {props.data.placeholder}
        </label>
      )}
      <input
        {...props.data.register(props.data.label)}
        type={props.data.type}
        placeholder={props.data.placeholder}
        className={`border-color`}
      />
      <p>{props.data.errors?.message}</p>
    </div>
  );
};

export default SingleAuthInput;
