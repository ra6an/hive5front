import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import classes from "./PostComments.module.scss";

// COMPONENTS
import Comment from "./Comment";
import CreateComment from "./CreateComment";

const PostComments = (props) => {
  const { highlightComment, highlightedParentComment, highlightLikedComment } =
    useSelector((state) => state.post);

  // const [parentComments, setParentComments] = useState([]);
  const [commentsRenderer, setCommentsRenderer] = useState([]);

  useEffect(() => {
    let filteredComments = props.isParent
      ? [...props.data]
      : props.data.filter((c) => c.parentComment === 0);

    // Sortiranje po datumu (od najnovijeg ka najstarijem)
    filteredComments.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    // Ako postoji highlightovani komentar, premještamo ga na vrh
    if (highlightComment || highlightLikedComment) {
      let commId = highlightComment ? highlightComment : highlightLikedComment;
      const highlighted = filteredComments.find((c) => c.id === commId);
      if (highlighted) {
        filteredComments = [
          highlighted,
          ...filteredComments.filter((c) => c.id !== commId),
        ];
      }
    }

    // Dodavanje parent komentara ako je potrebno
    if (highlightedParentComment && !props.isParent) {
      const parentComment = props.comments.find(
        (c) => c.id === highlightedParentComment
      );
      if (
        parentComment &&
        !filteredComments.some((c) => c.id === highlightedParentComment)
      ) {
        filteredComments.unshift(parentComment);
      }
    }

    // Dodavanje child komentara koji je like-an
    if (highlightLikedComment && !props.isParent) {
      const childComment = props.comments.find(
        (c) => c.id === highlightLikedComment
      );

      if (
        childComment &&
        !filteredComments.some((c) => c.id === highlightLikedComment)
      ) {
        filteredComments.unshift(childComment);
      }
    }

    // Postavljanje stanja
    setCommentsRenderer(
      filteredComments.map((pc) => (
        <Comment
          key={pc.id}
          data={pc}
          posts={props.data}
          comments={props.comments}
        />
      ))
    );

    // setParentComments(filteredComments);
  }, [
    props.data,
    props.isParent,
    highlightComment,
    highlightedParentComment,
    highlightLikedComment,
    props.comments,
  ]);

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
