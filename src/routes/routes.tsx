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
import RegisterBook from '../pages/RegisterBook';
import ResetPassword from '../pages/ResetPassword';
import PageProfile from '../pages/PageProfileUser';
import PageProfileAdmin from '../pages/PageProfileAdmin';

const Routes:React.FC = () => (
  <Switch>
    <Route path="/" exact component={HomePage} />

    <Route path="/login" component={LoginPage} />
    <Route path="/register-user" component={RegisterUserPage} />
    <Route path="/profile-user/:id" component={PageProfile} />

    <Route path="/admin-login" component={AdminLogin} />
    <Route path="/register-new-admin-321" component={RegisterNewAdmin} />
    <Route path="/profile-admin/:id" component={PageProfileAdmin} />

    <Route path="/recover-password" component={RecoverPassword} />
    <Route path="/reset-password" component={ResetPassword} />
    {/* Depois validar pelo token ou algo assim */}

    <Route path="/search/:token" component={SearchPage} />
    <Route path="/book/:book" component={BookPage} />

    <Route path="/register-book-321/:id+" component={RegisterBook} />
  </Switch>
);

export default Routes;
