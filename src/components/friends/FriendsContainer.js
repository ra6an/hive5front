import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import classes from "./FriendsContainer.module.scss";

// COMPONENTS
import SingleFriend from "./SingleFriend";
import FindFriends from "./FindFriends";

const FriendsContainer = (props) => {
  const [friendsRenderer, setFriendsRenderer] = useState([]);
  const { friends } = useSelector((state) => state.auth);
  const [showFriendsList, setShowFriendsList] = useState(false);
  const [friendsLength, setFriendsLength] = useState(0);

  useEffect(() => {
    const _filteredFriends = friends.filter((f) => f.status === "ACCEPTED");

    setFriendsLength(_filteredFriends.length || 0);
    setFriendsRenderer(
      _filteredFriends.map((f) => <SingleFriend key={f.id} data={f} />)
    );
  }, [friends]);

  const showFriendsListHandler = (e) => {
    e.preventDefault();
    setShowFriendsList(!showFriendsList);
  };

  return (
    <div className={`text ${classes.container}`}>
      <div
        className={`box-shadow post ${classes["friends__container"]}`}
        style={showFriendsList ? {} : { transform: `translateY(110%)` }}
      >
        {friendsRenderer.length > 0 ? (
          friendsRenderer
        ) : (
          <FindFriends setShowFriendsList={setShowFriendsList} />
        )}
      </div>
      <div
        className={`primary-bg ${classes["btn"]}`}
        onClick={showFriendsListHandler}
      >{`Friends (${friendsLength})`}</div>
    </div>
  );
};

export default FriendsContainer;
