import React from "react";
import { useSelector } from "react-redux";

import classes from "./UserLinks.module.scss";

// COMPONENTS
import SingleLink from "./SingleLink";

// ICONS
import { MdNotificationsNone } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { TbMessage } from "react-icons/tb";

// IMAGE
import defaultUser from "../../images/default-user.jpg";

const UserLinks = (props) => {
  const { pendingFriendRequests } = useSelector((state) => state.auth);

  return (
    <div className={`${classes.container}`}>
      <div className={classes["inner__box"]}>
        <SingleLink
          data={props.notificationsHook.unseenNotifications}
          path={"/notifications"}
          icon={MdNotificationsNone}
          isActive={false}
        />
        <SingleLink
          data={pendingFriendRequests}
          path={"/friend-requests"}
          icon={FaUserFriends}
          isActive={false}
        />
        {/* <SingleLink path={""} icon={TbMessage} isActive={false} /> */}
        <div className={classes.user}>
          <img alt="user" src={defaultUser}></img>
        </div>
      </div>
    </div>
  );
};

export default UserLinks;
