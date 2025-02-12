import React from "react";

import classes from "./NotificationsContainer.module.scss";

// COMPONENTS
import NotificationsList from "./NotificationsList";

const NotificationsContainer = (props) => {
  return (
    <div className={classes.container}>
      <NotificationsList
        title={"Unseen Notifications"}
        data={props.notificationsHook.unseenNotifications}
        notificationsHook={props.notificationsHook}
      />
      <NotificationsList
        title={"Seen Notifications"}
        data={props.notificationsHook.seenNotifications}
        notificationsHook={props.notificationsHook}
      />
    </div>
  );
};

export default NotificationsContainer;
