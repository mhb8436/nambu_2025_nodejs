import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import PostList from "./components/posts/PostList";
import PostDetail from "./components/posts/PostDetail";
import EditPost from "./components/posts/EditPost";
import PostForm from "./components/posts/PostForm";

// 네이버 콜백 컴포넌트
function NaverCallback({ setIsAuthenticated, setUser }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get("token");
    const user = urlParams.get("user");

    if (token && user) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", user);
      setIsAuthenticated(true);
      setUser(JSON.parse(user));
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [location, setIsAuthenticated, setUser, navigate]);

  return (
    <div className="text-center mt-5">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-3">네이버 로그인 처리 중...</p>
    </div>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              게시판
            </Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    게시글 목록
                  </Link>
                </li>
                {isAuthenticated ? (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/create">
                        새 게시글
                      </Link>
                    </li>
                    <li className="nav-item">
                      <button
                        className="nav-link btn btn-link"
                        onClick={handleLogout}
                      >
                        로그아웃
                      </button>
                    </li>
                  </>
                ) : null}
              </ul>
              {user && <span className="navbar-text">{user.email}</span>}
            </div>
          </div>
        </nav>

        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <PostList /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={
              !isAuthenticated ? (
                <Login
                  setIsAuthenticated={setIsAuthenticated}
                  setUser={setUser}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/register"
            element={!isAuthenticated ? <Register /> : <Navigate to="/" />}
          />
          <Route
            path="/auth/naver/callback"
            element={
              <NaverCallback
                setIsAuthenticated={setIsAuthenticated}
                setUser={setUser}
              />
            }
          />
          <Route
            path="/posts/:id"
            element={
              <PostDetail isAuthenticated={isAuthenticated} user={user} />
            }
          />
          <Route
            path="/create"
            element={isAuthenticated ? <PostForm /> : <Navigate to="/login" />}
          />
          <Route
            path="/edit/:id"
            element={
              isAuthenticated ? (
                <EditPost user={user} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
