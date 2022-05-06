import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Blogform from './components/Blogform'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [user,setUser] = useState(null)
  const [errorMessage,setErrorMessage] = useState("")
  const [message,setMessage] = useState("")

  const blogFormRef = useRef()

  const getBlogs = ()=>{
    blogService.getAll().then(blogs =>{
      setBlogs( blogs )
    }
    )  
  }

  useEffect(() => {
    getBlogs()
    const loggedUser = window.localStorage.loggedUser
    if(loggedUser){
      setUser(JSON.parse(window.localStorage.loggedUser))
      blogService.setToken(JSON.parse(window.localStorage.loggedUser).token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({username,password})
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem("loggedUser",JSON.stringify(user))
      setUsername("")
      setPassword("")
      setMessage("Succesfully logged in!")
      setTimeout(()=>{
        setMessage("")
      },4000)

    }catch(exception){
      setErrorMessage("Wrong credentials")
      setTimeout(()=>{
        setErrorMessage("")
      },4000)
    }
  }

  const loginForm = ()=>{
    return <form onSubmit={handleLogin}>
    <label htmlFor="username">Username</label>
    <input onChange={(event)=>setUsername(event.target.value)} type="text" value={username} name="username"></input>
    <label htmlFor="password">Password</label>
    <input onChange={(event)=>setPassword(event.target.value)} type="password" value={password} name="password"></input>
    <button type="submit">Login</button>
    </form>
  }  

  const addNote=(event,title,author,url)=>{
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    if(title != ""){
      blogService.create({title,author,url}).then(response=>
        {setMessage(response)
        setTimeout(()=>{
          setMessage("")
        },4000)
        getBlogs()
        })
    } else {
      setErrorMessage("Empty blog")
      setTimeout(()=>{
        setErrorMessage("")
      },4000)
    }
  }

  const likeBlog = (title,likes) => {
    blogService.like(title,likes).then(response=>{
      getBlogs()
    })
  }

  const noteForm = ()=>{
    return <Togglable ref={blogFormRef}>
      <Blogform addNote={addNote}></Blogform>
    </Togglable>
  }

  const logout = () =>{
    setUser(null)
    window.localStorage.removeItem("loggedUser")
  }

  const remove = (title) => {
    blogService.remove(title).then(response=>getBlogs())
  }
  return (

    <div>
      <h2>blogs</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {message && <div className="message">{message}</div>}
      {user === null ? loginForm() : 
      <div>
        <p>{user.username} logged in</p>
        <button onClick={logout}>Logout</button>
        {noteForm()}
      </div>}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} like={likeBlog} remove={remove} />
        )}
    </div>
  )
}

export default App
