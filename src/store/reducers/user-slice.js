import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "http://localhost:8080/api/v1";

const initialUserState = {
  singleUser: {},
  users: [],
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setSingleUser(state, action) {
      state.singleUser = action.payload.data;
    },
    setUsers(state, action) {
      state.users = action.payload.data;
    },
  },
});

export const getUser = (token, userInput) => {
  return async (dispatch) => {
    try {
      const axiosOptions = {
        method: "GET",
        url: `${URL}/users/${userInput.username}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      };

      const response = await axios(axiosOptions);

      if (response.status === 200) {
        dispatch(
          userSlice.actions.setSingleUser({ data: response.data.data.user })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export default userSlice;
