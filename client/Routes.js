import React from 'react';
import { Route, Switch} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import UserContainers from './components/UserContainers';
import LoginForm from './components/Login';
import SingleContainer from './components/SingleContainer';
import AllUsersData from './components/AllUsersData';
import AddItemToContainer from './components/AddItemToContainer';
import CreateItem from './components/CreateItem';
import RegisterForm from './components/Register';
import JoinContainer from "./components/JoinContainer";
import EditItem from './components/EditItem';
import AdminEditUser from './components/AdminEditUser';
import PendingUsers from './components/PendingUsers';

export default function Routes(props) {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/containers" component={UserContainers} />
        <Route exact path="/admin" component={AllUsersData} />
        <Route exact path="/containers/:id" component={SingleContainer} />
        <Route exact path="/containers/:id/pending" component={PendingUsers} />
        <Route exact path="/containers/:id/add" component={AddItemToContainer} />
        <Route exact path="/containers/:id/create" component={CreateItem} />
        <Route exact path="/containers/:id/edititem/:itemId" component={EditItem} />
        <Route exact path="/admin/:id" component={AdminEditUser}/>
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
