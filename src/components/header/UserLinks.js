import React from "react";

import classes from "./UserLinks.module.scss";

// COMPONENTS
import SingleLink from "./SingleLink";

// ICONS
import { MdNotificationsNone } from "react-icons/md";
import { TbMessage } from "react-icons/tb";

// IMAGE
import defaultUser from "../../images/default-user.jpg";

const UserLinks = (props) => {
  return (
    <div className={`${classes.container}`}>
      <div className={classes["inner__box"]}>
        <SingleLink path={""} icon={MdNotificationsNone} isActive={false} />
        <SingleLink path={""} icon={TbMessage} isActive={false} />
        <div className={classes.user}>
          <img alt="user" src={defaultUser}></img>
        </div>
      </div>
    </div>
  );
};

export default UserLinks;
