import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import AdminLogin from '../pages/AdminLogin';

const Routes:React.FC = () => (
  <Switch>
    <Route path="/" exact component={HomePage} />
    <Route path="/login" component={LoginPage} />
    <Route path="/admin-login" component={AdminLogin} />
  </Switch>
);

export default Routes;
