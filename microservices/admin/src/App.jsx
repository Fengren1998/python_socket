import React from 'react';
import { withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import 'react-dates/initialize';
import Grid from '@material-ui/core/Grid';
import AuthenticatedRoute from './containers/Router/AuthenticatedRoute';
import UnauthenticatedRoute from './containers/Router/UnauthenticatedRoute';
import EmailVerificationPage from './pages/EmailVerificationPage';
import FourOhFourPage from './pages/FourOhFourPage';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbars/DashboardNavbar';
import RegisterPage from './pages/RegisterPage';
import ServicesPage from './pages/ServicesPage';
import ServicesAddPage from './pages/ServicesAddPage';
import ServicesUpdatePage from './pages/ServicesUpdatePage';
import CustomersPage from './pages/CustomersPage';
import CustomersAddPage from './pages/CustomersAddPage';
import CustomersUpdatePage from './pages/CustomersUpdatePage';
import ReservationsPage from './pages/ReservationsPage';

const App = () => (
  <div className="App">
    <Grid container>
      <Grid item xs={12}>
        <Navbar />
        <Switch>
          <UnauthenticatedRoute redirect="/services" path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <AuthenticatedRoute redirect="/login" path="/email-verification" component={EmailVerificationPage} />
          <AuthenticatedRoute redirect="/login" path="/services/add" component={ServicesAddPage} />
          <AuthenticatedRoute redirect="/login" path="/services/update" component={ServicesUpdatePage} />
          <AuthenticatedRoute redirect="/login" exact path="/services" component={ServicesPage} />
          <AuthenticatedRoute redirect="/login" path="/customers/add" component={CustomersAddPage} />
          <AuthenticatedRoute redirect="/login" path="/customers/update" component={CustomersUpdatePage} />
          <AuthenticatedRoute redirect="/login" exact path="/customers" component={CustomersPage} />
          <AuthenticatedRoute redirect="/login" exact path="/reservations" component={ReservationsPage} />
          <Route component={FourOhFourPage} />
        </Switch>
      </Grid>
    </Grid>
  </div>
);

export default withRouter(App);
