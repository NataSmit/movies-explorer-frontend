import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function ProtectedRoute({ authorized, children, ...props }) {
  return (
    <Route {...props}>
      {authorized || authorized === undefined ? children : <Redirect to="/" />}
    </Route>
  )
}
