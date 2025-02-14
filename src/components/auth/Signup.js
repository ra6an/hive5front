import React from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import classes from "./Signup.module.scss";

// COMPONENTS
import SingleAuthInput from "./SingleAuthInput";
import AuthBtn from "./AuthBtn";

// IMAGE
import logo1024 from "../../images/hive5logo1024.png";

// STORE
import { signup } from "../../store/reducers/auth-slice";

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
    confirmPassword: yup
      .string()
      .oneOf(
        [yup.ref("password")],
        "Confirm password and Password are not same"
      )
      .required("Confirm password is required!"),
  })
  .required();

const Signup = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    dispatch(
      signup(
        {
          username: data.username,
          password: data.password,
          confirmPassword: data.confirmPassword,
        },
        navigate
      )
    );
  };

  return (
    <div className={`post ${classes.container}`}>
      <div className={classes.logo}>
        <img src={logo1024} alt="logo" className={classes["logo__image"]} />
      </div>
      <h2>Signup</h2>
      <div className={classes["signin"]}>
        <p>If you already have an account...</p>
        <Link to={"/auth/signin"} className={classes["signin__btn"]}>
          Sign In
        </Link>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SingleAuthInput
          data={{
            label: "username",
            type: "text",
            placeholder: "Username",
            register,
            errors: errors.username,
          }}
        />
        <SingleAuthInput
          data={{
            label: "password",
            type: "password",
            placeholder: "Password",
            register,
            errors: errors.password,
          }}
        />
        <SingleAuthInput
          data={{
            label: "confirmPassword",
            type: "password",
            placeholder: "Confirm Password",
            register,
            errors: errors.confirmPassword,
          }}
        />
        <AuthBtn title={"SignUp"} />
      </form>
    </div>
  );
};

export default Signup;
