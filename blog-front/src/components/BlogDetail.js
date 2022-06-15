import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import blogService from "../services/blogs";

const BlogDetail = ({blogs, like}) => {
    const id = useParams().id
    const blog = blogs.find(b => b.id === id)
    const [comments, setComments] = useState([])

    const getComments = async () => {
        const comments = await blogService.getComments(id)
        return comments
    }

    useEffect(()=>{
        getComments()
        .then((res)=>setComments(res))
    },[])

    if(!blog){
        return null
    }

    const addComment = async (event) => {
        event.preventDefault()
        const comment = event.target.comment.value
        await blogService.newComment(id, comment)
        const newComments = comments.concat(comment)
        setComments(newComments)
    }

    return(
        <div>
            <h1>{blog.title}</h1>
            <a href={blog.url}>{blog.url}</a>
            <p>{blog.likes} likes<button onClick={()=>like(blog.title,blog.likes)}>like</button></p>
            <p>added by {blog.author}</p>
            <h3>comments</h3>
            <form onSubmit={addComment}>
                    <input type="text" name="comment"></input>
                    <button>add comment</button>
                </form>
            {comments.length > 0 &&
                <ul>
                    {comments.map(comment => <li>{comment}</li>)}
                </ul>
            }

        </div>
    )
}

export default BlogDetail