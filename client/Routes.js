import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import UserContainers from './components/UserContainers';
import LoginForm from './components/Login';
import SingleContainer from './components/SingleContainer';
import AllUsersData from './components/allUsersData';
import AddItemToContainer from './components/AddItemToContainer';
import CreateItem from './components/CreateItem';
import RegisterForm from './components/Register';
import JoinContainer from "./components/JoinContainer";

export default function Routes(props) {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/containers" component={UserContainers} />
        <Route exact path="/allData" component={AllUsersData} />
        <Route exact path="/containers/:id" component={SingleContainer} />
        <Route exact path="/containers/:id/add" component={AddItemToContainer} />
        <Route exact path="/containers/:id/create" component={CreateItem} />
        <Route exact path="/login">
          <LoginForm setLoggedIn={props.setLoggedIn} />
        </Route>
        <Route exact path="/register">
          <RegisterForm />
        </Route>
        <Route path="/search" component={JoinContainer} />
      </Switch>
    </div>
  );
}
