import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  const [isLoggedIn, setLoggedIn] = useState(false);
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
            <a>Logout</a>
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
