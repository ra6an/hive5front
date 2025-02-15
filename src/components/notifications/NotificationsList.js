import React, { useEffect, useState } from "react";

import classes from "./NotificationsList.module.scss";

// COMPONENTS
import SingleNotification from "./SingleNotification";

const NotificationsList = (props) => {
  const [notRenderer, setNotRenderer] = useState([]);

  useEffect(() => {
    setNotRenderer(
      props.data.map((n, i) => (
        <SingleNotification
          key={n.id}
          data={n}
          timeout={i}
          notificationsHook={props.notificationsHook}
        />
      ))
    );
  }, [props.data]);

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h2>{`${props.title} (${props.data.length}):`}</h2>
        <div className={`primary-bg ${classes.horizontal}`} />
      </div>
      <div className={classes["notifications__container"]}>{notRenderer}</div>
    </div>
  );
};

export default NotificationsList;
