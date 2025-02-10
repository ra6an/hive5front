import React, { useEffect, useState } from "react";

import classes from "./PostComments.module.scss";

// COMPONENTS
import Comment from "./Comment";
import CreateComment from "./CreateComment";

const PostComments = (props) => {
  const [parentComments, setParentComments] = useState([]);
  const [commentsRenderer, setCommentsRenderer] = useState([]);

  useEffect(() => {
    const _parentComms = [];

    props.data.forEach((c) => {
      if (!props.isParent) {
        if (c.parentComment === 0) {
          _parentComms.push(c);
        }
      } else {
        _parentComms.push(c);
      }
    });

    _parentComms.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    setCommentsRenderer(
      _parentComms.map((pc) => (
        <Comment
          key={pc.id}
          data={pc}
          posts={props.data}
          comments={props.comments}
        />
      ))
    );

    setParentComments(_parentComms);
  }, [props.data, props.isParent]);

  return (
    <div
      className={classes.container}
      style={props.isParent ? { padding: ".4rem" } : {}}
    >
      <CreateComment
        isParent={props.isParent}
        data={props.data}
        post={props.post}
      />
      {commentsRenderer}
    </div>
  );
};

export default PostComments;
