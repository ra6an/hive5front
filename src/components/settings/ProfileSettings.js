import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import classes from "./ProfileSettings.module.scss";

// COMPONENTS
import SingleAuthInput from "../auth/SingleAuthInput";

// STORE
import { updateMe } from "../../store/reducers/auth-slice";

const schema = yup
  .object({
    username: yup
      .string()
      .min(3, "Username have to be at least 3 characters long")
      .max(50, "Username can't contain more than 50 characters")
      .required("Username is required!"),
    // password: yup
    //   .string()
    //   .min(6, "Password have to be at least 6 characters long")
    //   .max(50, "Password can't contain more than 50 characters'")
    //   .required("Password is required!"),
    // confirmPassword: yup
    //   .string()
    //   .oneOf(
    //     [yup.ref("password")],
    //     "Confirm password and Password are not same"
    //   )
    //   .required("Confirm password is required!"),
  })
  .required();

const ProfileSettings = (props) => {
  const dispatch = useDispatch();
  const { user, token, isAuthenticated } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      setValue("username", user.username);
    }
  }, [setValue, user]);

  const onSubmit = (data) => {
    if (!isAuthenticated || !token || data.username === user.username) return;

    dispatch(updateMe(token, { username: data.username }));
  };

  return (
    <div className={`${classes.container}`}>
      <h3>{`Profile Settings:`}</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={`${classes["form__inputs"]}`}>
          <SingleAuthInput
            data={{
              label: "username",
              type: "text",
              placeholder: "Username",
              register,
              errors: errors.username,
              showLabel: true,
            }}
          />
        </div>
        <div className={`${classes["form__btns"]}`}>
          <button type="submit" className={`primary-bg`}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSettings;
