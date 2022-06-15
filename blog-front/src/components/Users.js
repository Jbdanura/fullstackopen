import { useEffect, useState } from "react"
import userService from "../services/users"

const Users = () => {
    const [users,setUsers] = useState([])

    const getUsers = async () => {
        const all = await userService.getAll()
        return all
    }

    useEffect(()=>{
        getUsers()
        .then((response)=>{
            setUsers(response)
        })
    },[])

    return (
        <div>
            <h1>Users</h1>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>Blogs created</th>
                    </tr>
                    {users.map((user)=>{
                        console.log(user)
                        return(
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.blogs.length}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Users