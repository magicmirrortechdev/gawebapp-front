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
let loggedUser

class Icons extends React.Component {
  state = {
    estimates:[],
    id:'',
    btnDropup: false,
    userId: false
  };

  constructor(props) {
    super(props);
    loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  }

  componentDidMount() {
    loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    if(loggedUser.level <=1){
      axios
      .get(Global.url + `checkestimates/${loggedUser._id}`)
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
    else if(loggedUser.level >=2){
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
          })
  }

  render() {
    console.log(loggedUser)
    console.log('el state',  this.state)
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
                    {
                      loggedUser.level >= 2 ?
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
                    : null
                    }
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
                                        maxHeight: '100px',
                                      },
                                    };
                                  },
                                },
                              }}
                              >
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
                                {
                                   
                                  loggedUser.level >= 3 ? <DropdownItem to={`/admin/estimates/${e._id}`} tag={Link}>Update</DropdownItem> : 
                                  loggedUser.level === 2 && e.workers.filter(wx =>  wx.workerId._id === loggedUser._id).length > 0 ? <DropdownItem to={`/admin/estimates/${e._id}`} tag={Link}>Update</DropdownItem> :
                                  <DropdownItem disabled to={`/admin/estimates/${e._id}`} tag={Link}>Update</DropdownItem>
                                }
                                {loggedUser.level >= 4 ? <DropdownItem onClick={()=>{
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
                                    className="text-danger">Delete</span>
                                </DropdownItem>
                                :null
                                }
                              </DropdownMenu>
                            </UncontrolledDropdown>
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
