import React from "react";
import axios from 'axios'
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
  UncontrolledDropdown,
  DropdownItem,
  Button,
  UncontrolledCollapse,
  CardBody
} from "reactstrap";
// core components
import Header from "components/Headers/Header.jsx";
import Global from "../../global";

class Invoices extends React.Component {
  state = {
    estimates:[],
    id:'',
    btnDropup: false,
    modal: false
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
        console.log(err)
      })
  }

  
   sum(array) {
    let aux = array[0]
    const arr2 = []
    arr2.push(array[0])
    array.forEach((e, i, a) => {
      if (e !== a[0]) {
        arr2.push(e + aux)
        aux = e+aux
      }
    });
    return arr2
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
                    <Link to="createinvoice">
                      <p
                        color="primary"
                        size="sm" 
                      >
                        Create a Invoice
                      </p>
                    </Link>
                      
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col"></th>
                      <th scope="col"></th>

                      <th scope="col">Client</th>
                      <th scope="col">Date</th>
                      <th scope="col">Status</th>
                      <th scope="col">Total</th>
                      <th scope="col">Balance</th>
                    </tr>
                  </thead>
                  {this.state.estimates.length === 0 ?  <tbody><tr><td>No invoices register</td></tr></tbody>:
                     this.state.estimates.map((e,i)=>{
                      if(!e.clientId) return <th>Client Delete</th>
                      const estimateId = e._id
                      const client = e.clientId.name 
                      const id = e._id
                      const jobName = e.jobName
                      
                      return(
                        e.invoices.map((e,i) =>{
                          const invoiceIndex = i + 1
                          const paid = e.payment.reduce((acc, current, i) => acc + isNaN(current.paid) ? 0 : current.paid, 0) 
                          const total = e.total - paid
                          const total2 = e.total

                          const paidAcc = e.payment.map((e,i)=>{
                            let sum = 0
                              sum += e.paid||0
                            
                            
                            return sum
                          })
                          const paidOk = this.sum(paidAcc)
                          
                          return(
                            <tbody key={i}>
                        <tr>
                        <td style={{width:"100px"}}>
                          <div className="dropdownButtons">
                            <UncontrolledDropdown>
                              <DropdownToggle>
                                ...
                              </DropdownToggle>
                              <DropdownMenu>{
                                 e.total - paid === 0 ? <DropdownItem disabled to={`/admin/invoices/${id}/${e._id}`} tag={Link}>Accept Payment</DropdownItem> :
                                <DropdownItem to={`/admin/invoices/${e._id}/${id}`} tag={Link}>Accept Payment</DropdownItem>
                              }
                                <DropdownItem to={`/admin/invoices/${estimateId}/${e._id}/update`} tag={Link}>Update</DropdownItem>
                                <DropdownItem to={`/admin/invoices/${estimateId}/${e._id}/email`} tag={Link}>Send by email</DropdownItem>
                                <DropdownItem onClick={()=>{
                                  axios.patch(Global.url + `invoicedelete/${id}/${e._id}`)
                                  .then(({data})=>{
                                      alert('Invoice Delete ')
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
                        <td>
                          <Button id={"toggle" + e._id} color="primary"><i className="ni ni-bold-down"></i></Button>
                        </td>
                        
                        <th scope="row" >{!client ? 'Client Delete' : client }</th>
                        <td><Moment format={"MMM D, YY"}>{e.date}</Moment></td>
                        <td>{e.total-paid === 0 ? 'Paid' : e.status}</td>
                        <td>${parseFloat(Math.round(e.total * 100) / 100).toFixed(2)}</td> 
                        <td>${parseFloat(Math.round(total * 100) / 100).toFixed(2)}</td>                       
                        
                        </tr>
                        <tr>
                            <td colSpan={7}>
                            <UncontrolledCollapse toggler={"#toggle" + e._id}>
                                <Card>
                                  <CardBody>
                                  <h3>Invoice # {invoiceIndex} from Job:  {jobName}</h3>
                                  <h3>- Payments</h3>
                                                <Table
                                                    className="align-items-center table-flush col-md-6 col-xs-12"
                                                    responsive>
                                                    <thead className="thead-light">
                                                    <tr>
                                                        <th scope="col">Payment</th>
                                                        <th scope="col">Date</th>
                                                        <th scope="col">Total</th>
                                                        <th scope="col">Balance</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {e.payment.length === 0 ? <tbody><tr><td>No payments register</td></tr></tbody> :  e.payment.map((e,i)=>{
                                                      const paymentIndex = i +1
                                                      return(
                                                        
                                                        <tr key={i}>
                                                            <td>Payment # {paymentIndex}</td>
                                                            <td><Moment format={"MMM D, YY"}>{e.date}</Moment></td>
                                                            <td align="right">$ {isNaN(parseFloat(Math.round(e.paid * 100) / 100).toFixed(2)) ? 0 : parseFloat(Math.round(e.paid * 100) / 100).toFixed(2) }</td>
                                                            <td align="right">$ {parseFloat(Math.round((total2 - paidOk[i]) * 100) / 100).toFixed(2)}</td>
                                                        </tr>
                                                        
                                                      )
                                                    })
                                                    }
                                                    </tbody>
                                                </Table>
                                  </CardBody>
                                </Card>
                            </UncontrolledCollapse>
                            </td>
                        </tr>
                      </tbody>
                          )
                        })
                        
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