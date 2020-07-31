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

const ActionButton = (props) => {
  return(
    <span className="dropdownButtons">
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
                    maxHeight: '240px',
                  },
                };
              },
            },
          }}>
        <DropdownItem to={`/admin/estimates/${props._id}/invoice`} tag={Link}>Convert to Invoice</DropdownItem>
        <DropdownItem onClick={()=>{
          authService
              .convertJob(props._id)
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
              .decline(props._id)
              .then(response => {
                window.location.reload()
                console.log(response)

              })
              .catch(err => {
                console.log(err.response)
              })
        }}>Decline</DropdownItem>
        <DropdownItem to={`/admin/estimates/${props._id}/email`} tag={Link}>Send by email</DropdownItem>
        {

          loggedUser.level >= 3 ? <DropdownItem to={`/admin/estimates/${props._id}`} tag={Link}>Update</DropdownItem> :
              loggedUser.level === 2 && props.workers.filter(wx =>  wx.workerId._id === loggedUser._id).length > 0 ? <DropdownItem to={`/admin/estimates/${props._id}`} tag={Link}>Update</DropdownItem> :
                  <DropdownItem disabled to={`/admin/estimates/${props._id}`} tag={Link}>Update</DropdownItem>
        }
        {loggedUser.level >= 4 ? <DropdownItem onClick={()=>{
              authService
                  .estimateDelete(props._id)
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
    </span>
  )
}

class Estimates extends React.Component {
  state = {
    estimates:[],
    id:'',
    btnDropup: false,
    userId: false,
    isMobileVersion: false
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
    authService.convertInvoice(_id)
    .then(response => {
      this.props.history.push(`estimates`)
    }).catch(err => {
      console.log(err.response)
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
                    {
                      loggedUser.level >= 2 ?
                    <div className="col text-right">
                      <Link to="addestimate">
                        <p color="primary" size="sm">
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
                      { !this.state.isMobileVersion ?
                          <>
                            <th scope="col"></th>
                            <th scope="col">Client</th>
                            <th scope="col">Date</th>
                            <th scope="col">Status</th>
                            <th scope="col">Total</th>
                          </>
                      :
                      <th>Details</th>
                    }
                    </tr>
                  </thead>
                  <tbody >
                    {this.state.estimates.length === 0 ? <tr><td>No estimates register</td></tr>
                      :
                       this.state.estimates.map((e,i)=>{
                        let nameEstimate = e.nameEstimate
                        let subtotal = e.items.reduce((acc, current, i) => acc + current.subtotal, 0)
                        let tax = parseInt(e.tax) * subtotal / 100
                        let discount = e.discount
                        let total = !subtotal ? 0 : subtotal + tax  - discount
                        return(
                          <tr key={i}>
                            {!this.state.isMobileVersion ?
                                <>
                                  <td>
                                    <ActionButton {...e}></ActionButton>
                                  </td>
                                  <td>{nameEstimate ? nameEstimate : e.clientId.name}</td>
                                  <td><Moment format={"MMM D, YY"}>{e.dateCreate}</Moment></td>
                                  <td>{e.status === "Approve" ? "Approved" : e.status}</td>
                                  <td>${parseFloat(Math.round(total * 100) / 100).toFixed(2)}</td>
                                </>
                                :
                                <>
                                  <td>
                                    {nameEstimate ? nameEstimate : e.clientId.name}<br/>
                                    <Moment format={"MMM D, YY"}>{e.dateCreate}</Moment><br/>
                                    {e.status === "Approve" ? "Approved" : e.status}<br/>
                                    ${parseFloat(Math.round(total * 100) / 100).toFixed(2)}<br/>
                                    <div className="buttonfloat-right buttonfloat-right-estimates">
                                      <ActionButton {...e}></ActionButton>
                                    </div>
                                  </td>
                                </>
                            }
                          </tr>
                       )
                      })}
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

export default Estimates;
