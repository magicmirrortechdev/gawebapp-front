import React from "react";
import { Link } from 'react-router-dom'
import axios from 'axios'
import AuthService from '../../services/services'

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
let loggedUser

const authService = new AuthService()

class Clients extends React.Component {
  state = {
    clients:[]
  };
  constructor(props) {
    super(props);
    loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  }


  componentDidMount() {
    axios
      .get(Global.url + `checkclients`)
      .then(({ data }) => {
        this.setState(prevState => {
          return {
            ...prevState,
            ...data
          }
        })

      })
      .catch(err => {
        console.log(err)
      })
  }


  

  render() {
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
                      <p
                        color="primary"
                        size="sm" 
                      >
                        Add Client
                      </p>
                    </Link>
                      
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone Number</th>
                      
                    </tr>
                  </thead>
                  
                    

                     {this.state.clients.length === 0 ?  <tbody><tr><td>No clients register</td></tr></tbody>:
                     this.state.clients.map((e,i)=>{
                      return(
                        <tbody key={i}>
                        <tr>
                        <td>
                        <div className="dropdownButtons">
                        <UncontrolledDropdown>
                           <DropdownToggle>
                              ...
                          </DropdownToggle>
                          <DropdownMenu>
                          <DropdownItem to={`/admin/clients/estimatecreate/${e._id}`} tag={Link}>Create Estimate</DropdownItem>
                          <DropdownItem to={`/admin/clients/update/${e._id}`} tag={Link}>Update Client</DropdownItem>

                          { loggedUser.level >= 4 ?
                            <DropdownItem onClick={()=>{
                            authService
                              .clientDelete(e._id)
                              .then(({data}) => {
                                alert('Client Delete')
                                window.location.reload()
                                
                              })
                              .catch(err => {
                                //aquí deberia ir una notificacion o un swal o un toastr
                                console.log(err.response)
                              })
                          }}><span
                                  className="text-danger">Delete</span>
                          </DropdownItem>
                            :null
                          }
                          </DropdownMenu>
                        </UncontrolledDropdown>
                          </div>
                        </td>
                        <th scope="row" >{e.name}</th>
                        <td>{e.email}</td>
                        <td>{e.phone}</td>
                        
                        </tr>
                       
                    
                      </tbody>
                     )  
                    })}
                      
                      
                </Table>
              </Card>
            </Col>
            
          </Row>
        </Container>
      </>
    );
  }
}

export default Clients;
