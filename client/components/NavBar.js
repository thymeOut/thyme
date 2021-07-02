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
          <a>Profile</a>
          <Link to="/containers">My Containers</Link>
          <a>About Us</a>
          <a>Contact</a>
        </div>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <a>Logout</a>
          </div>
        ) : (
          <div id="navButtons">
            {/* The navbar will show these links before you log in */}
            <a id="loginButton">Sign in/Sign Up</a>
          </div>
        )}
      </nav>
    </div>
  );
}
