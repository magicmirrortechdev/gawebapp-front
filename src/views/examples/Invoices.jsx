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
  DropdownItem
} from "reactstrap";
// core components
import Header from "components/Headers/Header.jsx";
import Global from "../../global";

const authService = new AuthService()

class Invoices extends React.Component {
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
                      <th scope="col">Client</th>
                      <th scope="col">Date</th>
                      <th scope="col">Status</th>
                      <th scope="col">Total</th>
                      <th scope="col">Options</th>
                    </tr>
                  </thead>
                  {this.state.estimates.length === 0 ?  <tbody><tr><td>No invoices register</td></tr></tbody>:
                     this.state.estimates.map((e,i)=>{
                      const client = e.clientId.name
                      return(
                        e.invoices.map((e,i) =>{
                          return(
                            <tbody key={i}>
                        <tr >
                        <th scope="row" >{client}</th>
                        <td>{e.date}</td>
                        <td>{e.status}</td>
                        <td>${e.total}USD</td>                       
                        <td>
                          <div className="dropdownButtons">
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
                                      .invoiceDelete(e._id)
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
                          </div>
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