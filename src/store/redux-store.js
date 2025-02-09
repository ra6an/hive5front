import { configureStore } from "@reduxjs/toolkit";

// REDUCERS
import authSlice from "./reducers/auth-slice";
import postSlice from "./reducers/post-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    post: postSlice.reducer,
  },
});

export const authActions = authSlice.actions;
export const postActions = postSlice.actions;

export default store;
