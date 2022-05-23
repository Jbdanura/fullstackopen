import React, { useState } from 'react'


const Blog = ({blog, like,remove}) => {
  const [visible,setVisible] = useState(false)
  const showInfo = {display: visible ? "" : "none"}

  return (
      <div className="blog">
        {blog.title} {blog.author} <button id="view-blog" onClick={()=> setVisible(!visible)}>{visible? "hide": "view"}</button>
        <div style={showInfo}>     
          <ul>
            <li>{blog.url}</li>
            <li id="likes">likes {blog.likes === 0 ? "0" : blog.likes} <button id="like-blog" onClick={() => like(blog.title, blog.likes)}>like</button></li>
            <li>{blog.user.username}</li>
            <button id="remove-blog" onClick={()=> remove(blog.title)}>remove</button>
          </ul>

        </div>
      </div>  
    )
  }
  
export default Blog