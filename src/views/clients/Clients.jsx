import React from "react";
import { Link } from 'react-router-dom'

import {
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  Table,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown
} from "reactstrap";
// core components
import Header from "components/Headers/Header.jsx";
import {connect} from "react-redux";
import {getClients, removeClient} from "../../redux/actions/clientAction";
import Global from "../../global";

let loggedUser
const ActionButton = (props) => {
  return (
    <UncontrolledDropdown>
          <DropdownToggle>
            ...
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem to={`/admin/clients/estimatecreate/${props._id}`} tag={Link}>Create Estimate</DropdownItem>
            <DropdownItem to={`/admin/clients/update/${props._id}`} tag={Link}>Update Client</DropdownItem>

            { loggedUser.level >= 4 ?
                <DropdownItem onClick={()=>{
                  props.removeClient(props._id)
                  alert('Client Delete')
                }}><span
                    className="text-danger">Delete</span>
                </DropdownItem>
                :null
            }
          </DropdownMenu>
        </UncontrolledDropdown>
  )
}

class Clients extends React.Component {
  constructor(props) {
    super(props);
    loggedUser = this.props.userLogged
    if(Global.version !== this.props.version){
      this.props.history.push("/");
    }
  }

  updateWindowDimensions = () => {
    this.setState(prevState => {return {...prevState, isMobileVersion : (window.innerWidth < 1024) }})
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
    this.props.getClients();
  }

  render() {
    const { clients } = this.props;
    if (!this.state) return <p>Loading</p>
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="12">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Information</h3>
                    </div>
                    <div className="col text-right">
                    <Link to="addclient">
                      <p color="primary" size="sm"  >
                        Add Client
                      </p>
                    </Link>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      {!this.state.isMobileVersion ?
                        <>
                          <th scope="col"></th>
                          <th scope="col">Name</th>
                          <th scope="col">Email</th>
                          <th scope="col">Phone Number</th>
                        </>
                        :
                        <>
                          <th>Details</th>
                        </>
                      }
                    </tr>
                  </thead>
                  <tbody>
                    {clients.length === 0 ?  <tbody><tr><td>No clients register</td></tr></tbody>:
                     clients.map((e,i)=>{
                    return(
                      <tr key={i}>
                        {!this.state.isMobileVersion ?
                          <>
                            <td>
                              <ActionButton {...e} removeClient={this.props.removeClient}></ActionButton>
                            </td>
                            <td>{e.name}</td>
                            <td>{e.email}</td>
                            <td>{e.phone}</td>
                          </>
                          :
                          <>
                            <td>
                              {e.name}<br/>
                              <small>{e.email} {!e.phone ? '' : ' - ' + e.phone }</small>
                              <div className="buttonfloat-right buttonfloat-right-clients">
                                <ActionButton {...e} removeClient={this.props.removeClient}></ActionButton>
                              </div>
                            </td>
                          </>
                        }
                      </tr>
                     )
                    })}
                  </tbody>
                </Table>
              </Card>
            </Col>

          </Row>
        </Container>
      </>
    );
  }
}


const mapStateToProps = state => ({
  clients: state.client.clients,
  userLogged: state.auth.userLogged,
  version: state.auth.version
})

export default connect(mapStateToProps, {getClients, removeClient})(Clients);
