import { useParams } from "react-router-dom"

const User = ({users}) => {
    const id = useParams().id
    const user = users.find(u => u.id === id)
    if(!user){
        return null
    }

    return (
        <div>
            <h1>{user.username}</h1>
            <h3>added blogs</h3>
            <ul>
                {user.blogs.map((blog)=>{
                    return <li key={blog.id}>{blog.title}</li>
                })}
            </ul>
        </div>
    )
}

export default User