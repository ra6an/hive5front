import React, { useState } from "react";

import classes from "./SettingsContainer.module.scss";

// COMPONENTS
import ProfileSettings from "./ProfileSettings";
import AlertSettings from "./AlertSettings";
import SecuritySettings from "./SecuritySettings";

const SingleLink = (props) => {
  const handleChangeActive = (e) => {
    e.preventDefault();
    props.setActive(props.label);
  };

  return (
    <div
      className={`links ${props.active === props.label ? "background" : ""} ${
        classes["single__link"]
      }`}
      onClick={handleChangeActive}
    >
      {props.label}
    </div>
  );
};

const SettingsContainer = (props) => {
  const [curActive, setCurActive] = useState("Profile");

  return (
    <div className={`${classes.container}`}>
      <div className={`post ${classes["links"]}`}>
        <SingleLink
          label={"Profile"}
          setActive={setCurActive}
          active={curActive}
        />
        <SingleLink
          label={"Alerts"}
          setActive={setCurActive}
          active={curActive}
        />
        <SingleLink
          label={"Security"}
          setActive={setCurActive}
          active={curActive}
        />
      </div>
      <div className={`post ${classes["form"]}`}>
        {curActive === "Profile" && <ProfileSettings />}
        {curActive === "Alerts" && <AlertSettings />}
        {curActive === "Security" && <SecuritySettings />}
      </div>
    </div>
  );
};

export default SettingsContainer;
