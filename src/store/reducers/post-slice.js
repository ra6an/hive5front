import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL = `${process.env.REACT_APP_URL}`;

const initialPostState = {
  posts: [],
  post: {},
  highlightComment: 0,
  highlightedParentComment: 0,
  highlightLikedComment: 0,
  postsLength: 0,
};

const postSlice = createSlice({
  name: "post",
  initialState: initialPostState,
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload.data;
    },
    addNewPostToPosts(state, action) {
      let copyOfPosts = [...state.posts];
      copyOfPosts.unshift(action.payload.data);
      state.posts = copyOfPosts;
      state.postsLength = state.postsLength + 1;
    },
    setPostsLength(state, action) {
      state.postsLength = action.payload.data;
    },
    setPost(state, action) {
      state.post = action.payload.data;
    },
    clearPost(state) {
      state.post = {};
      state.highlightComment = 0;
      state.highlightedParentComment = 0;
      state.highlightLikedComment = 0;
    },
    setHighlightComment(state, action) {
      state.highlightComment = action.payload.value;
    },
    setHighlightedParentComment(state, action) {
      state.highlightedParentComment = action.payload.value;
    },
    setHighlightLikedComment(state, action) {
      state.highlightLikedComment = action.payload.value;
    },
    addCommentToPost(state, action) {
      const newComment = action.payload.data;
      state.posts = state.posts.map((post) =>
        post.id === newComment.post
          ? {
              ...post,
              comments: [
                newComment,
                ...post.comments.map((comment) =>
                  comment.id === newComment.parentComment
                    ? {
                        ...comment,
                        replies: [...comment.replies, newComment.id],
                      }
                    : comment
                ),
              ],
            }
          : post
      );

      if (state.post?.id === newComment.post) {
        state.post = {
          ...state.post,
          comments: [
            newComment,
            ...state.post.comments.map((comment) =>
              comment.id === newComment.parentComment
                ? { ...comment, replies: [...comment.replies, newComment.id] }
                : comment
            ),
          ],
        };
      }
    },
    addLikeToPost(state, action) {
      const newLike = action.payload.data;

      state.posts = state.posts.map((post) =>
        post.id === newLike.post
          ? { ...post, likes: [newLike, ...post.likes] }
          : post
      );

      if (state.post?.id === newLike.post) {
        state.post = { ...state.post, likes: [newLike, ...state.post.likes] };
      }
    },
    addLikeToComment(state, action) {
      const { like: newLike, postId } = action.payload.data;

      state.posts = state.posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments.map((comment) =>
                comment.id === newLike.comment
                  ? { ...comment, likes: [newLike, ...comment.likes] }
                  : comment
              ),
            }
          : post
      );

      if (state.post?.id === postId) {
        state.post = {
          ...state.post,
          comments: state.post.comments.map((comment) =>
            comment.id === newLike.comment
              ? { ...comment, likes: [newLike, ...comment.likes] }
              : comment
          ),
        };
      }
    },
    removeLikeFromPost(state, action) {
      const { postId, likeId } = action.payload.data;

      state.posts = state.posts.map((post) =>
        post.id === postId
          ? { ...post, likes: post.likes.filter((like) => like.id !== likeId) }
          : post
      );

      if (state.post?.id === postId) {
        state.post = {
          ...state.post,
          likes: state.post.likes.filter((like) => like.id !== likeId),
        };
      }
    },
    removeLikeFromComment(state, action) {
      const { postId, commentId, likeId } = action.payload.data;

      state.posts = state.posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments.map((comment) =>
                comment.id === commentId
                  ? {
                      ...comment,
                      likes: comment.likes.filter((like) => like.id !== likeId),
                    }
                  : comment
              ),
            }
          : post
      );

      if (state.post?.id === postId) {
        state.post = {
          ...state.post,
          comments: state.post.comments.map((comment) =>
            comment.id === commentId
              ? {
                  ...comment,
                  likes: comment.likes.filter((like) => like.id !== likeId),
                }
              : comment
          ),
        };
      }
    },
  },
});

export const getPosts = (token, userInputs) => {
  return async (dispatch) => {
    try {
      let URL_EXTENSION = `user/${userInputs.user}`;

      if (userInputs.user) {
        URL_EXTENSION = `user/${userInputs.user}`;
      } else {
        URL_EXTENSION = `${userInputs.extension}`;
      }

      const axiosOptions = {
        method: "GET",
        url: `${URL}/posts/${URL_EXTENSION}`,
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

export const getPostByCommentId = (token, commentId) => {
  return async (dispatch) => {
    try {
      const axiosOptions = {
        method: "GET",
        url: `${URL}/comments/${commentId}`,
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

export const createNewPost = (token, userInputs, fn) => {
  return async (dispatch) => {
    try {
      const axiosOptions = {
        method: "POST",
        url: `${URL}/posts/create`,
        data: userInputs,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      };

      const response = await axios(axiosOptions);

      if (response.status === 200) {
        dispatch(
          postSlice.actions.addNewPostToPosts({ data: response.data.data.data })
        );
        fn();
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const createComment = (token, userInputs, fn) => {
  return async (dispatch) => {
    try {
      const axiosOptions = {
        method: "POST",
        url: `${URL}/comments/`,
        data: userInputs,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      };

      const response = await axios(axiosOptions);

      if (response.status === 200) {
        dispatch(
          postSlice.actions.addCommentToPost({ data: response.data.data.data })
        );

        fn();
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const like = (token, userInputs, fn = () => {}) => {
  return async (dispatch) => {
    try {
      const axiosOptions = {
        method: "POST",
        url: `${URL}/likes/${userInputs.type}/${userInputs.id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      };

      const response = await axios(axiosOptions);

      if (response.status === 200) {
        if (userInputs.type === "post") {
          dispatch(
            postSlice.actions.addLikeToPost({ data: response.data.data.data })
          );
        } else if (userInputs.type === "comment") {
          dispatch(
            postSlice.actions.addLikeToComment({
              data: {
                like: response.data.data.data,
                postId: userInputs.postId,
              },
            })
          );
        }

        fn();
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const dislike = (token, userInputs, fn = () => {}) => {
  return async (dispatch) => {
    try {
      const axiosOptions = {
        method: "POST",
        url: `${URL}/likes/dislike/${userInputs.type}/${userInputs.id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      };

      const response = await axios(axiosOptions);

      if (response.status === 200) {
        if (userInputs.type === "post") {
          dispatch(
            postSlice.actions.removeLikeFromPost({
              data: {
                likeId: response.data.data.likeId,
                postId: userInputs.id,
              },
            })
          );
        } else if (userInputs.type === "comment") {
          dispatch(
            postSlice.actions.removeLikeFromComment({
              data: {
                postId: userInputs.postId,
                commentId: userInputs.id,
                likeId: response.data.data.likeId,
              },
            })
          );
        }

        fn();
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export default postSlice;
