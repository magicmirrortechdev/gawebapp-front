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
  UncontrolledDropdown,
  DropdownItem
} from "reactstrap";
// core components
import Header from "components/Headers/Header.jsx";

const authService = new AuthService()

class Invoices extends React.Component {
  state = {
    invoices:[],
    id:'',
    btnDropup: false
  };

  componentDidMount() {
    axios
      .get(`https://greenacorn.herokuapp.com/checkinvoices`)
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
    console.log(this.state.invoices)
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
                      <th scope="col">Client</th>
                      <th scope="col">Date</th>
                      <th scope="col">Status</th>
                      <th scope="col">Total</th>
                      <th scope="col">Options</th>
                    </tr>
                  </thead>
                  {this.state.invoices.length === 0 ?  <tbody><tr><td>No invoices register</td></tr></tbody>:
                     this.state.invoices.map((e,i)=>{
                      let subtotal = e.items.reduce((acc, current, i) => acc + current.subtotal, 0)
                      let tax = parseInt(e.tax) * subtotal / 100
                      let discount = e.discount
                      let paid = e.paid
                      return(
                        <tbody key={i}>
                        <tr >
                        <th scope="row" >{e.clientId.name}</th>
                        <td>{e.dateCreate}</td>
                        <td>{e.status}</td>
                        <td>${subtotal + tax - paid - discount}USD</td>                       
                        <td>
                        <UncontrolledDropdown>
                                                        <DropdownToggle>
                                                            ...
                                                        </DropdownToggle>
                                                        <DropdownMenu>
                                                            <DropdownItem onClick={()=>{
                                                              authService
                                                                .paidInvoice(e._id)
                                                                .then(({data}) => {
                                                                  alert('The invoice is paid')
                                                                  window.location.reload()
                                                                  
                                                                })
                                                                .catch(err => {
                                                                  console.log(err.response)
                                                                  alert(err.response.data.msg || err.response.data.err.message)
                                                                })
                                                            }}
                                                            
                                                            >Accept Payment</DropdownItem>
                                                            <DropdownItem>Send by email</DropdownItem>
                                                            <DropdownItem onClick={()=>{
                                                              authService
                                                                .estimateDelete(e._id)
                                                                .then(({data}) => {
                                                                  alert('Invoice Delete')
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



export default Invoices;