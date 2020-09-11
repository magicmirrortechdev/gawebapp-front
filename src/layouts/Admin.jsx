import React from "react";
import { Route, Switch } from "react-router-dom";
import AdminNavbar from "components/Navbars/AdminNavbar.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";

import routes from "routes.js";
import routesWorker from 'routesWorker'
import configureStore from "../redux/store";
const {store} = configureStore();

let loggedUser
class Admin extends React.Component {

  constructor(props) {
    super(props);
    const {auth} = store.getState();
    loggedUser = auth.userLogged;
}

  componentDidUpdate(e) {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.mainContent.scrollTop = 0;
  }

  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
            exact
          />
        );
      }else if (prop.layout === "/admin/estimates") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
            exact
          />
        );
      }
      else if (prop.layout === "/admin/reports" ) {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
            exact
          />
        );
      }
      else if (prop.layout === "/admin/jobs") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
            exact
          />
        );
      }
      else if (prop.layout === "/admin/time") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
            exact
          />
        );
      }
      else if (prop.layout === "/admin/invoices") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
            exact
          />
        );
      }
      else if (prop.layout === "/admin/workers") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
            exact
          />
        );
      }
      else if (prop.layout === "/admin/expenses") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
            exact
          />
        );
      }
      else if (prop.layout === "/admin/clients") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
            exact
          />
        );
      }
      
      else {
        return null;
      }
    });
  };

  getRoutesW = routesWorker => {
    return routesWorker.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
            exact
          />
        );
      }else if (prop.layout === "/admin/estimates") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
            exact
          />
        );
      }
      else if (prop.layout === "/admin/jobs") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
            exact
          />
        );
      }
      else if (prop.layout === "/admin/time") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
            exact
          />
        );
      }
      else if (prop.layout === "/admin/invoices") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
            exact
          />
        );
      }
      else if (prop.layout === "/admin/workers") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
            exact
          />
        );
      }
      else if (prop.layout === "/admin/expenses") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
            exact
          />
        );
      }
      else if (prop.layout === "/admin/clients") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
            exact
          />
        );
      }
      
      else {
        return null;
      }
    });
  };

  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  }

  getBrandTextW = path => {
    for (let i = 0; i < routesWorker.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routesWorker[i].layout + routesWorker[i].path
        ) !== -1
      ) {
        return routesWorker[i].name;
      }
    }
    return "Brand";
  }

  render(props) {
    if (!loggedUser){ 
      this.props.history.push('/')
      window.location.reload()
    }

    return (
      <>
        <div id="spinner" style={{display:"flex",backgroundColor:"rgba(183,183,183,0.5)", alignContent:"center", justifyContent:"center",height:"100%", width:"100%", alignItems:"center", visibility:'hidden', position:"absolute", zIndex:"1" }}>
          <div>
            <div className="loadingio-spinner-eclipse-9uhm73z846u">
              <div className="ldio-cv9d96mw3dl">
                <div></div>
              </div>
            </div>
            <p style={{"fontSize": "35px", "fontWeight": "bold"}}>
              Please wait...
            </p>
          </div>
        </div>
        <Sidebar
          {...this.props}
          routes={loggedUser.level >= 2 ? routes : routesWorker}
          logo={{
            innerLink: "/admin/index",
            imgSrc: require("assets/img/brand/transparent.png"),
            imgAlt: "..."
          }}
        />
        <div className="main-content" ref="mainContent">
          <AdminNavbar
            {...this.props}
            brandText={loggedUser.level >= 2 ? this.getBrandText(this.props.location.pathname) : this.getBrandTextW(this.props.location.pathname)}
          />
          <Switch>{loggedUser.level >= 2 ? this.getRoutes(routes) : this.getRoutesW(routesWorker)}</Switch>
         
        </div>
      </>
    );
  }
}

export default Admin;
