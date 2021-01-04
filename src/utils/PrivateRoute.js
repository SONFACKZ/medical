import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { message } from 'antd'

const PrivateRoute = ({ component: Component, ...rest }) => {
  return(
    <Route
      {...rest}
      render={props => {
        if (localStorage.getItem('token')) {
          return <Component {...props} />
        }
        // message.warning('You need to login before access this page', 5);
        return <Redirect to='/login' />
      }}
    />
  )
}
export default PrivateRoute