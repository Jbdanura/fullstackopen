import React from 'react'
import { useState } from 'react'
import PropTypes from "prop-types"

const Blogform = ({addNote}) => {
  const [title,setTitle] = useState("")
  const [author,setAuthor] = useState("")
  const [url,setUrl] = useState("")


  return (
    <form onSubmit={(event) => {    
      setTitle("")
      setAuthor("")
      setUrl("")
      addNote(event,title,author,url)
    }}>
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
        <button type="submit">create</button>
    </form>  
  )
}

Blogform.propTypes = {
  addNote: PropTypes.func.isRequired
}

export default Blogform