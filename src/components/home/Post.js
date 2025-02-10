import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { useSelector } from "react-redux";

import classes from "./Post.module.scss";

// COMPONENTS
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
import PostComments from "./PostComments";

const Post = (props) => {
  const { user } = useSelector((state) => state.auth);
  const [showComments, setShowComments] = useState(false);
  const [likedPost, setLikedPost] = useState(false);

  useEffect(() => {
    if (Object.keys(props.data).length === 0 || !user.username) return;

    setLikedPost(
      props.data.likes.some((l) => l.user?.username === user.username)
    );
  }, [props?.data, user?.username]);

  const ToggleCommentsHandler = (e) => {
    e.preventDefault();
    setShowComments(!showComments);
  };

  return (
    <div className={`${classes.container} post`} id={props.data.id}>
      <PostHeader
        user={props.data?.user}
        createdAt={props.data?.createdAt}
        cantPost={props.cantPost}
      />
      <Link to={`/post/${props.data.id}`} className={`text ${classes.body}`}>
        {props.data?.image && (
          <div className={`${classes["image__box"]}`}>
            <div
              className={`${classes.image}`}
              style={{ backgroundImage: `url(${props.data?.image})` }}
            />
          </div>
        )}
        {props.data?.content && (
          <p className={`${classes.content}`}>{props.data?.content}</p>
        )}
      </Link>
      <PostFooter
        data={{
          id: props.data?.id,
          comments: props.data?.comments,
          likes: props.data?.likes,
          likedPost,
        }}
        toggleComments={{ handler: ToggleCommentsHandler, get: showComments }}
      />
      {showComments && (
        <PostComments
          comments={props.data?.comments}
          post={props.data}
          data={props.data?.comments}
          isParent={false}
        />
      )}
    </div>
  );
};

export default Post;
