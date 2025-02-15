import React, { useState } from "react";
import { useSelector } from "react-redux";

import classes from "./UserLinks.module.scss";

// COMPONENTS
import SingleLink from "./SingleLink";

// ICONS
import { MdNotificationsNone } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
// import { TbMessage } from "react-icons/tb";

// IMAGE
import defaultUser from "../../images/default-user.jpg";

// COMPONENTS
import UserDropdown from "./UserDropdown";

const UserLinks = (props) => {
  const { pendingFriendRequests } = useSelector((state) => state.auth);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleShowDropdown = (e) => {
    e.preventDefault();
    setShowDropdown(!showDropdown);
  };

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
        <div className={classes.user} onClick={handleShowDropdown}>
          <img alt="user" src={defaultUser}></img>
        </div>
        <UserDropdown
          showDropdown={showDropdown}
          setShowDropdown={setShowDropdown}
          theme={props.theme}
        />
      </div>
    </div>
  );
};

export default UserLinks;
