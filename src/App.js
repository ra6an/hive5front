import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import "./styles/main.scss";

// PAGES
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import SinglePost from "./pages/SinglePost";
import SingleUser from "./pages/SingleUser";
import FriendRequests from "./pages/FriendRequests";
import Notifications from "./pages/Notifications";
import Comment from "./pages/Comment";

// COMPONENTS
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import FriendsOvelay from "./components/friends/FriendsOverlay";

// HOOKS
import useInitial from "./custom-hooks/useInitial";
import usePostsHook from "./custom-hooks/usePostsHook";
import useNotificationHook from "./custom-hooks/useNotificationHook";

function App() {
  const { isAuthenticated, user, token } = useInitial();
  const { posts, fetchHome } = usePostsHook();
  const notificationsHook = useNotificationHook();

  return (
    <div className={`dark`}>
      <div className={`background app text`}>
        {isAuthenticated && <Header notificationsHook={notificationsHook} />}
        {isAuthenticated && <FriendsOvelay />}
        <Routes>
          {!isAuthenticated ? (
            <Route
              path="*"
              element={<Auth isAuthenticated={isAuthenticated} />}
            />
          ) : (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home fetchHome={fetchHome} />} />
              <Route
                path="/auth/*"
                element={<Auth isAuthenticated={isAuthenticated} />}
              />
              <Route path="/friend-requests" element={<FriendRequests />} />
              <Route
                path="/notifications"
                element={
                  <Notifications notificationsHook={notificationsHook} />
                }
              />
              <Route path="/explore" element={<Explore />} />
              <Route path="/comment/:commentId" element={<Comment />} />
              <Route
                path="/post/:postId"
                element={<SinglePost token={token} />}
              />
              <Route
                path="/user/:username"
                element={<SingleUser token={token} />}
              />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </div>
    </div>
  );
}

export default App;
