import React from "react";

import classes from "./Notifications.module.scss";

// COMPONENTS
import NotificationsContainer from "../components/notifications/NotificationsContainer";

const Notifications = (props) => {
  return (
    <div className={classes.container}>
      <NotificationsContainer notificationsHook={props.notificationsHook} />
    </div>
  );
};

export default Notifications;
