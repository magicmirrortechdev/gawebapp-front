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


class Jobs extends React.Component {
  state = {
    jobs:[]
  };


  componentDidMount() {
    axios
      .get(`https://greenacorn.herokuapp.com/checkjobs`)
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
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Job Name</th>
                      <th scope="col">Date Start</th>
                      <th scope="col">Date End</th>
                      <th scope="col">Worker(s)</th>
                      <th scope="col">Total</th>
                      <th scope="col">Options</th>
                    </tr>
                  </thead>
                  
                    

                     {this.state.jobs.length === 0 ?  <tbody><tr><td>No jobs register</td></tr></tbody>:
                     this.state.jobs.map((e,i)=>{
                      let subtotal = e.items.reduce((acc, current, i) => acc + current.subtotal, 0)
                      let tax = parseInt(e.tax) * subtotal / 100
                      let discount = e.discount
                      let paid = e.paid
                      let expensesCost = parseInt(e.expenses.reduce((acc, current, i) => acc + current.total, 0))
                      return(
                        <tbody key={i}>
                        <tr >
                        <th scope="row" >{e.jobName}</th>
                        <td>{e.dateStart}</td>
                        <td>{e.dateEnd}</td>
                        <td>{e.workers}</td>
                        <td>${subtotal + tax - paid - discount + expensesCost}USD</td>
                        <td>
                        <UncontrolledDropdown>
                           <DropdownToggle>
                              ...
                          </DropdownToggle>
                          <DropdownMenu
                            modifiers={{
                                    setMaxHeight: {
                                      enabled: true,
                                      order: 890,
                                      fn: (data) => {
                                        return {
                                          ...data,
                                          styles: {
                                            ...data.styles,
                                            overflow: 'auto',
                                            maxHeight: 100,
                                          },
                                        };
                                      },
                                    },
                                  }}
                                                        >
                                                        <DropdownItem onClick={()=>{
                            authService
                              .convertInvoice(e._id)
                              .then(response => {
                                //aquí deberia ir una notificacion o un swal o un toastr
                                this.props.history.push(`invoices`)
                                console.log(response)
                                
                              })
                              .catch(err => {
                                //aquí deberia ir una notificacion o un swal o un toastr
                                console.log(err.response)
                                alert(err.response.data.msg || err.response.data.err.message)
                              })
                          }}>Convert to Invoice</DropdownItem>
                          <DropdownItem to={`/admin/jobs/${e._id}`} tag={Link}>Update</DropdownItem>
                          <DropdownItem to={`/admin/jobs/${e._id}/addexpense`} tag={Link}>Add Expense</DropdownItem>                          
                          <DropdownItem to={`/admin/jobs/addworker/${e._id}`} tag={Link}>Add Worker</DropdownItem>

                          <DropdownItem onClick={()=>{
                            authService
                              .estimateDelete(e._id)
                              .then(({data}) => {
                                alert('Job Delete')
                                window.location.reload()
                                
                              })
                              .catch(err => {
                                //aquí deberia ir una notificacion o un swal o un toastr
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

export default Jobs;
