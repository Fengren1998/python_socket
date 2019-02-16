import React from 'react';
import { withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import 'react-dates/initialize';
import Grid from '@material-ui/core/Grid';
import Dashboard from './pages/Dashboard';
import AuthenticatedRoute from './containers/Router/AuthenticatedRoute';
import UnauthenticatedRoute from './containers/Router/UnauthenticatedRoute';
import EmailVerificationPage from './pages/EmailVerificationPage';
import EmailVerificationProcessingPage from './pages/EmailVerificationProcessingPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ForgotPasswordProcessingPage from './pages/ForgotPasswordProcessingPage';
import FourOhFourPage from './pages/FourOhFourPage';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbars/DashboardNavbar';
import RegisterPage from './pages/RegisterPage';
import SchedulePage from './pages/SchedulePage';

import ServiceCard from './components/Cards/ServiceCard';

const App = () => (
  <div className="App">
    <Grid container>
      <Grid item xs={12}>
        <Navbar />
        <Switch>
          <AuthenticatedRoute path="/reservation" redirect="/login" component={SchedulePage} />
          <AuthenticatedRoute exact path="/" redirect="/login" component={Dashboard} />
          <UnauthenticatedRoute path="/login" redirect="/" component={LoginPage} />
          <UnauthenticatedRoute path="/forgot-password/reset" redirect="/" component={ForgotPasswordProcessingPage} />
          <UnauthenticatedRoute path="/forgot-password" redirect="/" component={ForgotPasswordPage} />
          <UnauthenticatedRoute path="/register" redirect="/" component={RegisterPage} />
          <UnauthenticatedRoute path="/email-verification/verify" redirect="/" component={EmailVerificationProcessingPage} />
          <UnauthenticatedRoute path="/email-verification" redirect="/" component={EmailVerificationPage} />
          <Route path="/sandbox" component={ServiceCard} />
          <Route component={FourOhFourPage} />
        </Switch>
      </Grid>
    </Grid>
  </div>
);

export default withRouter(App);
