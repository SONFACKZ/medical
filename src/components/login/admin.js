import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Admin extends Component {
    render() {
        return (
            <div>
                <h1>This is admin page. Only auth people can see this</h1>
                <Link to = "/logout">Logout</Link>
            </div>
        )
    }
}
