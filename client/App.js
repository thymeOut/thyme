import React, { useState } from "react";
import Routes from "./Routes";
import NavBar from "./components/NavBar";
import Dashboard from "./components/Dashboard";
import { UserContext } from "./UserContext";

export default function App() {
  const token = window.localStorage.getItem('token');
  const [isLoggedIn, setLoggedIn] = useState(!!token);

  return (
    <UserContext.Provider value={{ isLoggedIn, setLoggedIn }}>
      {isLoggedIn ? <Dashboard/> : <NavBar /> }
    </UserContext.Provider>
  );
}
