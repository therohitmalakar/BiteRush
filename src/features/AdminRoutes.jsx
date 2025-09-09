import React, { useContext } from 'react'
import { useUser } from './UserContext'
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

function AdminRoutes({children}) {

    const {user} = useUser();
    const {isLoggedIn} = useContext(AuthContext)
    console.log("logged in",isLoggedIn)

    if(!isLoggedIn){
      return <Navigate to="/login" replace/>
    }
  return children
}

export default AdminRoutes
