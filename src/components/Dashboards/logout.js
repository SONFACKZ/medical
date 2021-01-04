import React from "react";
import {Link} from "react-router-dom";
import { QuoteContext } from '../../contexts/QuoteContext'
import { LogoutOutlined } from '@ant-design/icons'
import { Typography, message } from 'antd'

const { Text } = Typography;

export default function Logout() {
    const {loggedIn, setLoggedIn} = React.useContext(QuoteContext);


    const logout = _ => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("role_id");
        localStorage.removeItem("status");
        setLoggedIn(false);
        message.success('Logout success', 5);
    }

    return (
        <div>
        <Link onClick={logout}>
        <Text strong style = {{color: 'red'}}>Log Out <LogoutOutlined strong /></Text>
        </Link>
       
        </div>
    )
}