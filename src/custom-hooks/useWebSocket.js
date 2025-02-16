import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { connectSocket, disconnectSocket } from "../socket/socketConfig";
import { authActions } from "../store/redux-store";

import handleSuccess from "../utils/handle-success";

const useWebSocket = (props) => {
  const dispatch = useDispatch();
  const { isAuthenticated, token, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated && token && user?.id) {
      connectSocket(user.id, (msg) => {
        if (msg.wsType === "NOTIFICATION") {
          if (msg.data.type === "FRIEND_REQUEST_ACCEPTED") {
            dispatch(authActions.addFriends({ data: msg.friendRequestData }));

            dispatch(
              authActions.setAuthSuccess({
                value: `${msg.friendRequestData?.receiver?.username} accepted your friend request.`,
              })
            );
          } else {
            dispatch(authActions.addNewNotifications({ data: msg.data }));

            const user = msg.data.sender.username;
            const type =
              msg.data.type === "COMMENT" ? "replied to your" : "liked your";
            const targetType =
              msg.data.targetType === "COMMENT" ? "comment" : "post";
            dispatch(
              authActions.setAuthSuccess({
                value: `${user} ${type} ${targetType}.`,
              })
            );
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
  }, [isAuthenticated, token, user?.id, dispatch]);

  return;
};

export default useWebSocket;
