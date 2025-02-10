import { configureStore } from "@reduxjs/toolkit";

// REDUCERS
import authSlice from "./reducers/auth-slice";
import postSlice from "./reducers/post-slice";
import userSlice from "./reducers/user-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    post: postSlice.reducer,
    user: userSlice.reducer,
  },
});

export const authActions = authSlice.actions;
export const postActions = postSlice.actions;
export const userActions = userSlice.actions;

export default store;
