import React from "react";
import { Link } from 'react-router-dom'
import axios from 'axios'
import AuthService from '../../services/services'
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
  UncontrolledDropdown,
  Form,
  FormGroup,
  Button
} from "reactstrap";
// core components
import Header from "components/Headers/Header.jsx";
import Global from "../../global";

const authService = new AuthService()
let loggedUser

class Jobs extends React.Component {
  state = {
    jobs:[],
    filter: "",
    buttonActive: '1'
  };

  constructor(props) {
    super(props);
    loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  }


  componentDidMount() {
    axios
      .get(Global.url + `openjobs`)
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
  handleInput = e => {
    e.persist()
    this.setState(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  getOpen =()=>{
    axios
      .get(Global.url + `openjobs`)
      .then(({ data }) => {
        this.setState(prevState => {
          return {
            ...prevState,
            buttonActive: "1",
            ...data
          }
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
  getClose =()=>{
    axios
      .get(Global.url + `closejobs`)
      .then(({ data }) => {
        this.setState(prevState => {
          return {
            ...prevState,
            buttonActive: "2",
            ...data
          }
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  getAll =()=>{
    axios
      .get(Global.url + `checkjobs`)
      .then(({ data }) => {
        this.setState(prevState => {
          return {
            ...prevState,
            buttonActive: "3",
            ...data
          }
        })
      })
      .catch(err => {
        console.log(err)
      })
  }


  render() {
    console.log('Aqui está el state', this.state )
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
                    <Link to="addjob">
                      <p
                        color="primary"
                        size="sm" 
                      >
                        Create Job
                      </p>
                    </Link>                      
                    </div>
                  </Row>
                </CardHeader>
                <Form className="card-header">
                  <Row form>
                                        
                    <Col md={{size: 6}}>
                        <FormGroup>
                            <label
                            className="form-control-label"
                            htmlFor="input-dateStart">
                            Filter
                             </label>
                             <br/>
                            <span>
                            <Button
                              className="form-control-alternative"
                              color={this.state.buttonActive==="1"?"info": "secondary"}
                              onClick={this.getOpen}
                            >Open</Button>
                            <Button
                              className="form-control-alternative"
                              color={this.state.buttonActive==="2"?"info": "secondary"}
                              onClick={this.getClose}
                            >Close</Button>
                            <Button
                              className="form-control-alternative"
                              color={this.state.buttonActive==="3"?"info": "secondary"}
                              onClick={this.getAll}
                            >All</Button>
                            </span>
                        </FormGroup>
                    </Col>
                                        
                  </Row>
                </Form>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">Job Name</th>
                      <th scope="col">Date Start</th>
                      <th scope="col">Date End</th>
                      <th scope="col">Worker(s)</th>
                      <th scope="col">Total</th>
                    </tr>
                  </thead>



                  {this.state.jobs.length === 0 ? <tbody>
                      <tr>
                        <td>No Jobs register</td>
                      </tr>
                      </tbody> :
                     this.state.jobs.map((e,i)=>{

                      let subtotal = e.items ? (e.items.reduce((acc, current, i) => acc + current.subtotal, 0)) : 0 ;
                      let tax = parseInt(e.tax) * subtotal / 100
                      let discount = e.discount
                      let paid = e.paid
                      let total = subtotal + tax - paid - discount
                      return(
                        <tbody key={i}>
                        {e.status === "Closed" ? <tr><th scope="row">{e.jobName}</th> <td>Closed</td></tr> :
                        <tr>
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
                                <DropdownItem to={`/admin/jobs/${e._id}/invoice`} tag={Link}>Convert to Invoice</DropdownItem>              
                                {
                                   loggedUser.level >= 3 ? <DropdownItem to={`/admin/jobs/${e._id}`} tag={Link}>Update</DropdownItem> : 
                                   loggedUser.level === 2 && e.workers.filter(wx =>  wx.workerId._id === loggedUser._id).length > 0 ? <DropdownItem to={`/admin/jobs/${e._id}`} tag={Link}>Update</DropdownItem> :
                                   <DropdownItem disabled to={`/admin/jobs/${e._id}`} tag={Link}>Update</DropdownItem>
                                 }
                                <DropdownItem to={`/admin/jobs/${e._id}/addexpense`} tag={Link}>Add Expense</DropdownItem>
                                <DropdownItem to={`/admin/jobs/addworker/${e._id}`} tag={Link}>Add Worker</DropdownItem>
                                <DropdownItem to={`/admin/jobs/addpm/${e._id}`} tag={Link}>Add Project Manager</DropdownItem>
                                <DropdownItem onClick={()=>{
                                  authService
                                      .closeJob(e._id)
                                      .then(({data}) => {
                                        alert('Job Closed')
                                        window.location.reload()
                                      })
                                      .catch(err => {
                                        console.log(err.response)
                                      })
                                }}><span
                                    >Close Job</span>
                                </DropdownItem>
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
                        <th scope="row" >{e.jobName}</th>
                        <td>{e.dateStart === "Update this field" ? "Update this field" : <Moment format={"MMM D, YY"}>{e.dateStart}</Moment>}</td>
                        <td>{e.dateEnd === "Update this field" ? "Update this field" : <Moment format={"MMM D, YY"}>{e.dateEnd}</Moment>}</td>
                        <td>{e.workers.map((e,i)=>{
                          return(
                            !e.workerId ? <p style={{fontSize:"10px"}} key={i}>Worker Delete</p> :
                            <p style={{fontSize:"10px"}} key={i}>{e.workerId.name}</p>
                          )

                        })}</td>
                        <td>${isNaN(parseFloat(Math.round(total * 100) / 100).toFixed(2))?'Check your quantities and figures in your estimate please':parseFloat(Math.round(total * 100) / 100).toFixed(2)}</td>
                        
                        </tr>
                      }


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

export default Jobs;
