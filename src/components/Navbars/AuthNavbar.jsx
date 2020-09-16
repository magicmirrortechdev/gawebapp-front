import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  NavbarBrand,
  Navbar,
  Container,
} from "reactstrap";
import {connect} from "react-redux";
import {logoutUser} from "../../redux/actions/authAction";

class AdminNavbar extends React.Component {

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
            {this.props.userLogged ?
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
const mapStateToProps = state => ({
  userLogged: state.auth.userLogged,
  version: state.auth.version
})

export default connect(mapStateToProps, {logoutUser})(AdminNavbar);
