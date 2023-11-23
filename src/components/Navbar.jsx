import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const navigate = useNavigate();
  const signout = () => {
    try {
        localStorage.removeItem('token');
        props.setAuthenticated(null)
        navigate("/login")  
    } catch (error) {
        console.log(error)
    }
  };
  return (
    <div className='navbar navbar-dark bg-primary mb-3'>
    <a className='navbar-brand' ><h2>VIIO</h2></a>
    <div>
        <div className='d-flex'>
            {
             props.isAuthenticated != null ?(
              <Link to = "/home" className='btn btn-primary mr-3'><h5>Home</h5></Link>
             ) : null
            }
            {
             props.isAuthenticated != null ?(
              <Link to = "/products" className='btn btn-primary mr-3'><h5>Carts</h5></Link>
             ) : null
            }
            {
             props.isAuthenticated == null ?(
              <Link to = "/signin" className='btn btn-primary mr-3'><h5>Sign In</h5></Link>
             ) : null
            }
            {
              props.isAuthenticated != null ?(
                <button className='btn btn-primary mr-3'
                onClick={()=>{signout()}}
                > <h5>Sign out</h5> </button>
              ): (<Link to="/login" className='btn btn-primary mr-3'><h5>Log in</h5> </Link>)
            }
            
        </div>
    </div>
</div>
   
  );
};

export default Navbar;
