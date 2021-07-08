import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';

export default function NavBar() {
  const { isLoggedIn, setLoggedIn } = useContext(UserContext);

  const handleLogout = () => {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user-id');
    setLoggedIn(false);
  };

  return (
    <div id="navContainer">
      <nav>
        <h1 id="name">Thyme</h1>
        <div id="navLinks">
          <Link to="/">Home</Link>
          <a>About Us</a>
          <a>Contact</a>
        </div>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/containers">My Containers</Link>
            <a>Profile</a>
            <Link to="/" onClick={handleLogout}>
              Logout
            </Link>
          </div>
        ) : (
          <div id="navButtons">
            {/* The navbar will show these links before you log in */}
            <Link to="/login" id="loginButton">
              Login/Sign Up
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
}
