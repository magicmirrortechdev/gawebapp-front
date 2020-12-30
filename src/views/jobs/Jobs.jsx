import React from "react";
import { Link } from 'react-router-dom'
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
import Global, {compareValues} from "../../global";
import {connect} from "react-redux";
import {getJobs, closeJob, removeJob, convertJob} from "../../redux/actions/jobAction";
import {getUsers} from "../../redux/actions/userAction";
import configureStore from "../../redux/store";
const {store} = configureStore();

let loggedUser
const ActionButton = (props) => {
  return (
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
                  maxHeight: '280px',
                },
              };
            },
          },
        }}>
        <DropdownItem to={`/admin/jobs/${props.item._id}/invoice`} tag={Link}>Convert to Invoice</DropdownItem>
        <DropdownItem onClick={()=>{
          props.props.convertJob(props.item._id, props.item)
          alert('Job Open Again')
        }}>
          <span>Open Job</span>
        </DropdownItem>
        {loggedUser.level >= 4 ?
          <DropdownItem onClick={()=>{
            props.props.removeJob(props.item._id)
            alert('Job Delete')
          }}>
            <span className="text-danger">Delete</span>
          </DropdownItem>
          : null
        }
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

const ActionButton2 = (props) => {
  return (
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
                    maxHeight: '280px',
                  },
                };
              },
            },
          }}>
          <DropdownItem to={`/admin/jobs/${props.item._id}/invoice`} tag={Link}>Convert to Invoice</DropdownItem>
          {
            loggedUser.level >= 3 ?
                <DropdownItem to={`/admin/jobs/${props.item._id}`} tag={Link}>Update</DropdownItem> :
                loggedUser.level === 2 && props.item.workers.filter(wx =>  wx.workerId._id === loggedUser._id).length > 0 ?
                  <DropdownItem to={`/admin/jobs/${props.item._id}`} tag={Link}>Update</DropdownItem> :
                  <DropdownItem disabled to={`/admin/jobs/${props.item._id}`} tag={Link}>Update</DropdownItem>
          }
          <DropdownItem to={`/admin/jobs/${props.item._id}/addexpense`} tag={Link}>Add Expense</DropdownItem>
          <DropdownItem to={`/admin/jobs/addworker/${props.item._id}`} tag={Link}>Add Worker</DropdownItem>
          <DropdownItem to={`/admin/jobs/addpm/${props.item._id}`} tag={Link}>Add Project Manager</DropdownItem>
          <DropdownItem onClick={()=>{
            props.props.closeJob(props.item._id, props.item)
            alert('Job Closed')
          }}><span>Close Job</span>
          </DropdownItem>
          {loggedUser.level >= 4 ?
            <DropdownItem onClick={()=>{
              props.props.removeJob(props.item._id)
                alert('Job Delete')
            }}>
              <span className="text-danger">Delete</span>
            </DropdownItem>
            : null
          }
        </DropdownMenu>
      </UncontrolledDropdown>
  )
}

class Jobs extends React.Component {
  state = {
    filter: "",
    buttonActive: '1'
  };

  constructor(props) {
    super(props);
    const {auth} = store.getState();
    loggedUser = auth.userLogged
  }

  updateWindowDimensions = () => {
    this.setState(prevState => {return {...prevState, isMobileVersion : (window.innerWidth < Global.mobileWidth) }})
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  async componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
    await this.props.getUsers()
    if(loggedUser.level <=1) {
      await this.props.getJobs(loggedUser._id)
    }else{
      await this.props.getJobs();
    }
  }

  handleInput = e => {
    e.persist()
    this.setState(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  getOpen =()=>{
    this.setState(prevState => {
      return {
        ...prevState,
        buttonActive: "1",
      }
    })
  }
  getClose =()=>{
    this.setState(prevState => {
      return {
        ...prevState,
        buttonActive: "2",
      }
    })
  }

  getAll =()=>{
    this.setState(prevState => {
      return {
          ...prevState,
          buttonActive: "3",
      }
    })
  }

  render() {
    const {jobs, users} = this.props;
    let jobsFilter = [];
    if (!this.state) return <p>Loading</p>
    switch(this.state.buttonActive){
      case '1':
        jobsFilter = jobs.filter(job => job.status === 'Approve' && job.isJob)
        break;
      case '2':
        jobsFilter = jobs.filter(job => job.status === 'Closed'  && job.isJob)
        break;
      default:
        jobsFilter = jobs.filter(job => job.isJob)
        break;
    }

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
                      <p color="primary" size="sm" >
                        Create Job
                      </p>
                    </Link>
                    </div>
                  </Row>
                </CardHeader>
                <Form className="card-header">
                  <Row form>
                    <Col md={{size: 12}}>
                      <FormGroup>
                        <label className="form-control-label" htmlFor="input-dateStart">
                        Filter
                        </label>
                        <br/>
                        <span>
                          <Button
                            className="form-control-alternative"
                            color={this.state.buttonActive==="1"?"info": "secondary"}
                            onClick={this.getOpen}>
                          {!this.state.isMobileVersion ? 'Open' : <small>Open</small>}</Button>
                          <Button
                            className="form-control-alternative"
                            color={this.state.buttonActive==="2"?"info": "secondary"}
                            onClick={this.getClose}>
                          {!this.state.isMobileVersion ? 'Close' : <small>Close</small>}</Button>
                          <Button
                            className="form-control-alternative"
                            color={this.state.buttonActive==="3"?"info": "secondary"}
                            onClick={this.getAll}>
                          {!this.state.isMobileVersion ? 'All' : <small>All</small>}</Button>
                        </span>
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      {!this.state.isMobileVersion ?
                        <>
                          <th scope="col"></th>
                          <th scope="col">Job Name</th>
                          <th scope="col">Date Start</th>
                          <th scope="col">Date End</th>
                          <th scope="col">Worker(s)</th>
                          <th scope="col">Total</th>
                        </>
                        :
                        <>
                          <th scope="col">Details</th>
                        </>
                      }
                    </tr>
                  </thead>
                  <tbody>
                    {jobsFilter.length === 0 ?
                    <tr>
                      <td>No Jobs register</td>
                    </tr>
                    :
                    jobsFilter.map((e,i)=>{
                      let subtotal = e.items ? (e.items.reduce((acc, current, i) => acc + current.subtotal, 0)) : 0 ;
                      let tax = parseInt(e.estimateTax) * subtotal / 100
                      let discount = e.estimateDiscount
                      let paid = e.estimatePaid
                      let total = subtotal + tax - paid - discount
                      return(
                        <>
                        {e.status === "Closed" ?
                          <tr key={e._id}>
                            {!this.state.isMobileVersion ?
                              <>
                                <td>
                                  <ActionButton item={e} props={this.props} ></ActionButton>
                                </td>
                                <td>{e.jobName} - {e.jobAddress} </td>
                                <td>Closed</td>
                              </>
                              :
                              <>
                                <td>
                                  {e.jobName} - {e.jobAddress}<br/>
                                  Closed<br/>
                                  <div className="buttonfloat-right buttonfloat-right-estimates">
                                    <ActionButton item={e} props={this.props} ></ActionButton>
                                  </div>
                                </td>
                              </>
                            }
                          </tr>
                          :
                          <tr key={i}>
                            {!this.state.isMobileVersion ?
                              <>
                                <td>
                                  <ActionButton2 item={e} props={this.props}></ActionButton2>
                                </td>
                                <td>{e.jobName} - {e.jobAddress}</td>
                                <td>{e.dateStart === "Update this field" ? "Update this field" : <Moment format={"MMM D, YY"}>{e.dateStart}</Moment>}</td>
                                <td>{e.dateEnd === "Update this field" ? "Update this field" : <Moment format={"MMM D, YY"}>{e.dateEnd}</Moment>}</td>
                                <td>{e.workers.map((e,i)=>{
                                  const user = users.filter(user => user._id === e.workerId )
                                  return(
                                    !user[0] ? <p style={{fontSize:"10px"}} key={i}>Worker Delete</p> :
                                        <p style={{fontSize:"10px"}} key={i}>{user[0].name}</p>
                                  )
                                  })}
                                </td>
                                <td>${isNaN(parseFloat(Math.round(total * 100) / 100).toFixed(2))?'Check your quantities and figures in your estimate please':parseFloat(Math.round(total * 100) / 100).toFixed(2)}</td>
                              </>
                              :
                              <>
                                <td>
                                  {e.dateStart === "Update this field" ? "Update " : <Moment format={"MMM D, YY"}>{e.dateStart}</Moment>} - {e.dateEnd === "Update this field" ? "Update " : <Moment format={"MMM D, YY"}>{e.dateEnd}</Moment>}<br/>
                                  <small>{e.jobName} - {e.jobAddress}</small><br/>
                                  {e.workers.map((worker,i)=>{
                                    const user = users.filter(user => user._id === e.workerId )
                                    return(
                                        !user[0] ? <span>Worker Delete</span> :
                                            <span> {user[0].name} {i === e.workers.length-1? '': ','}  </span>
                                    )
                                  })}<br/>
                                  <b>${isNaN(parseFloat(Math.round(total * 100) / 100).toFixed(2))?'Check your quantities and figures in your estimate please':parseFloat(Math.round(total * 100) / 100).toFixed(2)}</b><br/>
                                  <div className="buttonfloat-right buttonfloat-right-jobs">
                                    <ActionButton2 item={e} props={this.props}></ActionButton2>
                                  </div>
                                </td>
                              </>
                            }
                          </tr>
                      }
                      </>
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
  users: state.user.users
})

export default connect(mapStateToProps, {getUsers, getJobs, closeJob, removeJob, convertJob})(Jobs);
