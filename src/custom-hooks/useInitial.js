import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// STORE
import { authActions } from "../store/redux-store";
import { getMyData } from "../store/reducers/auth-slice";

const useInitial = (props) => {
  const dispatch = useDispatch();
  const { isAuthenticated, user, token } = useSelector((state) => state.auth);
  const [curTheme, setCurTheme] = useState("light");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(getMyData(token));
    }
  }, [dispatch]);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (!theme) localStorage.setItem("theme", "dark");

    if (theme) {
      setCurTheme(theme);
    }
  }, []);

  const handleThemeChange = () => {
    if (curTheme === "light") {
      setCurTheme("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setCurTheme("light");
      localStorage.setItem("theme", "light");
    }
  };

  return {
    isAuthenticated,
    user,
    token,
    curTheme,
    // FNs
    handleThemeChange,
  };
};

export default useInitial;
