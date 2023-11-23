import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from '../apis/index.js';

const SignIn = (props) => {
  const [user, setUser] = useState({
    name: "",
    phone: "",  
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
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
      if(!user.name.trim()){
        setError('Please enter your name')
        return
      }
      if(!user.phone.trim()){
        setError('Please enter your name')
        return
      }
      await axios.post("/api/users/", user).then(response => {
        let token = response.data.token;
        localStorage.setItem('token', token);
        setUser({ email: "" , password: "", name: "", phone: ""});
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
      <h2 className='text-center' >Sign In</h2>
      <form onSubmit={handleSignIn}> 
      <div>
          <input
           className='form-control mb-3'
            type="text"
            id="name"
            name="name"
            placeholder='name'
            value={user.name}
            onChange={onInputChange}
          />
        </div>
      <div>
          <input
           className='form-control mb-3'
            type="text"
            id="phone"
            name="phone"
            placeholder='phone'
            value={user.phone}
            onChange={onInputChange}
          />
        </div>
        <div>
          <input
            type="email"
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
          Sign In
        </button>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
    </div>
  </div>
  ): (<Navigate to="/home" />);
}

export default SignIn