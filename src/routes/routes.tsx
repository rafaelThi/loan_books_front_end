import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import AdminLogin from '../pages/AdminLogin';
import RegisterUserPage from '../pages/RegisterUserPage';

const Routes:React.FC = () => (
  <Switch>
    <Route path="/" exact component={HomePage} />

    <Route path="/login" component={LoginPage} />
    <Route path="/admin-login" component={AdminLogin} />

    <Route path="/register-user" component={RegisterUserPage} />
  </Switch>
);

export default Routes;
