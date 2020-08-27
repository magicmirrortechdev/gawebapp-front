import React from "react";
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
import {store} from "../../redux/store";
import {connect} from "react-redux";
import {getJobs, removeInvoice} from "../../redux/actions/jobAction";
let loggedUser

const ActionButton = (props) => {
  return (
    <div className="dropdownButtons">
      <UncontrolledDropdown>
        <DropdownToggle>
          ...
        </DropdownToggle>
        <DropdownMenu>
        {
          props.item.invoice.total - props.paid === 0 ?
            <DropdownItem disabled to={`/admin/invoices/${props.item.id}/${props.item.invoice._id}`}
                          tag={Link}>Accept Payment</DropdownItem> :
            <DropdownItem to={`/admin/invoices/${props.item.id}/${props.item.invoice._id}`} tag={Link}>
              Accept Payment</DropdownItem>
        }
        {
          loggedUser.level >= 3 ?
            <DropdownItem to={`/admin/invoices/${props.item.id}/${props.item.invoice._id}/update`}
                          tag={Link}>Update</DropdownItem> :
            loggedUser.level === 2 && props.userInEstimate ?
              <DropdownItem
                to={`/admin/invoices/${props.item.id}/${props.item.invoice._id}/update`}
                tag={Link}>Update</DropdownItem> :
              <DropdownItem disabled
                to={`/admin/invoices/${props.item.id}/${props.item.invoice._id}/update`}
                tag={Link}>Update</DropdownItem>
        }

        <DropdownItem to={`/admin/invoices/${props.item.id}/${props.item.invoice._id}/email`}
          tag={Link}>Send by email</DropdownItem>
        {
          loggedUser.level >= 4 ?
            <DropdownItem onClick={() => {
              props.props.removeInvoice(props.item.id, props.item.invoice._id)
              alert('Invoice Delete ')
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
    <UncontrolledCollapse toggler={"#toggle" + props.item.invoice._id}>
      {!props.isMobileVersion ?
        <Card>
          <CardBody>
            <h3>Invoice # {props.invoiceIndex} from Job: {props.item.jobName}</h3>
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
              {props.item.invoice.payment.length === 0 ? <tr>
                    <td>No payments register</td>
                  </tr>
                  : props.item.invoice.payment.map((e, i) => {
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
          <div className="col-md-12"><b>Invoice # {props.invoiceIndex} from Job: {props.item.jobName}</b></div><br/>
          <Table
              className="align-items-center table-flush col-xs-12">
            <thead className="thead-light">
              <tr>
                <th scope="col">Payments</th>
              </tr>
            </thead>
            <tbody>
              {props.item.invoice.payment.length === 0 ?
                <tr>
                  <td>No payments register</td>
                </tr>
                : props.item.invoice.payment.map((e, i) => {
                  const paymentIndex = i + 1
                  return (
                    <tr key={i}>
                      <td>
                        Payment # {paymentIndex}<br/>
                        <b><Moment format={"MMM D, YY"}>{e.item.date}</Moment></b> <br/>
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
              <Button id={"toggle" + props.item.invoice._id} color="primary">
                <i className="ni ni-bold-down"></i>
              </Button>
            </td>
            <td>{!props.nameClient ? 'Client Delete' : props.nameClient}</td>
            <td><Moment format={"MMM D, YY"}>{props.item.date}</Moment></td>
            <td>{props.total - props.paid === 0 ? 'Paid' : props.item.invoice.status}</td>
            <td>${parseFloat(Math.round(props.item.invoice.total * 100) / 100).toFixed(2)}</td>
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
              <Moment format={"MMM D, YY"}>{props.item.date}</Moment><br/>
              {!props.item.nameClient ? 'Client Delete' : props.item.nameClient}<br/>
              Status: <b>{props.item.invoice.total - props.paid === 0 ? 'Paid' : props.item.invoice.status}</b><br/>
              Total: <b>${parseFloat(Math.round(props.item.invoice.total * 100) / 100).toFixed(2)}</b><br/>
              Balance: <b>${parseFloat(Math.round(props.total * 100) / 100).toFixed(2)}</b><br/>
              <div className="buttonfloat-right buttonfloat-right-estimates">
                <ActionButton {...props}></ActionButton>
              </div>
              <Button id={"toggle" + props.item.invoice._id} color="primary">
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
    id:'',
    btnDropup: false,
    modal: false
  };

  constructor(props) {
    super(props);
    const {auth} = store.getState();
    loggedUser = auth.userLogged
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
    if(this.props.jobs.length === 0)
      this.props.getJobs()
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
    const {jobs} = this.props
    if (!this.state) return <p>Loading</p>
    let allInvoices=[]
    let userInEstimate 
    let client
    let id
    let jobName
    jobs.forEach((e,i)=>{
      id = e._id
      jobName = e.jobName
      userInEstimate = e.workers.filter(wx => wx.workerId && wx.workerId._id === loggedUser._id).length > 0
      client = e.clientId
      e.invoices.forEach(ex =>{
        allInvoices.push({invoice:ex, client, id, jobName, userInEstimate})
      })
    })
    jobs.forEach((e,i)=>{
      if(!e.clientId) return <th>Client Delete</th>
      if(!e.workers)return <th scope="row">Worker Delete</th>
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
                        <RowInvoice key={i} item={e}
                          isMobileVersion={this.state.isMobileVersion}
                          paid={paid}
                          invoiceIndex={invoiceIndex}
                          total={total}
                          total2={total2}
                          paidOk={paidOk}
                          nameClient={nameClient}
                          props={this.props}> </RowInvoice>
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

const mapStateToProps = state => ({
  jobs: state.job.jobs,
})

export default connect(mapStateToProps, {getJobs, removeInvoice})(Invoices);
