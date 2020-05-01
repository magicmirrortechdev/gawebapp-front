import React from "react";
import axios from 'axios'
import AuthService from '../../services/services'
import { Link } from "react-router-dom";
import Moment from 'react-moment'

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

const authService = new AuthService()

class Icons extends React.Component {
  state = {
    estimates:[],
    id:'',
    btnDropup: false
  };

  componentDidMount() {
    axios
      .get(Global.url + `checkestimates`)
      .then(({ data }) => {
        this.setState(prevState => {
          return {
            ...prevState,
            ...data
          }
        })
      })
      .catch(err => {
        console.log(err.response)
      })
  }
  convertInvoice = (_id)=>{
    authService
    .convertInvoice(_id)
    .then(response => {
            this.props.history.push(`estimates`)
            console.log(response)
          })
          .catch(err => {
            console.log(err.response)
            alert(err.response.data.msg || err.response.data.err.message)
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
                    <Link to="addestimate">
                      <p
                        color="primary"
                        size="sm" 
                      >
                        Add Estimate
                      </p>
                    </Link>                      
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">Client</th>
                      <th scope="col">Date</th>
                      <th scope="col">Status</th>
                      <th scope="col">Total</th>
                    </tr>
                  </thead>
                  {this.state.estimates.length === 0 ?  <tbody><tr><td>No estimates register</td></tr></tbody>:
                     this.state.estimates.map((e,i)=>{
                      let nameEstimate = e.nameEstimate
                      let subtotal = e.items.reduce((acc, current, i) => acc + current.subtotal, 0)
                      let tax = parseInt(e.tax) * subtotal / 100
                      let discount = e.discount
                      let total = !subtotal ? 0 : subtotal + tax  - discount

                      return(
                        <tbody key={i}>
                        <tr >
                        <td>
                          <div className="dropdownButtons">
                            <UncontrolledDropdown>
                              <DropdownToggle>
                                ...
                              </DropdownToggle>
                              <DropdownMenu>
                                <DropdownItem to={`/admin/estimates/${e._id}/invoice`} tag={Link}>Convert to Invoice</DropdownItem>
                                <DropdownItem onClick={()=>{
                                  authService
                                      .convertJob(e._id)
                                      .then(response => {
                                        this.props.history.push(`jobs`)
                                        console.log(response)

                                      })
                                      .catch(err => {
                                        console.log(err.response)
                                      })
                                }}>Approve</DropdownItem>
                                <DropdownItem onClick={()=>{
                                  authService
                                      .decline(e._id)
                                      .then(response => {
                                        window.location.reload()
                                        console.log(response)

                                      })
                                      .catch(err => {
                                        console.log(err.response)
                                      })
                                }}>Decline</DropdownItem>
                                <DropdownItem to={`/admin/estimates/${e._id}/email`} tag={Link}>Send by email</DropdownItem>
                                <DropdownItem to={`/admin/estimates/${e._id}`} tag={Link}>Update</DropdownItem>
                                <DropdownItem onClick={()=>{
                                  authService
                                      .estimateDelete(e._id)
                                      .then(({data}) => {
                                        alert('Estimate Delete')
                                        window.location.reload()

                                      })
                                      .catch(err => {
                                        console.log(err.response)
                                      })
                                }}><span
                                    className="text-danger">Delete</span></DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </div>
                        </td>
                        <th scope="row" >{nameEstimate ? nameEstimate : e.clientId.name}</th>
                        <td><Moment format={"MMM D, YY"}>{e.dateCreate}</Moment></td>
                        <td>{e.status === "Approve" ? "Approved": e.status}</td>
                        <td>${ parseFloat(Math.round(total * 100) / 100).toFixed(2)}</td>
                        
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



export default Icons;
