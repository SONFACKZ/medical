import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
 
const Home = () => {
    const [users, setUser] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const result = await axios.get('/users');
        setUser(result.data);
    };
    //     axios.get('/users')
    //     .then(res => {
    //         console.log(res)
    //         setUser(res.data)
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
    // }, [])

    return (
        <div className = "container">
            <div className = "py-4">
                <h1>Home Page</h1>
                <div className = "table-responsive-sm">
                <table class="table border shadow table-striped table-hover">
                    <thead class="thead-dark">
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Occupation</th>
                        <th scope="col">Public ID</th>
                        <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => (
                                <tr>
                                    <th scope = "row">{index +1}</th>
                                    <td>{user.fullname}</td>
                                    <td>{user.email}</td>
                                    <td>{user.occupation}</td>
                                    <td>{user.public_id}</td>
                                    <td>
                                        <Link class = "btn btn-primary mr-2">View</Link>
                                        <Link class = "btn btn-outline-primary mr-2">Edit</Link>
                                        <Link class = "btn btn-danger">Delete </Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                </div>
                <Link className = "btn btn-outline-primary" to = "/register"> Add User</Link>
                    
            </div>
        </div>
    );
};

export default Home;