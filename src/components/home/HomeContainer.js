import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import classes from "./HomeContainer.module.scss";

// COMPONENTS
import Post from "./Post";
import CreatePostForm from "./CreatePostForm";

const DUMMY_POST_DATA = [
  {
    id: 91239393,
    content: "DUMMY POST 1!",
    user: {
      id: "0f9a7bfe-f718-4f6f-8960-3acc67479be5",
      username: "ra6an",
      createdAt: "2025-02-09T01:26:09.887775",
      role: "USER",
    },
    status: "PUBLIC",
    createdAt: "2025-02-10T01:26:27.356317",
    comments: [],
    likes: [],
  },
  {
    id: 23211232,
    content: "DUMMY POST 2!",
    image:
      "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.pixelstalk.net%2Fwp-content%2Fuploads%2F2016%2F03%2FBeautiful-Nature-wallpaper-background-free.jpg&f=1&nofb=1&ipt=28c62898816935feac32ce2cd486a2122248c81a43e6af2b6272655fd0c0a9b7&ipo=images",
    user: {
      id: "0f9a7bfe-f718-4f6f-8960-3acc67479be5",
      username: "ra6an",
      createdAt: "2025-02-09T01:26:09.887775",
      role: "USER",
    },
    status: "PUBLIC",
    createdAt: "2025-02-09T01:26:24.401612",
    comments: [
      {
        id: 1,
        post: 2,
        content: "Dobar comm",
        user: {
          id: "0f9a7bfe-f718-4f6f-8960-3acc67479be5",
          username: "ra6an",
          createdAt: "2025-02-09T01:26:09.887775",
          role: "USER",
        },
        parentComment: 0,
        replies: [4],
        likes: [],
      },
      {
        id: 2,
        post: 2,
        content: "Dobar comm 1",
        user: {
          id: "0f9a7bfe-f718-4f6f-8960-3acc67479be5",
          username: "ra6an",
          createdAt: "2025-02-09T01:26:09.887775",
          role: "USER",
        },
        parentComment: 0,
        replies: [],
        likes: [1],
      },
      {
        id: 3,
        post: 2,
        content: "Dobar post",
        user: {
          id: "0f9a7bfe-f718-4f6f-8960-3acc67479be5",
          username: "ra6an",
          createdAt: "2025-02-09T01:26:09.887775",
          role: "USER",
        },
        parentComment: 0,
        replies: [],
        likes: [
          {
            id: 1,
            user: {
              id: "0f9a7bfe-f718-4f6f-8960-3acc67479be5",
              username: "ra6an",
              createdAt: "2025-02-09T01:26:09.887775",
              role: "USER",
            },
            post: 0,
            comment: 3,
          },
        ],
      },
      {
        id: 4,
        post: 2,
        content: "Dobar com",
        user: {
          id: "0f9a7bfe-f718-4f6f-8960-3acc67479be5",
          username: "ra6an",
          createdAt: "2025-02-09T01:26:09.887775",
          role: "USER",
        },
        parentComment: 1,
        replies: [],
        likes: [
          {
            id: 2,
            user: {
              id: "0f9a7bfe-f718-4f6f-8960-3acc67479be5",
              username: "ra6an",
              createdAt: "2025-02-09T01:26:09.887775",
              role: "USER",
            },
            post: 0,
            comment: 4,
          },
        ],
      },
    ],
    likes: [1],
  },
  {
    id: 3212321311,
    content: "DUMMY POST 3!",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercrafter.com%2Fdesktop%2F18358-northern-lights-starry-sky-mountains-lake-night-4k.jpg&f=1&nofb=1&ipt=b446e2f862642e3a70a95c2f624b4ac86c8b1a205767d891337a675f1ecd4017&ipo=images",
    user: {
      id: "0f9a7bfe-f718-4f6f-8960-3acc67479be5",
      username: "ra6an",
      createdAt: "2025-02-09T01:26:09.887775",
      role: "USER",
    },
    status: "PUBLIC",
    createdAt: "2025-02-09T01:26:19.500671",
    comments: [
      {
        id: 5,
        post: 1,
        content: "Dobar post",
        user: {
          id: "0f9a7bfe-f718-4f6f-8960-3acc67479be5",
          username: "ra6an",
          createdAt: "2025-02-09T01:26:09.887775",
          role: "USER",
        },
        parentComment: 0,
        replies: [],
        likes: [],
      },
    ],
    likes: [],
  },
];

const HomeContainer = (props) => {
  const { posts } = useSelector((state) => state.post);
  const [postsRenderer, setPostsRenderer] = useState([]);

  useEffect(() => {
    setPostsRenderer(
      posts.map((p) => <Post data={p} key={p.id} cantPost={props.cantPost} />)
    );
  }, [posts, props.cantPost]);

  const _posts = DUMMY_POST_DATA.map((post) => (
    <Post data={post} key={post.id} />
  ));
  return (
    <div className={`${classes.container}`}>
      {!props.cantPost && <CreatePostForm />}
      {postsRenderer}
      {/* {_posts} */}
    </div>
  );
};

export default HomeContainer;
