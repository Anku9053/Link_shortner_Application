import React from 'react';
import { Link } from 'react-router-dom';
import "../Css/Navbar.css"
import LS from "../images/LS-removebg-preview.png"
function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand"><img style={{width:"20%",height:"30%",position:"relative",right:"40%"}} src={LS} alt="" /></Link>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/products" className="nav-link">Products</Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link">Contact</Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link">About</Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link">Login</Link>
          </li>
          <li className="nav-item">
            <Link to="/signup" className="nav-link">Sign Up</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
