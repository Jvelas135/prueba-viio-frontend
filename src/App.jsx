import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './view/Home';
import Login from './view/Login';
import Navbar from './components/Navbar';
import Products from './view/Products';
import SignIn from './view/SignIn';

const App = () => {

  let local = localStorage.getItem('token');

  const [isAuthenticated, setAuthenticated] = useState(local);

  return (

    <Router>
     <Navbar isAuthenticated={isAuthenticated} setAuthenticated={setAuthenticated}  />

      <Routes>
        <Route
          path="/login"
          element={<Login setAuthenticated={setAuthenticated}  isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/home"
          element={<Home isAuthenticated={isAuthenticated}/>}
         
        />
           <Route
          path="/products"
          element={<Products isAuthenticated={isAuthenticated}/>}
         
        />
        <Route
          path="/signin"
          element={<SignIn isAuthenticated={isAuthenticated} setAuthenticated={setAuthenticated} />}
         
        />
        {/* Otras rutas públicas */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
