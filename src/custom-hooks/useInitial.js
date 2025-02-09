import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// STORE
import { authActions } from "../store/redux-store";
import { getMyData } from "../store/reducers/auth-slice";

const useInitial = (props) => {
  const dispatch = useDispatch();
  const { isAuthenticated, user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(getMyData(token));
    }
  }, [dispatch]);

  return {
    isAuthenticated,
    user,
    token,
  };
};

export default useInitial;
