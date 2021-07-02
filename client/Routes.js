import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import UserContainer from "./components/UserContainers";


export default function Routes() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path='/containers' component={UserContainer}/>
      </Switch>
    </div>
  );
}
