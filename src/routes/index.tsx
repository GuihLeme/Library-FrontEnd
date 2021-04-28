import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import NewUser from '../pages/NewUser';
import UpdateUser from '../pages/UpdateUser';
import NewBook from '../pages/NewBook';
import UpdateBook from '../pages/UpdateBook';
import NewBorrow from '../pages/NewBorrow';


const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn}/>
    <Route path="/signup" exact component={SignUp}/>

    <Route path="/dashboard" exact component={Dashboard} isPrivate />
    <Route path="/new-user" exact component={NewUser} isPrivate />
    <Route path="/update-user" exact component={UpdateUser} isPrivate />
    <Route path="/new-book" exact component={NewBook} isPrivate />
    <Route path="/update-book" exact component={UpdateBook} isPrivate />
    <Route path="/new-borrow" exact component={NewBorrow} isPrivate />
  </Switch>
);

export default Routes;
