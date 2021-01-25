import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { message } from 'antd'

const role_name = localStorage.getItem('role_name')
const PatientRoute = ({ component: Component, ...rest }) => {
  return(
    <Route
      {...rest}
      render={props => {
        if (localStorage.getItem('token') && role_name === 'Patient') {
          return <Component {...props} />
        }
        message.warning('You need to be grant Patient before access this page', 5);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("role_id");
        localStorage.removeItem("status");
        localStorage.removeItem("role_name");
        localStorage.removeItem("email");
        window.location.reload();
        // return <Redirect to='/login' />

      }}
    />
  )
}
export default PatientRoute