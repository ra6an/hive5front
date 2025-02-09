import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import "./styles/main.scss";

// PAGES
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import SinglePost from "./pages/SinglePost";
import SingleUser from "./pages/SingleUser";

// COMPONENTS
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

// HOOKS
import useInitial from "./custom-hooks/useInitial";
import usePostsHook from "./custom-hooks/usePostsHook";

function App() {
  const { isAuthenticated, user, token } = useInitial();
  const { posts } = usePostsHook();

  return (
    <div className="dark">
      <div className={`background app text`}>
        {isAuthenticated && <Header />}
        <Routes>
          {!isAuthenticated ? (
            <Route
              path="*"
              element={<Auth isAuthenticated={isAuthenticated} />}
            />
          ) : (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route
                path="/auth/*"
                element={<Auth isAuthenticated={isAuthenticated} />}
              />
              <Route path="/explore" element={<Explore />} />
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
