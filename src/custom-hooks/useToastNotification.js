import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// STORE
import { authActions, postActions, userActions } from "../store/redux-store";

const CLOSE_MESSAGE_AFTER = 3000;

const useToastNotification = (props) => {
  const dispatch = useDispatch();
  const { userError, userSuccess } = useSelector((state) => state.user);
  const { authError, authSuccess } = useSelector((state) => state.auth);
  const { postError, postSuccess } = useSelector((state) => state.post);

  const [errorMessages, setErrorMessages] = useState([]);
  const [successMessages, setSuccessMessages] = useState([]);

  useEffect(() => {
    if (userError) {
      setErrorMessages([userError, ...errorMessages]);
      dispatch(userActions.setUserError({ value: "" }));
    }
    if (authError) {
      setErrorMessages([authError, ...errorMessages]);
      dispatch(authActions.setAuthError({ value: "" }));
    }
    if (postError) {
      setErrorMessages([postError, ...errorMessages]);
      dispatch(postActions.setPostError({ value: "" }));
    }
  }, [dispatch, userError, authError, postError, errorMessages]);

  useEffect(() => {
    if (userSuccess) {
      setSuccessMessages([userSuccess, ...successMessages]);
      dispatch(userActions.setUserSuccess({ value: "" }));
    }
    if (authSuccess) {
      setSuccessMessages([authSuccess, ...successMessages]);
      dispatch(authActions.setAuthSuccess({ value: "" }));
    }
    if (postSuccess) {
      setSuccessMessages([postSuccess, ...successMessages]);
      dispatch(postActions.setPostSuccess({ value: "" }));
    }
  }, [dispatch, userSuccess, authSuccess, postSuccess, successMessages]);

  useEffect(() => {
    if (successMessages.length !== 0) {
      showSuccess(successMessages[successMessages.length - 1]);
      setSuccessMessages(successMessages.slice(0, successMessages.length - 1));
    }
    if (errorMessages.length !== 0) {
      showError(errorMessages[errorMessages.length - 1]);
      setErrorMessages(errorMessages.slice(0, errorMessages.length - 1));
    }
  }, [errorMessages, successMessages]);

  const showSuccess = (msg) => {
    toast.success(msg, {
      position: "bottom-left",
      autoClose: CLOSE_MESSAGE_AFTER,
    });
  };

  const showError = (err) => {
    toast.error(err, {
      position: "bottom-left",
      autoClose: CLOSE_MESSAGE_AFTER,
    });
  };

  return { showSuccess, showError };
};

export default useToastNotification;
