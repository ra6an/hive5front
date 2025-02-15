import React from "react";
import { useSelector, useDispatch } from "react-redux";

import classes from "./UserDropdown.module.scss";

// COMPONENTS
import Dropdown from "../UI/Dropdown";

// STORE
import { authActions } from "../../store/redux-store";

const UserDropdown = (props) => {
  const dispatch = useDispatch();
  const { token, isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = (e) => {
    e.preventDefault();
    if (!token || !isAuthenticated) return;
    dispatch(authActions.logout());
  };

  const hideDropdown = (e) => {
    if (Object.keys(user).length === 0) return;
    props.setShowDropdown(false);
  };

  return (
    <div
      className={`box-shadow post ${classes.container}`}
      style={
        props.showDropdown
          ? { transform: `translate(0%, 110%)` }
          : { transform: `translate(130%, 110%)` }
      }
    >
      <div
        className={`background ${classes["dropdown-theme"]}`}
        onClick={props.theme.changeTheme}
      >
        <p>{props.theme.theme === "light" ? "light" : "dark"}</p>
        <div className={`post ${classes.slider}`}>
          <div
            className={`primary-bg ${classes.thumb}`}
            style={
              props.theme.theme === "light"
                ? { margin: "0 auto 0 0 " }
                : { margin: "0 0 0 auto" }
            }
          />
        </div>
      </div>
      <Dropdown
        data={{
          links: [
            {
              label: "Profile",
              to: `/user/${user?.username}`,
              fn: hideDropdown,
            },
            {
              label: "Settings",
              to: `/settings`,
              fn: hideDropdown,
            },
            {
              label: "Logout",
              to: `/auth/signin`,
              fn: handleLogout,
            },
          ],
        }}
      />
    </div>
  );
};

export default UserDropdown;
