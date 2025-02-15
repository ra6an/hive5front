import React from "react";

import classes from "./Settings.module.scss";

// COMPONENTS
import SettingsContainer from "../components/settings/SettingsContainer";

const Settings = (props) => {
  return (
    <div className={`${classes.container}`}>
      <SettingsContainer />
    </div>
  );
};

export default Settings;
