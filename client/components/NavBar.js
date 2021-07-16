import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';

export default function NavBar() {
  const { isLoggedIn, setLoggedIn } = useContext(UserContext);
  const handleLogout = () => {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user-id');
    window.localStorage.removeItem('isAdmin')
    setLoggedIn(false);
  };

  return (
    <div id="navContainer">
      <nav>
        <h1 id="name">Thyme</h1>
          <Link to="/">Home</Link>
        {window.localStorage.getItem('isAdmin') === "true" && <Link to="/admin">Admin</Link>}
        {isLoggedIn ? (
          <>
            <Link to="/containers">My Containers</Link>
            <Link to="/items">My Item Stats</Link>
            <Link to="/" onClick={handleLogout}>
              Logout
            </Link>
          </>
        ) : (
          <>

            <Link to="/login" id="loginButton">
              Login/Sign Up
            </Link>
          </>
        )}
      </nav>
    </div>
  );
}
