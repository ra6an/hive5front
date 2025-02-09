import React from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import classes from "./Signin.module.scss";

// COMPONENTS
import SingleAuthInput from "./SingleAuthInput";
import AuthBtn from "./AuthBtn";

// IMAGE
import logo1024 from "../../images/hive5logo1024.png";

// STORE
import { signin } from "../../store/reducers/auth-slice";

const schema = yup
  .object({
    username: yup
      .string()
      .min(3, "Username have to be at least 3 characters long")
      .max(50, "Username can't contain more than 50 characters")
      .required("Username is required!"),
    password: yup
      .string()
      .min(6, "Password have to be at least 6 characters long")
      .max(50, "Password can't contain more than 50 characters'")
      .required("Password is required!"),
  })
  .required();

const Signin = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = () => {
    dispatch(signin({ username: "ra6an", password: "test123" }, navigate));
  };

  return (
    <div className={`post ${classes.container}`}>
      <div className={classes.logo}>
        <img src={logo1024} alt="logo" className={classes["logo__image"]} />
      </div>
      <h2>SignIn</h2>
      <div className={classes["signin"]}>
        <p>If you don't have an account...</p>
        <Link to={"/auth/signup"} className={classes["signin__btn"]}>
          Sign Up
        </Link>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SingleAuthInput
          data={{
            label: "username",
            type: "text",
            placeholder: "Username",
            errors: errors.username,
            register: register,
          }}
        />
        <SingleAuthInput
          data={{
            label: "password",
            type: "password",
            placeholder: "Password",
            errors: errors.password,
            register: register,
          }}
        />
        <AuthBtn title={"SignIn"} />
      </form>
    </div>
  );
};

export default Signin;
