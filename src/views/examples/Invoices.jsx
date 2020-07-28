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

const ActionButton = (props) => {
  return (
    <div className="dropdownButtons">
      <UncontrolledDropdown>
        <DropdownToggle>
          ...
        </DropdownToggle>
        <DropdownMenu>
        {
          props.invoice.total - props.paid === 0 ?
            <DropdownItem disabled to={`/admin/invoices/${props.id}/${props.invoice._id}`}
                          tag={Link}>Accept Payment</DropdownItem> :
            <DropdownItem to={`/admin/invoices/${props.invoice._id}/${props.id}`} tag={Link}>
              Accept Payment</DropdownItem>
        }
        {
          loggedUser.level >= 3 ?
            <DropdownItem to={`/admin/invoices/${props.estimateId}/${props.invoice._id}/update`}
                          tag={Link}>Update</DropdownItem> :
            loggedUser.level === 2 && props.userInEstimate ?
              <DropdownItem
                to={`/admin/invoices/${props.estimateId}/${props.invoice._id}/update`}
                tag={Link}>Update</DropdownItem> :
              <DropdownItem disabled
                to={`/admin/invoices/${props.estimateId}/${props.invoice._id}/update`}
                tag={Link}>Update</DropdownItem>
        }

        <DropdownItem to={`/admin/invoices/${props.estimateId}/${props.invoice._id}/email`}
          tag={Link}>Send by email</DropdownItem>
        {
          loggedUser.level >= 4 ?
            <DropdownItem onClick={() => {
              axios.patch(Global.url + `invoicedelete/${props.id}/${props.invoice._id}`)
                  .then(({data}) => {
                    alert('Invoice Delete ')
                    window.location.reload()
                  })
                  .catch(err => {
                    console.log(err.response)
                  })
            }}>
              <span className="text-danger">Delete</span>
            </DropdownItem>
            :
            null
          }
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  )
}

const ActionDropDown = (props) => {
  return (
    <UncontrolledCollapse toggler={"#toggle" + props.invoice._id}>
      {!props.isMobileVersion ?
        <Card>
          <CardBody>
            <h3>Invoice # {props.invoiceIndex} from Job: {props.jobName}</h3>
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
              {props.invoice.payment.length === 0 ? <tr>
                    <td>No payments register</td>
                  </tr>
                  : props.invoice.payment.map((e, i) => {
                    const paymentIndex = i + 1
                    return (
                        <tr key={i}>
                          <td>Payment # {paymentIndex}</td>
                          <td><Moment format={"MMM D, YY"}>{e.date}</Moment></td>
                          <td align="right">$ {isNaN(parseFloat(Math.round(props.paid * 100) / 100).toFixed(2)) ? 0 : parseFloat(Math.round(props.paid * 100) / 100).toFixed(2)}</td>
                          <td align="right">$ {parseFloat(Math.round((props.total2 - props.paidOk[i]) * 100) / 100).toFixed(2)}</td>
                        </tr>
                    )
                  })
              }
              </tbody>
            </Table>
          </CardBody>
        </Card>
        :
        <>
          <div className="col-md-12"><b>Invoice # {props.invoiceIndex} from Job: {props.jobName}</b></div><br/>
          <Table
              className="align-items-center table-flush col-xs-12">
            <thead className="thead-light">
              <tr>
                <th scope="col">Payments</th>
              </tr>
            </thead>
            <tbody>
              {props.invoice.payment.length === 0 ?
                <tr>
                  <td>No payments register</td>
                </tr>
                : props.invoice.payment.map((e, i) => {
                  const paymentIndex = i + 1
                  return (
                    <tr key={i}>
                      <td>
                        Payment # {paymentIndex}<br/>
                        <b><Moment format={"MMM D, YY"}>{e.date}</Moment></b> <br/>
                        Total: <b>$ {isNaN(parseFloat(Math.round(props.paid * 100) / 100).toFixed(2)) ? 0 : parseFloat(Math.round(props.paid * 100) / 100).toFixed(2)}</b>,
                        Balance: <b>$ {parseFloat(Math.round((props.total2 - props.paidOk[i]) * 100) / 100).toFixed(2)}</b>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
        </>
      }
    </UncontrolledCollapse>
  )
}

const RowInvoice = (props) =>{
  return (
    <>
      {!props.isMobileVersion?
        <>
          <tr>
            <td style={{width: "100px"}}>
              <ActionButton {...props}></ActionButton>
            </td>
            <td>
              <Button id={"toggle" + props.invoice._id} color="primary">
                <i className="ni ni-bold-down"></i>
              </Button>
            </td>
            <td>{!props.nameClient ? 'Client Delete' : props.nameClient}</td>
            <td><Moment format={"MMM D, YY"}>{props.date}</Moment></td>
            <td>{props.invoice.total - props.paid === 0 ? 'Paid' : props.invoice.status}</td>
            <td>${parseFloat(Math.round(props.invoice.total * 100) / 100).toFixed(2)}</td>
            <td>${parseFloat(Math.round(props.total * 100) / 100).toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan={7}>
              <ActionDropDown {...props}></ActionDropDown>
            </td>
          </tr>
        </>
        :
        <>
          <tr>
            <td>
              <Moment format={"MMM D, YY"}>{props.date}</Moment><br/>
              {!props.nameClient ? 'Client Delete' : props.nameClient}<br/>
              Status: <b>{props.invoice.total - props.paid === 0 ? 'Paid' : props.invoice.status}</b><br/>
              Total: <b>${parseFloat(Math.round(props.invoice.total * 100) / 100).toFixed(2)}</b><br/>
              Balance: <b>${parseFloat(Math.round(props.total * 100) / 100).toFixed(2)}</b><br/>
              <div className="buttonfloat-right buttonfloat-right-estimates">
                <ActionButton {...props}></ActionButton>
              </div>
              <Button id={"toggle" + props.invoice._id} color="primary">
                <i className="ni ni-bold-down"></i>
              </Button>

            </td>
          </tr>
          <tr>
            <td className="tdMobile">
              <ActionDropDown {...props}></ActionDropDown>
            </td>
          </tr>
        </>
      }
    </>
  )
}

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

  updateWindowDimensions = () => {
    this.setState(prevState => {return {...prevState, isMobileVersion : (window.innerWidth < 1024) }})
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)

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
    this.state.estimates.forEach((e,i)=>{
      if(!e.clientId) return <th>Client Delete</th>
      if(!e.workers)return <th scope="row">Worker Delete</th>
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
                        <p color="primary" size="sm">
                          Create a Invoice
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
                          <th scope="col"></th>

                          <th scope="col">Client</th>
                          <th scope="col">Date</th>
                          <th scope="col">Status</th>
                          <th scope="col">Total</th>
                          <th scope="col">Balance</th>
                        </>
                        :
                        <>
                          <th>Details</th>
                        </>
                      }
                    </tr>
                  </thead>
                  <tbody>
                  {
                    allInvoices.length === 0 ?<tr><td>No invoices register</td></tr> : allInvoices.map((e,i) =>{
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
                        <RowInvoice key={i} {...e}
                          id={id}
                          isMobileVersion={this.state.isMobileVersion}
                          paid={paid}
                          invoiceIndex={invoiceIndex}
                          jobName={jobName}
                          total={total}
                          total2={total2}
                          paidOk={paidOk}
                          userInEstimate={userInEstimate}
                          nameClient={nameClient}> </RowInvoice>
                      )
                    })
                  }
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



export default Invoices;
