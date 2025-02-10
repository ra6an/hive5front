import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "http://localhost:8080/api/v1";

const initialAuthState = {
  user: {},
  isAuthenticated: false,
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload.data;
    },
    setToken(state, action) {
      state.token = action.payload.value;
      localStorage.setItem("token", action.payload.value);
    },
    setAuth(state, action) {
      state.isAuthenticated = action.payload.value;
    },
    logout(state) {
      state.user = {};
      state.isAuthenticated = false;
      state.token = "";
      localStorage.removeItem("token");
      // localStorage.removeItem("token-exp");
    },
  },
});

export const signup = (userInput, navigate) => {
  return async (dispatch) => {
    try {
      const axiosOptions = {
        method: "POST",
        url: `${URL}/auth/signup`,
        data: userInput,
        headers: {},
      };

      const response = await axios(axiosOptions);

      if (response.status === 200) {
        dispatch(authSlice.actions.setUser({ data: response.data.data.user }));
        dispatch(
          authSlice.actions.setToken({ value: response.data.data.token })
        );
        dispatch(authSlice.actions.setAuth({ value: true }));
        navigate("/home");
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const signin = (userInput, navigate) => {
  return async (dispatch) => {
    try {
      const axiosOptions = {
        method: "POST",
        url: `${URL}/auth/signin`,
        data: userInput,
        headers: {},
      };

      const response = await axios(axiosOptions);

      if (response.status === 200) {
        dispatch(authSlice.actions.setUser({ data: response.data.data.user }));
        dispatch(
          authSlice.actions.setToken({ value: response.data.data.token })
        );
        dispatch(authSlice.actions.setAuth({ value: true }));
        navigate("/home");
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const getMyData = (token) => {
  return async (dispatch) => {
    try {
      const axiosOptions = {
        method: "GET",
        url: `${URL}/users/me`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      };

      const response = await axios(axiosOptions);

      if (response.status === 200) {
        dispatch(authSlice.actions.setUser({ data: response.data.data.user }));
        dispatch(authSlice.actions.setAuth({ value: true }));
        dispatch(authSlice.actions.setToken({ value: token }));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const { logout } = authSlice.actions;

export default authSlice;
