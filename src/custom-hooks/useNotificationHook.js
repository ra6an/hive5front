import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// STORE
import { postActions } from "../store/redux-store";

const useNotificationHook = (props) => {
  const dispatch = useDispatch();
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
    console.log(highlightComment, highlightedParentComment, "🎉");
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

  return {
    // VALUES
    haveUnreadNotifications,
    seenNotifications,
    unseenNotifications,
    notifications,
    // FUNCTIONS
    highlightComment,
    hightlightLikedComment,
  };
};

export default useNotificationHook;
