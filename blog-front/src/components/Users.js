import { useEffect, useState } from "react"
import {BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate, useLocation} from "react-router-dom"
import { Table } from 'react-bootstrap'

const Users = ({users}) => {
    return (
        <div>
            <h1>Users</h1>
            <Table striped>
                <tbody>
                    <tr>
                        <th></th>
                        <th>Blogs created</th>
                    </tr>
                    {users.map((user)=>{
                        return(
                            <tr key={user.id}>
                                <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
                                <td>{user.blogs.length}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}

export default Users