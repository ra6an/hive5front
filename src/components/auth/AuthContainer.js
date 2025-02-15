import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

import classes from "./AuthContainer.module.scss";

// COMPONENTS
import Signin from "./Signin";
import Signup from "./Signup";

const VALID_PATHS = [
  "/auth/signup",
  "/auth/signup/",
  "/auth/signin",
  "/auth/signin/",
];

const AuthContainer = (props) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!VALID_PATHS.includes(location.pathname)) {
      navigate("/auth/signup");
    }
  }, [location.pathname, navigate]);

  return (
    <div className={`fade-in ${classes.container}`}>
      {location.pathname === "/auth/signup" && <Signup />}
      {location.pathname === "/auth/signin" && <Signin />}
    </div>
  );
};

export default AuthContainer;
