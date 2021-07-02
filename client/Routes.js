import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import LandingPage from "./components/LandingPage";


export default function Routes() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={LandingPage} />
      </Switch>
    </div>
  );
}
