import React from 'react'
import { Route, useNavigate } from 'react-router-dom';

const PrivateRouter = ({ element, isAuthenticated }) => {
   const navigate = useNavigate();
    return isAuthenticated != null ? (
        <Route element={element} />
      ) : (
        navigate("/login")
      );
}

export default PrivateRouter