
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.jsx";
import AuthLayout from "layouts/Auth.jsx";
import ForgotPassword from "views/forgotpassword/ForgotPassword";
import ResetPassword from "views/forgotpassword/ResetPassword";

ReactDOM.render(
  <BrowserRouter>
    <Switch>      
      <Route  path="/admin/reports" render={props => <AdminLayout {...props} />} />
      <Route  path="/admin/invoices" render={props => <AdminLayout {...props} />} />
      <Route  path="/admin/expenses" render={props => <AdminLayout {...props} />} />
      <Route  path="/admin/clients" render={props => <AdminLayout {...props} />} />
      <Route  path="/admin/time" render={props => <AdminLayout {...props} />} />
      <Route  path="/admin/jobs" render={props => <AdminLayout {...props} />} />
      <Route  path="/admin/workers" render={props => <AdminLayout {...props} />} />
      <Route  path="/admin/estimate" render={props => <AdminLayout {...props} />} />
      <Route  path="/admin" render={props => <AdminLayout {...props} />} />
      <Route  path="/auth" render={props => <AuthLayout {...props} />} />
      <Route exact path="/forgotpassword" component={ForgotPassword} />
      <Route exact path="/reset/:token" component={ResetPassword} />


      <Redirect from="/" to="/auth/login" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
