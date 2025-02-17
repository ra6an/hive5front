import { createSlice } from "@reduxjs/toolkit";

// HANDLE ERRORS
import handleError from "../../utils/handle-error";

// FETCH HANDLER
import fetchData from "../../utils/fetch-data";

const URL = `${process.env.REACT_APP_URL}`;

const initialAuthState = {
  authError: "",
  authSuccess: "",
  user: {},
  pendingFriendRequests: [],
  sentFriendRequests: [],
  friends: [],
  notifications: [],
  messages: [],
  isAuthenticated: false,
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    setAuthError(state, action) {
      state.authError = action.payload.value;
    },
    setAuthSuccess(state, action) {
      state.authSuccess = action.payload.value;
    },
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
    },
    setPendingFriendRequest(state, action) {
      state.pendingFriendRequests = action.payload.data;
    },
    addPendingFriendRequest(state, action) {
      state.pendingFriendRequests = [
        action.payload.data,
        ...state.pendingFriendRequests,
      ];
    },
    setFriends(state, action) {
      state.friends = action.payload.data;
    },
    addFriends(state, action) {
      state.friends = [action.payload.data, ...state.friends];
    },
    setSentFriendRequests(state, action) {
      state.sentFriendRequests = action.payload.data;
    },
    addNewSentFriendRequest(state, action) {
      state.sentFriendRequests = [
        action.payload.data,
        ...state.sentFriendRequests,
      ];
    },
    setAddFriend(state, action) {
      const friendRequest = action.payload.data;
      state.pendingFriendRequests = state.pendingFriendRequests.filter(
        (fr) => fr.id !== friendRequest.id
      );
      state.friends = [...state.friends, friendRequest];
    },
    updateFriendRequests(state, action) {
      const friendRequest = action.payload.data;
      state.pendingFriendRequests = state.pendingFriendRequests.filter(
        (fr) => fr.id !== friendRequest.id
      );
      state.friends = [...state.friends, friendRequest];
    },
    setNotifications(state, action) {
      state.notifications = action.payload.data;
    },
    addNewNotifications(state, action) {
      state.notifications = [action.payload.data, ...state.notifications];
    },
    updateNotifications(state, action) {
      const notification = action.payload.data;
      state.notifications = state.notifications.map((not) =>
        not.id === notification.id ? notification : not
      );
    },
    setMessages(state, action) {
      state.messages = action.payload.data;
    },
  },
});

export const signup = (userInput, navigate) => {
  return async (dispatch) => {
    try {
      const urlPath = `${URL}/auth/signup`;
      const response = await fetchData("POST", urlPath, userInput, null);

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
      handleError(err, dispatch, authSlice.actions.setAuthError);
    }
  };
};

export const signin = (userInput, navigate) => {
  return async (dispatch) => {
    try {
      const urlPath = `${URL}/auth/signin`;
      const response = await fetchData("POST", urlPath, userInput, null);

      if (response.status === 200) {
        dispatch(authSlice.actions.setUser({ data: response.data.data.user }));
        dispatch(
          authSlice.actions.setToken({ value: response.data.data.token })
        );
        dispatch(authSlice.actions.setAuth({ value: true }));
        navigate("/home");
      }
    } catch (err) {
      handleError(err, dispatch, authSlice.actions.setAuthError);
    }
  };
};

export const getMyData = (token) => {
  return async (dispatch) => {
    try {
      const urlPath = `${URL}/users/me`;
      const response = await fetchData("GET", urlPath, {}, token);

      if (response.status === 200) {
        handleInitialData(dispatch, response, token);
      }
    } catch (err) {
      handleError(err, dispatch, authSlice.actions.setAuthError);
    }
  };
};

export const createFriendRequest = (token, userInputs) => {
  return async (dispatch) => {
    try {
      const urlPath = `${URL}/friend-requests/send/${userInputs.userId}`;
      const response = await fetchData("POST", urlPath, null, token);

      if (response.status === 200) {
        dispatch(
          authSlice.actions.addNewSentFriendRequest({
            data: response.data.data.request,
          })
        );
      }
    } catch (err) {
      handleError(err, dispatch, authSlice.actions.setAuthError);
    }
  };
};

export const handleFriendRequest = (token, userInputs) => {
  return async (dispatch) => {
    try {
      const urlPath = `${URL}/friend-requests/${userInputs.friendRequestId}/${userInputs.statusType}`;
      const response = await fetchData("PATCH", urlPath, null, token);

      if (response.status === 200) {
        dispatch(
          authSlice.actions.updateFriendRequests({
            data: response.data.data.data,
          })
        );
      }
    } catch (err) {
      handleError(err, dispatch, authSlice.actions.setAuthError);
    }
  };
};

export const handleSeenNotification = (token, userInputs) => {
  return async (dispatch) => {
    try {
      const urlPath = `${URL}/notifications/${userInputs.notificationId}/seen`;
      const response = await fetchData("PATCH", urlPath, null, token);

      if (response.status === 200) {
        dispatch(
          authSlice.actions.updateNotifications({
            data: response.data.data.data,
          })
        );
      }
    } catch (err) {
      handleError(err, dispatch, authSlice.actions.setAuthError);
    }
  };
};

export const updateMe = (token, userInputs) => {
  return async (dispatch) => {
    try {
      const urlPath = `${URL}/users/me`;
      const response = await fetchData("PATCH", urlPath, userInputs, token);

      if (response.status === 200) {
        handleInitialData(dispatch, response, response.data.data.token);
      }
    } catch (err) {
      handleError(err, dispatch, authSlice.actions.setAuthError);
    }
  };
};

const handleInitialData = (dispatch, response, token) => {
  dispatch(authSlice.actions.setUser({ data: response.data.data.user }));
  dispatch(
    authSlice.actions.setPendingFriendRequest({
      data: response.data.data.initialData.pendingFriendRequests,
    })
  );
  dispatch(
    authSlice.actions.setFriends({
      data: response.data.data.initialData.friends,
    })
  );
  dispatch(
    authSlice.actions.setSentFriendRequests({
      data: response.data.data.initialData.sentFriendRequests,
    })
  );
  dispatch(
    authSlice.actions.setNotifications({
      data: response.data.data.initialData.notifications,
    })
  );
  dispatch(
    authSlice.actions.setMessages({
      data: response.data.data.initialData.messages,
    })
  );
  dispatch(authSlice.actions.setAuth({ value: true }));
  dispatch(authSlice.actions.setToken({ value: token }));
};

export const { logout } = authSlice.actions;

export default authSlice;
