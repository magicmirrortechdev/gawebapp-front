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
let loggedUser
loggedUser = JSON.parse(localStorage.getItem('loggedUser'));

class Invoices extends React.Component {
  state = {
    estimates:[],
    id:'',
    btnDropup: false,
    modal: false
  };
  constructor(props) {
    super(props);
    loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  }

  componentDidMount() {
    loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
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
    let allInvoices=[]
    let userInEstimate 
    let estimateId
    let client
    let id
    let jobName
    this.state.estimates.map((e,i)=>{
      client = e.clientId
      return e.invoices.map(ex =>{
        allInvoices.push({invoice:ex, client:client})
        return(allInvoices)
      })
    })
    this.state.estimates.map((e,i)=>{
      if(!e.clientId) return <th>Client Delete</th>
      if(!e.workers)return <th scope="row">Worker Delete</th>
      estimateId = e._id
      id = e._id
      jobName = e.jobName
      userInEstimate = e.workers.filter(wx => wx.workerId && wx.workerId._id === loggedUser._id).length > 0
    })
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
                  {   

                       allInvoices.length === 0 ?<tbody><tr><td>No invoices register</td></tr></tbody> : allInvoices.map((e,i) =>{
                         console.log(e)
                          let nameClient = e.client === null || e.client.name === undefined || !e.client.name ? <p>Client Delete</p>: e.client.name 

                          const invoiceIndex = i + 1
                          const paid = e.invoice.payment.reduce((acc, current, i) => acc + isNaN(current.paid) ? 0 : current.paid, 0) 
                          const total = e.invoice.total - paid
                          const total2 = e.invoice.total

                          const paidAcc = e.invoice.payment.map((e,i)=>{
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
                                 e.invoice.total - paid === 0 ? <DropdownItem disabled to={`/admin/invoices/${id}/${e.invoice._id}`} tag={Link}>Accept Payment</DropdownItem> :
                                <DropdownItem to={`/admin/invoices/${e.invoice._id}/${id}`} tag={Link}>Accept Payment</DropdownItem>
                              } 
                                {
                                   loggedUser.level >= 3 ? <DropdownItem to={`/admin/invoices/${estimateId}/${e.invoice._id}/update`} tag={Link}>Update</DropdownItem> : 
                                   loggedUser.level === 2 && userInEstimate ? <DropdownItem to={`/admin/invoices/${estimateId}/${e.invoice._id}/update`} tag={Link}>Update</DropdownItem> :
                                   <DropdownItem disabled to={`/admin/invoices/${estimateId}/${e.invoice._id}/update`} tag={Link}>Update</DropdownItem>
                                 }

                                <DropdownItem to={`/admin/invoices/${estimateId}/${e.invoice._id}/email`} tag={Link}>Send by email</DropdownItem>
                               
                                {
                                  loggedUser.level >= 4 ?
                                  <DropdownItem onClick={()=>{
                                    axios.patch(Global.url + `invoicedelete/${id}/${e.invoice._id}`)
                                    .then(({data})=>{
                                        alert('Invoice Delete ')
                                        window.location.reload()
                                    })
                                    .catch(err => {
                                      console.log(err.response)
                                    })
                                    }}>
                                    <span
                                      className="text-danger">Delete</span>
                                  </DropdownItem>:
                                  null

                                }
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </div>
                        </td>
                        <td>
                          <Button id={"toggle" + e.invoice._id} color="primary"><i className="ni ni-bold-down"></i></Button>
                        </td>
                        
                        <th scope="row" >{!nameClient ? 'Client Delete' : nameClient }</th>
                        <td><Moment add={{days: 1}} format={"MMM D, YY"}>{e.date}</Moment></td>
                        <td>{e.invoice.total-paid === 0 ? 'Paid' : e.invoice.status}</td>
                        <td>${parseFloat(Math.round(e.invoice.total * 100) / 100).toFixed(2)}</td> 
                        <td>${parseFloat(Math.round(total * 100) / 100).toFixed(2)}</td>                       
                        
                        </tr>
                        <tr>
                            <td colSpan={7}>
                            <UncontrolledCollapse toggler={"#toggle" + e.invoice._id}>
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
                                                    {e.invoice.payment.length === 0 ? <tbody><tr><td>No payments register</td></tr></tbody> :  e.invoice.payment.map((e,i)=>{
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
                    }
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