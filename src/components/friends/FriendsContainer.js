import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import classes from "./FriendsContainer.module.scss";

// COMPONENTS
import SingleFriend from "./SingleFriend";

const FriendsContainer = (props) => {
  const [friendsRenderer, setFriendsRenderer] = useState([]);
  const { friends } = useSelector((state) => state.auth);
  const [showFriendsList, setShowFriendsList] = useState(false);

  useEffect(() => {
    const _filteredFriends = friends.filter((f) => f.status === "ACCEPTED");
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
        className={`post ${classes["friends__container"]}`}
        style={showFriendsList ? {} : { transform: `translateY(110%)` }}
      >
        {friendsRenderer}
      </div>
      <div
        className={`primary-bg ${classes["btn"]}`}
        onClick={showFriendsListHandler}
      >{`Friends (${friends.length})`}</div>
    </div>
  );
};

export default FriendsContainer;
