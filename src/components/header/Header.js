import React from "react";

import classes from "./Header.module.scss";

// COMPONENTS
import Logo from "./Logo";
import UserLinks from "./UserLinks";
import Links from "./Links";

const Header = (props) => {
  return (
    <header className={classes.container}>
      <Logo />
      <Links />
      <UserLinks />
    </header>
  );
};

export default Header;
