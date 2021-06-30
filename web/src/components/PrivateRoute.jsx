import React from 'react'
import { Redirect, Route } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import PropTypes from 'prop-types'

function PrivateRoute({children, ...rest}) {
  
  const {user} = useAuth();

  return (
    <Route {...rest}>
      {user !== null ? (children) : (
        <Redirect to="/login" />)}
    </Route>  
  )
}

PrivateRoute.propTypes = {
  children: PropTypes.object
}

export default PrivateRoute
