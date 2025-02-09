import React, { useState } from "react";
import { Link } from "react-router";

import classes from "./Post.module.scss";

// COMPONENTS
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
import PostComments from "./PostComments";

const Post = (props) => {
  const [showComments, setShowComments] = useState(false);

  const ToggleCommentsHandler = (e) => {
    e.preventDefault();
    setShowComments(!showComments);
  };

  return (
    <div className={`${classes.container} post`} id={props.data.id}>
      <PostHeader user={props.data?.user} createdAt={props.data?.createdAt} />
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
        }}
        toggleComments={{ handler: ToggleCommentsHandler, get: showComments }}
      />
      {props.data?.comments.length > 0 && showComments && (
        <PostComments data={props.data?.comments} isParent={false} />
      )}
    </div>
  );
};

export default Post;
