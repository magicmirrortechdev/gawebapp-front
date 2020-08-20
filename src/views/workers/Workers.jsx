import React from "react";
import {Link} from 'react-router-dom'

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
import Global from "../../global";
import {store} from "../../redux/store";
import {connect} from "react-redux";
import {getUsers, removeUser} from '../../redux/actions/userAction'

let loggedUser
const ActionButton = (props) =>{
  return (
    <UncontrolledDropdown>
        <DropdownToggle>
          ...
        </DropdownToggle>
        <DropdownMenu>
          {loggedUser.level >=3 ? <DropdownItem to={`/admin/workers/update/${props._id}`} tag={Link}>Update</DropdownItem> : null}
          {
            loggedUser.level >=4 ?
              <DropdownItem onClick={()=>{
                props.removeUser(props._id)
                alert('Worker Delete')
              }}><span
                  className="text-danger">Delete</span>
              </DropdownItem>
              :null
          }
        </DropdownMenu>
    </UncontrolledDropdown>
  )
}

class Workers extends React.Component {
  constructor(props) {
    super(props);
    const {auth} = store.getState();
    loggedUser = auth.userLogged
  }

  updateWindowDimensions = () => {
    this.setState(prevState => {return {...prevState, isMobileVersion : (window.innerWidth < Global.mobileWidth) }})
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
    this.props.getUsers();
  }

  render() {
    const { users } = this.props;
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
                    {loggedUser.level >= 3 ?
                      <div className="col text-right">
                        <Link to="addworker">
                          <p color="primary" size="sm">
                            Add a Worker
                          </p>
                        </Link>
                      </div>
                      : null
                    }
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      {!this.state.isMobileVersion ?
                        <>
                          {loggedUser.level >= 3 ? <th scope="col"></th> : null}
                          <th scope="col">Name</th>
                          <th scope="col">Email</th>
                          <th scope="col">Pay Rate</th>
                          <th scope="col">Effective Rate</th>
                        </>
                        :
                        <>
                          <th>Worker</th>
                        </>
                      }
                    </tr>
                  </thead>
                  <tbody>
                   {users.length === 0 ? <tr><td>No workers register</td></tr> :
                   users.map((e,i)=>{
                    return(
                      <tr key={i}>
                        {!this.state.isMobileVersion ?
                          <>
                            {
                            loggedUser.level >=3 ?
                            <td>
                              <ActionButton {...e} removeUser={this.props.removeUser}></ActionButton>
                            </td>: null}
                            <td>{e.name}</td>
                            <td>{e.email}</td>
                            <td>{e.payment}</td>
                            <td>{e.effective}</td>
                          </>
                          :
                          <>
                            <td>
                              {e.name}<br/>
                              Payment: <b>{e.payment}</b><br/>
                              Effective: <b>{e.effective}</b><br/>
                              <small>({e.email})</small><br/>
                              <div className="buttonfloat-right buttonfloat-right-jobs">
                                <ActionButton {...e} removeUser={this.props.removeUser}></ActionButton>
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
  users: state.user.users,
})

export default connect(mapStateToProps, {getUsers, removeUser})(Workers);
