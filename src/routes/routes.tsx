import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import AdminLogin from '../pages/AdminLogin';
import RegisterUserPage from '../pages/RegisterUserPage';
import RegisterNewAdmin from '../pages/RegisterNewAdmin';
import RecoverPassword from '../pages/RecoverPassword';
import SearchPage from '../pages/SearchPage';
import BookPage from '../pages/BookPage';

const Routes:React.FC = () => (
  <Switch>
    <Route path="/" exact component={HomePage} />

    <Route path="/login" component={LoginPage} />
    <Route path="/admin-login" component={AdminLogin} />

    <Route path="/register-user" component={RegisterUserPage} />
    <Route path="/register-new-admin-321" component={RegisterNewAdmin} />
    <Route path="/recover-password" component={RecoverPassword} />

    <Route path="/search" component={SearchPage} />
    <Route path="/book/:book+" component={BookPage} />
  </Switch>
);

export default Routes;
