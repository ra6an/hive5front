import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";

import classes from "./Auth.module.scss";

// COMPONENTS
import AuthContainer from "../components/auth/AuthContainer";

let __INNIT__ = false;

const Auth = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [historyUrl, setHistoryUrl] = useState("/home");

  useEffect(() => {
    if (__INNIT__) return;
    setHistoryUrl(`${location.pathname}`);
    __INNIT__ = true;
  }, [location.pathname]);

  useEffect(() => {
    if (props.isAuthenticated) {
      navigate(historyUrl);
    }
  }, [props.isAuthenticated, navigate, historyUrl]);

  return (
    <div className={classes.container}>
      <AuthContainer />
    </div>
  );
};

export default Auth;
