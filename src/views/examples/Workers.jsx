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

const authService = new AuthService()

class Workers extends React.Component {
  state = {
    users:[]
  };


  componentDidMount() {
    axios
      .get(`http://localhost:3000/getusers`)
      .then(({ data }) => {
        this.setState(prevState => {
          return {
            ...prevState,
            ...data
          }
        })

        console.log('Aqui está el state', this.state.clients )
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
                    <Link to="addworker">
                      <p
                        color="primary"
                        size="sm" 
                      >
                        Add a Worker
                      </p>
                    </Link>
                      
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Pay Rate</th>
                      <th scope="col">Effective Rate</th>
                      <th scope="col">Options</th>
                    </tr>
                  </thead>
                  
                    

                     {this.state.users.length === 0 ?  <tbody><tr><td>No workers register</td></tr></tbody>:
                     this.state.users.map((e,i)=>{
                      return(
                        <tbody key={i}>
                        <tr >
                        <th scope="row" >{e.name}</th>
                        <td>{e.email}</td>
                        <td>{e.payment}</td>
                        <td>{e.effective}</td>
                        <td>
                        <UncontrolledDropdown>
                        <DropdownToggle>
                            ...
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem to={`/admin/workers/update/${e._id}`} tag={Link}>Update</DropdownItem>
                            <DropdownItem onClick={()=>{
                              authService
                                .workerDelete(e._id)
                                .then(({data}) => {
                                  alert('WorkerDelete')
                                  window.location.reload()
                                  
                                })
                                .catch(err => {
                                  console.log(err.response)
                                  alert(err.response.data.msg || err.response.data.err.message)
                                })
                            }}><span
                                    className="text-danger">Delete</span></DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                        
                        </td>
                        
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

export default Workers;
