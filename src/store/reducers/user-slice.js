import { createSlice } from "@reduxjs/toolkit";

// HANDLE ERROR
import handleError from "../../utils/handle-error";

// FETCH HANDLER
import fetchData from "../../utils/fetch-data";

const URL = `${process.env.REACT_APP_URL}`;

const initialUserState = {
  userError: "",
  userSuccess: "",
  singleUser: {},
  users: [],
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setUserError(state, action) {
      state.userError = action.payload.value;
    },
    setUserSuccess(state, action) {
      state.userSuccess = action.payload.value;
    },
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
      const urlPath = `${URL}/users/${userInput.username}`;
      const response = await fetchData("GET", urlPath, {}, token);

      if (response.status === 200) {
        dispatch(
          userSlice.actions.setSingleUser({ data: response.data.data.user })
        );
      }
    } catch (err) {
      handleError(err, dispatch, userSlice.actions.setUserError);
    }
  };
};

export const getNonFriendUsers = (token) => {
  return async (dispatch) => {
    try {
      const urlPath = `${URL}/users/find-new-friends`;
      const response = await fetchData("GET", urlPath, {}, token);

      if (response.status === 200) {
        dispatch(userSlice.actions.setUsers({ data: response.data.data.data }));
      }
    } catch (err) {
      handleError(err, dispatch, userSlice.actions.setUserError);
    }
  };
};

export default userSlice;
