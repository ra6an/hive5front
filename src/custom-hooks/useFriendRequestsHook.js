import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// STORE
import {
  createFriendRequest,
  handleFriendRequest,
} from "../store/reducers/auth-slice";

const useFriendRequestsHook = (props) => {
  const dispatch = useDispatch();
  const {
    token,
    isAuthenticated,
    pendingFriendRequests,
    sentFriendRequests,
    friends,
  } = useSelector((state) => state.auth);

  const [isPending, setIsPending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [areFriends, setAreFriends] = useState(false);

  useEffect(() => {
    if (!props.userId) return;

    setAreFriends(
      friends.some(
        (fr) =>
          (fr.sender.id === props.userId || fr.receiver.id === props.userId) &&
          fr.status === "ACCEPTED"
      )
    );
  }, [friends, props.userId]);

  useEffect(() => {
    if (!props.userId) return;

    setIsPending(
      pendingFriendRequests.some(
        (fr) => fr.sender.id === props.userId || fr.receiver.id === props.userId
      )
    );
  }, [isPending, props.userId, pendingFriendRequests]);

  useEffect(() => {
    if (!props.userId) return;

    setIsSent(
      sentFriendRequests.some(
        (fr) => fr.sender.id === props.userId || fr.receiver.id === props.userId
      )
    );
  }, [isSent, props.userId, sentFriendRequests]);

  const handleSendFriendRequest = () => {
    if (!token || !isAuthenticated || !props.userId) return;

    dispatch(createFriendRequest(token, { userId: props.userId }));
  };

  const handleAcceptFriendRequest = () => {
    if (!token || !isAuthenticated) return;

    let friendRequestId = !props.friendRequestId
      ? findFriendRequest().id
      : props.friendRequestId;

    if (!friendRequestId) return;

    dispatch(
      handleFriendRequest(token, {
        friendRequestId,
        statusType: "accept",
      })
    );
  };

  const handleRejectFriendRequest = () => {
    if (!token || !isAuthenticated) return;

    let friendRequestId = !props.friendRequestId
      ? findFriendRequest().id
      : props.friendRequestId;

    if (!friendRequestId) return;

    dispatch(
      handleFriendRequest(token, {
        friendRequestId,
        statusType: "reject",
      })
    );
  };

  const findFriendRequest = () => {
    return pendingFriendRequests.find(
      (fr) => fr.sender.id === props.userId || fr.receiver.id === props.userId
    );
  };

  return {
    // HANDLERS
    handleSendFriendRequest,
    handleAcceptFriendRequest,
    handleRejectFriendRequest,

    // VARIABLES
    isPending,
    isSent,
    areFriends,
  };
};

export default useFriendRequestsHook;
