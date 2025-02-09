import React, { useEffect } from "react";
import { useNavigate } from "react-router";

import classes from "./Auth.module.scss";

// COMPONENTS
import AuthContainer from "../components/auth/AuthContainer";

const Auth = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (props.isAuthenticated) {
      navigate("/home");
    }
  }, [props.isAuthenticated, navigate]);

  return (
    <div className={classes.container}>
      <AuthContainer />
    </div>
  );
};

export default Auth;
