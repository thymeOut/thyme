import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import App from "./App";


export default function Routes() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={App} />
      </Switch>
    </div>
  );
}
