import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import axios from '../apis/index.js';

const Login = (props) => {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    try {
      
      e.preventDefault();
      if (!user.email.trim()) {
        setError('Please enter your email')
        return
      }
      if(!user.password.trim()){
        setError('Please enter your password')
        return
      }
      await axios.post("/api/login/", user).then(response => {
        let token = response.data.token;
        localStorage.setItem('token', token);
        setUser({ email: "" , password: ""});
        setError(null)
        let local = localStorage.getItem('token');
        props.setAuthenticated(local);
        navigate("/home");   
      })
 
    } catch (error) {
      setError("Username/password are not correct");
    }
  };

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return props.isAuthenticated === null ?(
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-6 col-xl-4">
        <h2 className='text-center' >Login</h2>
        <form onSubmit={handleLogin}> 
          <div>
            <input
              type="text"
              id="email"
              name="email"
              className='form-control mb-3'
              placeholder='email'
              value={user.email}
              onChange={onInputChange}
            />
          </div>
          <div>
            <input
             className='form-control mb-3'
              type="password"
              id="password"
              name="password"
              placeholder='password'
              value={user.password}
              onChange={onInputChange}
            />
          </div>
          <div className='d-grid gap-2'>
          <button type="submit"  className='btn btn-dark' >
            Log In
          </button>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </div>
      </div>
    </div>
  ):  (<Navigate to="/home" />);;
};

export default Login;
