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
import ItemData from './components/ItemData';
import UserItems from './components/UserItems';

export default function Routes(props) {
  return (
    <div>
      <Switch>
        <Route exact path="/containers" component={UserContainers} />
        <Route exact path="/admin" component={AllUsersData} />
        <Route exact path="/containers/:id" component={SingleContainer} />
        <Route exact path="/containers/:id/pending" component={PendingUsers} />
        <Route exact path="/containers/:id/add" component={AddItemToContainer} />
        <Route exact path="/containers/:id/create" component={CreateItem} />
        <Route exact path="/charts" component={ItemData}/>
        <Route exact path="/items" component={UserItems}/>
        <Route exact path="/containers/:id/edititem/:itemId" component={EditItem} />
        <Route exact path="/admin/:id" component={AdminEditUser}/>
        <Route path="/search" component={JoinContainer} />
      </Switch>
    </div>
  );
}
