import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  NavbarBrand,
  Navbar,
  Container,
} from "reactstrap";
import configureStore from "../../redux/store";
const {store} = configureStore();

let loggedUser
class AdminNavbar extends React.Component {

  constructor(props) {
    super(props);
    const {auth} = store.getState();
    loggedUser = auth.userLogged
  }

  render() {
    return (
      <>
        <Navbar
          className="navbar-top navbar-horizontal navbar-dark"
          expand="md">
          <Container className="px-4">
            <NavbarBrand to="/" tag={Link}>
              Green Acorn App
            </NavbarBrand>
            {loggedUser ?
              (
                <button className="navbar-toggler" id="navbar-collapse-main">
                  <span className="navbar-toggler-icon"/>
                </button>
              ) : null
            }
          </Container>
        </Navbar>
      </>
    );
  }
}

export default AdminNavbar;
