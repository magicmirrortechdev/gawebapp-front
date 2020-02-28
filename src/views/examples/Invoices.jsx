import React from "react";
import axios from 'axios'
import AuthService from '../../services/services'
import { Link } from "react-router-dom";

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

const authService = new AuthService()

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
                      <th scope="col">Client</th>
                      <th scope="col">Date</th>
                      <th scope="col">Status</th>
                      <th scope="col">Total</th>
                      <th scope="col">Balance</th>
                      <th scope="col">Options</th>
                    </tr>
                  </thead>
                  {this.state.estimates.length === 0 ?  <tbody><tr><td>No invoices register</td></tr></tbody>:
                     this.state.estimates.map((e,i)=>{
                      const client = e.clientId.name
                      const id = e._id
                      const jobName = e.jobName
                      
                      return(
                        e.invoices.map((e,i) =>{
                          const invoiceIndex = i + 1
                          const paid = e.payment.reduce((acc, current, i) => acc + current.paid, 0)
                          const total = e.total
                          const paidAcc = e.payment.map((e,i)=>{
                            let sum = 0
                              sum += e.paid||0
                            
                            
                            return sum
                          })
                          const paidOk = this.sum(paidAcc)
                          
                          return(
                            <tbody key={i}>
                        <tr>
                        <td>
                          <Button id={"toggle" + i} color="primary"><i className="ni ni-bold-down"></i></Button>
                        </td>
                        <th scope="row" >{client}</th>
                        <td>{e.date}</td>
                        <td>{e.total-paid === 0 ? 'Paid' : e.status}</td>
                        <td>${e.total}USD</td> 
                        <td>${e.total - paid}USD</td>                       
                        <td>
                          <div className="dropdownButtons">
                            <UncontrolledDropdown>
                              <DropdownToggle>
                                ...
                              </DropdownToggle>
                              <DropdownMenu>{
                                 e.total - paid === 0 ? <DropdownItem disabled to={`/admin/invoices/${id}/${e._id}`} tag={Link}>Accept Payment</DropdownItem> :
                                <DropdownItem to={`/admin/invoices/${e._id}/${id}`} tag={Link}>Accept Payment</DropdownItem>
                              }
                                <DropdownItem>Send by email</DropdownItem>
                                <DropdownItem onClick={()=>{
                                  axios.patch(Global.url + `invoicedelete/${id}/${e._id}`)
                                  .then(({data})=>{
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
                        </tr>
                        <tr>
                            <td colSpan={7}>
                            <UncontrolledCollapse toggler={"#toggle" + i}>
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
                                                            <td>{e.date}</td>
                                                            <td align="right">$ {e.paid} USD</td>
                                                            <td align="right">$ {total - paidOk[i]}USD</td>
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