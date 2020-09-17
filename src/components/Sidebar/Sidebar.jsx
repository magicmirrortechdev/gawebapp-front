
import React from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";

// reactstrap components
import {
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Button,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col
} from "reactstrap";
import {connect} from "react-redux";
import {logoutUser} from '../../redux/actions/authAction'
import Global from "../../global";
const version = Global.version;

class Sidebar extends React.Component {
  state = {
    collapseOpen: false,
    version
  }

  constructor(props) {
    super(props);
    this.activeRoute.bind(this);
  }

  componentDidMount() {
    if (!this.props.userLogged) return this.props.history.push('/auth/login')
    if (localStorage.getItem("version") !== version) {
      this.props.logoutUser()
      return this.props.history.push('/auth/login')
    }
  }

  handleLogout = () => {
    this.props.logoutUser()
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if(!nextProps.userLogged){
      return nextProps.history.push('/')
    }
  }

  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  // toggles collapse between opened and closed (true/false)
  toggleCollapse = () => {
    this.setState({
      collapseOpen: !this.state.collapseOpen
    });
  };
  // closes the collapse
  closeCollapse = () => {
    this.setState({
      collapseOpen: false
    });
  };
  // creates the links that appear in the left menu / Sidebar
  createLinks = routes => {
    return routes.map((prop, key) => {
      if(prop.invisible) return null;
      return (
        <NavItem key={key}>
          <NavLink
            to={prop.layout + prop.path}
            tag={NavLinkRRD}
            onClick={this.closeCollapse}
            activeClassName="active"
          >
            <i className={prop.icon} />
            {prop.name}
          </NavLink>
        </NavItem>
      );
    });
  };
  render() {

    const {  routes, logo, userLogged } = this.props;
    // eslint-disable-next-line no-unused-vars
    let navbarBrandProps;
    if (logo && logo.innerLink) {
      navbarBrandProps = {
        to: logo.innerLink,
        tag: Link
      };
    } else if (logo && logo.outterLink) {
      navbarBrandProps = {
        href: logo.outterLink,
        target: "_blank"
      };
    }


    return (
      <Navbar
        className="navbar-vertical fixed-left navbar-light bg-white"
        expand="md"
        id="sidenav-main"
      >
        <Container fluid>
          {/* Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={this.toggleCollapse}
          >
            <span className="navbar-toggler-icon" />
          </button>
          {/* Brand */}
          {/*
          {logo ? (
            <NavbarBrand className="pt-0" {...navbarBrandProps}>
              <img
                alt={logo.imgAlt}
                className="navbar-brand-img"
                src={logo.imgSrc}
              />
            </NavbarBrand>
          ) : null} */}
          Green Acorn App
          {/* User */}
          <Nav className="align-items-center d-md-none">
            <UncontrolledDropdown nav>
            <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">
                    <Media className="ml-2 d-none d-lg-block">
                      <span className="mb-0 text-sm font-weight-bold">
                        {userLogged? (userLogged.name) : ''}
                      </span>
                    </Media>
                  </Media>
                </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Welcome!</h6>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem href="#pablo" onClick={this.handleLogout}>
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          {/* Collapse */}
          <Collapse navbar isOpen={this.state.collapseOpen}>
            {/* Collapse header */}
            <div className="navbar-collapse-header d-md-none">
              <Row>
                {userLogged ? (
                  <Col className="collapse-brand" xs="6">
                    <h3>{userLogged.name}</h3>
                  </Col>
                ) : null}
                <Col className="collapse-close" xs="6">
                  <button
                    className="navbar-toggler"
                    type="button"
                    onClick={this.toggleCollapse}
                  >
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            {/* Navigation */}
            <Nav navbar>{this.createLinks(routes)}</Nav>
            {this.state.collapseOpen ?
            <Button
            color="link"
            onClick={this.handleLogout}
            style={{marginTop:"15px", marginLeft:"-15px"}}
            >
            <i className="ni ni-user-run" />

            <span>Logout</span>
            </Button> : null}
            {/* Divider */}
            <h5 style={{marginTop:"15px"}}>{this.state.version}</h5>
          </Collapse>
        </Container>

      </Navbar>

    );
  }
}

Sidebar.defaultProps = {
  routes: [{
    invisible: false
  }],
};

Sidebar.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired
  })
};

const mapStateToProps = state => ({
  userLogged: state.auth.userLogged
})

export default connect(mapStateToProps, {logoutUser})(Sidebar);
