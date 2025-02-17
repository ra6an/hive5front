import React, { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

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
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import NotFound from "./pages/NotFound";

// COMPONENTS
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import FriendsOvelay from "./components/friends/FriendsOverlay";
import { ToastContainer } from "react-toastify";

// HOOKS
import useInitial from "./custom-hooks/useInitial";
import usePostsHook from "./custom-hooks/usePostsHook";
import useNotificationHook from "./custom-hooks/useNotificationHook";
import useToastNotification from "./custom-hooks/useToastNotification";

// SOCKET
import useWebSocket from "./custom-hooks/useWebSocket";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, token, user, curTheme, handleThemeChange } =
    useInitial();
  const { fetchExplore, fetchHome } = usePostsHook();
  const notificationsHook = useNotificationHook();
  const _useWebSocket = useWebSocket();
  const _toast = useToastNotification();

  const checkAuth = (COMPONENT) => {
    return isAuthenticated && token && Object.keys(user).length > 0 ? (
      COMPONENT
    ) : (
      <Auth isAuthenticated={isAuthenticated} />
    );
  };

  useEffect(() => {
    if (!token || !isAuthenticated) return;
    if (location.pathname === "" || location.pathname === "/") {
      navigate("/explore");
    }
  }, [location, token, isAuthenticated, navigate]);

  return (
    <div className={curTheme === "light" ? `light` : `dark`}>
      <div className={`background app text`}>
        <ToastContainer theme={curTheme === "light" ? "dark" : "light"} />
        {isAuthenticated && (
          <Header
            notificationsHook={notificationsHook}
            theme={{ changeTheme: handleThemeChange, theme: curTheme }}
          />
        )}
        {isAuthenticated && <FriendsOvelay />}
        <Routes>
          <Route path="/" element={checkAuth(<Home />)} />
          <Route
            path="/home"
            element={checkAuth(<Home fetchHome={fetchHome} />)}
          />
          <Route path="/users" element={checkAuth(<Users />)} />
          <Route
            path="/auth/*"
            element={<Auth isAuthenticated={isAuthenticated} />}
          />
          <Route path="/settings" element={checkAuth(<Settings />)} />
          <Route
            path="/friend-requests"
            element={checkAuth(<FriendRequests />)}
          />
          <Route
            path="/notifications"
            element={checkAuth(
              <Notifications notificationsHook={notificationsHook} />
            )}
          />
          <Route
            path="/explore"
            element={checkAuth(<Explore fetchExplore={fetchExplore} />)}
          />
          <Route path="/comment/:commentId" element={<Comment />} />
          <Route
            path="/post/:postId"
            element={checkAuth(<SinglePost token={token} />)}
          />
          <Route
            path="/user/:username"
            element={checkAuth(<SingleUser token={token} />)}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
