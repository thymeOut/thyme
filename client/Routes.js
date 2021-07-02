import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import UserContainers from "./components/UserContainers";
import LoginForm from "./components/Login";



export default function Routes() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/containers" component={UserContainers} />
        <Route exact path="/login" component={LoginForm} />
      </Switch>
    </div>
  );
}
