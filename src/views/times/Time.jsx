import React from "react";
import { Link } from 'react-router-dom'

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
import Global, {compareValues} from "../../global";
import Moment from "react-moment";
import {connect} from "react-redux";
import {getTimes, removeTime} from "../../redux/actions/timeAction";
import configureStore from "../../redux/store";
import {getJobs} from "../../redux/actions/jobAction";
import {getUsers} from "../../redux/actions/userAction";
const {store} = configureStore();

let loggedUser ;

const ButtonOne = (props) => {
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
                    maxHeight: 130,
                  },
                };
              },
            },
          }}>
        <DropdownItem to={`/admin/time/updatetime/${props.item._id}`} tag={Link}>Update Hours</DropdownItem>
        { loggedUser.level >= 4 ?
            <DropdownItem onClick={()=>{
              props.props.removeTime(props.item._id)
              alert("Time was removed");
            }}><span
                className="text-danger">Delete</span>
            </DropdownItem>
            : null
        }

      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

const ButtonTwo = (props) => {
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
                      maxHeight: 100,
                    },
                  };
                },
              },
            }}>
          <DropdownItem to={`/admin/time/updatetime/${props.item.id}`} tag={Link}>Update Hours</DropdownItem>

          {loggedUser.level >= 4 ?
              <DropdownItem onClick={() => {
                props.props.removeTime(props.item.id)
                alert("Time was removed");
              }}><span
                  className="text-danger">Delete</span>
              </DropdownItem>
              : null
          }

        </DropdownMenu>
      </UncontrolledDropdown>
  )
}

class Time extends React.Component {

  state = {
    times:[],
    isMobileVersion: false
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
    await this.props.getTimes(loggedUser._id)
  }

  render() {
    let {times, users, jobs} = this.props
    if (!this.state) return <p>Loading</p>

    if(times){
      times = times.sort(compareValues('date','desc'));
    }else{
      times = []
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
                      <h3 className="mb-0">Employee Information</h3>
                    </div>
                    {
                    loggedUser.level >= 1 ?
                    <div className="col text-right">
                    <Link to="addtime">
                      <p color="primary" size="sm">
                        Add Time
                      </p>
                    </Link>

                    </div>
                    :null
                    }
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      { !this.state.isMobileVersion ?
                        <>
                          <th scope="col"></th>
                          <th scope="col">Date</th>
                          <th scope="col">Name</th>
                          <th scope="col">Hours</th>
                          <th scope="col">Job</th>
                        </>
                      :
                      <th>Details</th>
                      }
                    </tr>
                  </thead>
                  {times.length === 0 ?  <tbody><tr><td>No times register</td></tr></tbody>:
                   times.map((e,i)=>{
                     let user = users.filter(user => user._id === e.userId)[0]
                     if(user){
                       user.name = user.name ? user.name : ''
                     }else{
                       user = {name : ''}
                     }
                     const job = jobs.filter(job => job._id === e.jobId)[0]
                     return(
                        loggedUser.level >= 2 ?
                        <tbody key={i}>
                          <tr>
                            {!this.state.isMobileVersion ?
                              <>
                                <td>
                                  <ButtonOne item={e} props={this.props}></ButtonOne>
                                </td>
                                <td><Moment add={{days:1}} format={"MMM D, YY"}>{e.date}</Moment></td>
                                <td>{user.name}</td>
                                <td style={{height:"100%",paddingTop:"35px", paddingLeft:"60px", display:"flex", flexDirection:"column", alignItems:"baseline", alignContent:"center"}}>
                                  {e.hours? e.hours : '-'}
                                  </td>
                                <td style={{height:"100%",paddingTop:"35px", paddingLeft:"60px"}} >
                                  <p style={{fontSize:"10px"}} key={i}>{job.jobName}</p>
                                </td>
                              </>
                              :
                              <>
                                <td>
                                  <Moment add={{days:1}} format={"MMM D, YY"}>{e.date}</Moment><br/>
                                  {user.name} - {e.hours? e.hours : '-'}<br/>
                                  <small>{job.jobName}</small> <br/>
                                  <div className="buttonfloat-right buttonfloat-right-times">
                                    <ButtonOne item={e} props={this.props}></ButtonOne>
                                  </div>
                                </td>
                              </>
                            }
                          </tr>
                        </tbody>
                         : null
                     )
                    })}
                  {//nuevo bloque
                    loggedUser.level <= 1 ?
                        times.map((e, i) => {
                          let user = users.filter(user => user._id === e.userId)[0]
                          if(user){
                            user.name = user.name ? user.name : ''
                          }else{
                            user = {name : ''}
                          }
                          const job = jobs.filter(job => job._id === e.jobId)[0]
                          if (!e.userId) return <th scope="row">Worker Delete</th>
                          return (
                            <tbody key={i}>
                              <tr>
                                {!this.state.isMobileVersion ?
                                 <>
                                  <td>
                                    <ButtonTwo item={e} props={this.props}></ButtonTwo>
                                  </td>
                                  <td><Moment add={{days: 1}} format={"MMM D, YY"}>{e.date}</Moment></td>
                                  <td>{user.name}</td>
                                  <td style={{
                                        height: "100%",
                                        paddingTop: "35px",
                                        paddingLeft: "60px",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "baseline",
                                        alignContent: "center"
                                      }}>
                                  {e.hours ? e.hours : '-'}</td>
                                  <td style={{height: "100%", paddingTop: "35px", paddingLeft: "60px"}}>
                                    {job.jobName}
                                  </td>
                                 </>
                                  :
                                  <>
                                    <td>
                                      <Moment add={{days: 1}} format={"MMM D, YY"}>{e.date}</Moment><br/>
                                      {e.userId.name} - {e.hours ? e.hours : '-'}<br/>
                                      <small>{e.jobId.name}</small><br/>
                                      <div className="buttonfloat-right buttonfloat-right-times">
                                        <ButtonTwo item={e} props={this.props}></ButtonTwo>
                                      </div>
                                    </td>
                                  </>
                                }
                              </tr>
                            </tbody>
                          )
                        })
                      : null
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

const mapStateToProps = state => ({
  jobs: state.job.jobs,
  times: state.time.times,
  users: state.user.users
})

export default connect(mapStateToProps, {getUsers, getTimes, getJobs, removeTime})(Time);
