import React, { useEffect, useState } from "react";

import classes from "./PostComments.module.scss";

// COMPONENTS
import Comment from "./Comment";

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
        <Comment key={pc.id} data={pc} posts={props.data} />
      ))
    );

    setParentComments(_parentComms);
  }, [props.data, props.isParent]);

  return (
    <div
      className={classes.container}
      style={props.isParent ? { padding: ".4rem" } : {}}
    >
      {commentsRenderer}
    </div>
  );
};

export default PostComments;
