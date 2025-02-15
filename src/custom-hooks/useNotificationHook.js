import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// STORE
import { postActions } from "../store/redux-store";
import { handleSeenNotification } from "../store/reducers/auth-slice";

const useNotificationHook = (props) => {
  const dispatch = useDispatch();
  const { isAuthenticated, token, user } = useSelector((state) => state.auth);
  const { notifications } = useSelector((state) => state.auth);
  const [haveUnreadNotifications, setHaveUnreadNotifications] = useState(false);
  const [seenNotifications, setSeenNotifications] = useState([]);
  const [unseenNotifications, setUnseenNotifications] = useState([]);

  useEffect(() => {
    setHaveUnreadNotifications(notifications.some((n) => !n.read));
    setUnseenNotifications(notifications.filter((n) => !n.read));
    setSeenNotifications(notifications.filter((n) => n.read));
  }, [notifications]);

  const highlightComment = (highlightComment, highlightedParentComment) => {
    dispatch(postActions.setHighlightComment({ value: highlightComment }));
    dispatch(
      postActions.setHighlightedParentComment({
        value: highlightedParentComment,
      })
    );
  };

  const hightlightLikedComment = (highlightComment) => {
    dispatch(postActions.setHighlightLikedComment({ value: highlightComment }));
  };

  const handleSeenNotifications = (notificationId) => {
    if (!token || !isAuthenticated) return;

    dispatch(handleSeenNotification(token, { notificationId: notificationId }));
  };

  return {
    // VALUES
    haveUnreadNotifications,
    seenNotifications,
    unseenNotifications,
    notifications,
    // FUNCTIONS
    highlightComment,
    hightlightLikedComment,
    handleSeenNotifications,
  };
};

export default useNotificationHook;
