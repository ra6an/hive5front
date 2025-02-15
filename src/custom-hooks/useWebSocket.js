import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { connectSocket, disconnectSocket } from "../socket/socketConfig";
import { authActions } from "../store/redux-store";

const useWebSocket = (props) => {
  const dispatch = useDispatch();
  const { isAuthenticated, token, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated && token && user?.id) {
      connectSocket(user.id, (msg) => {
        if (msg.wsType === "NOTIFICATION") {
          if (msg.data.type === "FRIEND_REQUEST_ACCEPTED") {
            dispatch(authActions.addFriends({ data: msg.friendRequestData }));
          } else {
            dispatch(authActions.addNewNotifications({ data: msg.data }));
          }
        }

        if (msg.wsType === "FRIENDREQUEST") {
          dispatch(authActions.addPendingFriendRequest({ data: msg.request }));
        }

        if (msg.wsType === "MESSAGE") {
        }
      });
    }

    return () => {
      disconnectSocket();
    };
  }, [isAuthenticated, token, user?.id]);

  return;
};

export default useWebSocket;
