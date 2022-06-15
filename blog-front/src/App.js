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
import User from "./components/User";
import userService from "./services/users"
import BlogDetail from "./components/BlogDetail";
import { Form, Button,Alert } from 'react-bootstrap'

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users,setUsers] = useState([])
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const message = useSelector(state => state.message)
  const dispatch = useDispatch()

  const blogFormRef = useRef();

  const getBlogs = () => {
    dispatch(initializeBlogs())
  };

  const getUsers = async () => {
      const all = await userService.getAll()
      return all
  }

  useEffect(() => {
    getBlogs();
    const loggedUser = window.localStorage.loggedUser;
    if (loggedUser) {
      setUser(JSON.parse(window.localStorage.loggedUser));
      blogService.setToken(JSON.parse(window.localStorage.loggedUser).token);
    }
    getUsers()
    .then((response)=>{
        setUsers(response)
    })
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const username = event.target.username.value
      const password = event.target.password.value
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
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            type="text"
            name="username"
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
          />
          <Button variant="primary" type="submit">
            login
          </Button>
        </Form.Group>
      </Form>
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
          <Link to={`/blogs/${blog.id}`}><Blog key={blog.id} blog={blog} /></Link>
        ))}

      </div>
    )
  }

  return (
    <div className="container">
      <h2>blogs</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {message && <Alert variant="success">{message}</Alert>}

      <Router>
        <div className="nav">
          <Link to="/">Home</Link>
          <Link to="/users">Users</Link>
          {user !== null ? (
              <div className="login-nav" style={{display:"flex"}}>
                <p>{user.username} logged in</p>
                <button onClick={logout}>Logout</button>
              </div>
              )
              : null}
        </div>
        
        <Routes>
          <Route path="/users" element={<Users users={users}/>}/>
          <Route path="/users/:id" element={<User users={users}/>}/>
          <Route path="/blogs/:id" element={<BlogDetail blogs={blogs} like={like}/>}/>
          <Route path="/" element={<HomeView/>}/>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
