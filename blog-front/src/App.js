import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [user,setUser] = useState(null)
  const [errorMessage,setErrorMessage] = useState("")
  const [message,setMessage] = useState("")
  const [title,setTitle] = useState("")
  const [author,setAuthor] = useState("")
  const [url,setUrl] = useState("")

  const getBlogs = ()=>{
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
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

  const addNote=(event)=>{
    event.preventDefault()

    blogService.create({title,author,url}).then(response=>
      {setMessage(response)
      setTimeout(()=>{
        setMessage("")
      },4000)
      getBlogs()
      })
    
  }

  const noteForm = ()=>{
    return <form onSubmit={addNote}>
    <label htmlFor="username">Title:</label>
    <input
      name="title"
      value={title}
      onChange={({target})=>setTitle(target.value)}
    />
    <label htmlFor="username">Author:</label>
    <input
      name="author"
      value={author}
      onChange={({target})=>setAuthor(target.value)}
    />
    <label htmlFor="url">Url:</label>
    <input
      name="url"
      value={url}
      onChange={({target})=>setUrl(target.value)}
    />
    <button type="submit">save</button>
    </form>  
  }

  const logout = () =>{
    setUser(null)
    window.localStorage.removeItem("loggedUser")
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
        <Blog key={blog.id} blog={blog} />
        )}
    </div>
  )
}

export default App
