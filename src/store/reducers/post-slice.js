import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "http://localhost:8080/api/v1";

const initialPostState = {
  posts: [],
  post: {},
  postsLength: 0,
};

const postSlice = createSlice({
  name: "post",
  initialState: initialPostState,
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload.data;
    },
    setPostsLength(state, action) {
      state.postsLength = action.payload.data;
    },
    setPost(state, action) {
      state.post = action.payload.data;
    },
  },
});

export const getPosts = (token) => {
  return async (dispatch) => {
    try {
      const axiosOptions = {
        method: "GET",
        url: `${URL}/posts/`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      };

      const response = await axios(axiosOptions);

      if (response.status === 200) {
        dispatch(postSlice.actions.setPosts({ data: response.data.data.data }));
        dispatch(
          postSlice.actions.setPostsLength({
            data: response.data.data.postsCount,
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const getPostsById = (token, postId) => {
  return async (dispatch) => {
    try {
      const axiosOptions = {
        method: "GET",
        url: `${URL}/posts/${postId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      };

      const response = await axios(axiosOptions);

      if (response.status === 200) {
        dispatch(postSlice.actions.setPost({ data: response.data.data.data }));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export default postSlice;
