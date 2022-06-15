import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Blogform from "./components/Blogform";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { newMessage } from "./reducers/notificationReducer";
import { useSelector,useDispatch } from "react-redux";
import { initializeBlogs, addBlog, likeBlog, removeBlog } from "./reducers/blogReducer";
import {BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate, useLocation} from "react-router-dom"
import Users from "./components/Users";

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const message = useSelector(state => state.message)
  const dispatch = useDispatch()

  const blogFormRef = useRef();

  const getBlogs = () => {
    dispatch(initializeBlogs())
  };

  useEffect(() => {
    getBlogs();
    const loggedUser = window.localStorage.loggedUser;
    if (loggedUser) {
      setUser(JSON.parse(window.localStorage.loggedUser));
      blogService.setToken(JSON.parse(window.localStorage.loggedUser).token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      setUsername("");
      setPassword("");
      dispatch(newMessage("Succesfully logged in!"));
      setTimeout(() => {
        dispatch(newMessage(""));
      }, 4000);
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage("");
      }, 4000);
    }
  };

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Username</label>
        <input
          onChange={(event) => setUsername(event.target.value)}
          type="text"
          id="username"
          value={username}
          name="username"
        ></input>
        <label htmlFor="password">Password</label>
        <input
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          id="password"
          value={password}
          name="password"
        ></input>
        <button id="submit-login" type="submit">
          Login
        </button>
      </form>
    );
  };

  const addNote = (event, title, author, url) => {
    event.preventDefault();
    blogFormRef.current.toggleVisibility();
    if (title != "") {
      dispatch(addBlog(title,author,url,username))
    } else {
      setErrorMessage("Empty blog");
      setTimeout(() => {
        setErrorMessage("");
      }, 4000);
    }
  };

  const like = (title,likes) => {
    dispatch(likeBlog(title,likes))
  };

  const noteForm = () => {
    return (
      <Togglable ref={blogFormRef}>
        <Blogform addNote={addNote}></Blogform>
      </Togglable>
    );
  };

  const logout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedUser");
  };

  const remove = (title) => {
    dispatch(removeBlog(title))
  };

  const HomeView = ()=>{
    return (
      <div>
        {user === null ? (
          loginForm()
        ) : noteForm()}
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} like={like} remove={remove} />
        ))}

      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {message && <div className="message">{message}</div>}

      <Router>
        <Link to="/" style={{paddingRight:"10px"}}>Home</Link>
        <Link to="/users">Users</Link>
        {user !== null ? (
            <div>
              <p>{user.username} logged in</p>
              <button onClick={logout}>Logout</button>
            </div>
            )
            : null}
        <Routes>
          <Route path="/users" element={<Users/>}/>
          <Route path="/" element={<HomeView/>}/>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
