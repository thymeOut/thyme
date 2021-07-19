import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import { Route, Switch } from "react-router-dom";
import LoginForm from "./Login";
import RegisterForm from "./Register";
import LandingPage from "./LandingPage";

export default function NavBar() {
  const { isLoggedIn, setLoggedIn } = useContext(UserContext);

  return (
    <div id="navContainer">
      <nav>
        <h1 id="name">Thyme</h1>
        <Link to="/login" id="loginButton">
          Login/Sign Up
        </Link>
      </nav>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/login">
          <LoginForm setLoggedIn={setLoggedIn} />
        </Route>
        <Route exact path="/register">
          <RegisterForm />
        </Route>
      </Switch>
    </div>
  );
}
