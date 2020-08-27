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
import {store} from "../../redux/store";
import {connect} from "react-redux";
import {getJobs, removeTime} from "../../redux/actions/jobAction";

let loggedUser ;
let times = [];

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
        <DropdownItem to={`/admin/time/updatetime/${props.item.estimateId}/${props.item.worker}/${props.item.workerId._id}/${props.item.timeId}`} tag={Link}>Update Hours</DropdownItem>
        { loggedUser.level >= 4 ?
            <DropdownItem onClick={()=>{
              props.props.removeTime(props.item.estimateId, props.item.workerId._id, props.item.timeId)
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
          <DropdownItem to={`/admin/time/updatetime/${props.item.estimateId}/${props.item.worker}/${props.item.workerId._id}/${props.item.timeId}`} tag={Link}>Update Hours</DropdownItem>

          {loggedUser.level >= 4 ?
              <DropdownItem onClick={() => {
                props.props.removeTime(props.item.estimateId, props.item.workerId._id, props.item.timeId)
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
    jobs:[],
    isMobileVersion: false
  };

  constructor(props) {
    super(props);
    const {auth} = store.getState();
    loggedUser = auth.userLogged
    this.loadTime = this.loadTime.bind(this)
  }

  updateWindowDimensions = () => {
    this.setState(prevState => {return {...prevState, isMobileVersion : (window.innerWidth < Global.mobileWidth) }})
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
    this.loadTime()
  }

  loadTime() {
    if(this.props.jobs.length === 0){
      if(loggedUser.level <=1) {
        this.props.getJobs(loggedUser._id)
      }else{
        this.props.getJobs();
      }
    }
  }

  render() {
    const {jobs} = this.props
    if (!this.state) return <p>Loading</p>
    else {
      times = [];
      jobs.forEach((e) => {
        let projectManager = e.projectManager.map((e,i)=> !projectManager ? <p style={{fontSize:"10px"}}>Project Manager Delete</p> : <p style={{fontSize:"10px"}} key={i}>{e.projectId.name}</p>)
        if(e.workers.length > 0){
          e.workers.forEach((worker) => {
            worker.time.forEach((time) => {
              let band = false;
              if(loggedUser.level <= 1) {
                if(worker.workerId._id === loggedUser._id) {
                  band = true
                }
              } else{
                band = true
              }

              if(band){
                times.push({
                  timeId: time._id,
                  date: time.date,
                  time: time.hours,
                  jobName: e.jobName,
                  worker: worker._id,
                  name: worker.workerId.name,
                  projectManager: projectManager,
                  estimateId: e._id,
                  workerId: worker.workerId,
                  workers: e.workers
                });
              }
            });
          })
        }
      });

      times = times.sort(compareValues('date','desc'));
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
                  {times.length === 0 ?  <tbody><tr><td>No workers register</td></tr></tbody>:
                   times.map((e,i)=>{
                       return(
                        loggedUser.level >= 2 ?
                        <tbody key={i}>
                          <tr>
                            {!this.state.isMobileVersion ?
                              <>
                                <td >
                                  <ButtonOne item={e} props={this.props}></ButtonOne>
                                </td>
                                <td><Moment add={{days:1}} format={"MMM D, YY"}>{e.date}</Moment></td>
                                <td>{e.name}</td>
                                <td style={{height:"100%",paddingTop:"35px", paddingLeft:"60px", display:"flex", flexDirection:"column", alignItems:"baseline", alignContent:"center"}}>
                                  {e.time}</td>
                                <td style={{height:"100%",paddingTop:"35px", paddingLeft:"60px"}} >
                                  <p style={{fontSize:"10px"}} key={i}>{e.jobName}</p>
                                </td>
                              </>
                              :
                              <>
                                <td>
                                  <Moment add={{days:1}} format={"MMM D, YY"}>{e.date}</Moment><br/>
                                  {e.name} - {e.time}<br/>
                                  <small>{e.jobName}</small> <br/>
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
                          if (!e.workerId) return <th scope="row">Worker Delete</th>
                          return (
                            <tbody key={i}>
                              <tr>
                                {!this.state.isMobileVersion ?
                                 <>
                                  <td>
                                    <ButtonTwo item={e} props={this.props}></ButtonTwo>
                                  </td>
                                  <td><Moment add={{days: 1}} format={"MMM D, YY"}>{e.date}</Moment></td>
                                  <td>{e.name}</td>
                                  <td style={{
                                        height: "100%",
                                        paddingTop: "35px",
                                        paddingLeft: "60px",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "baseline",
                                        alignContent: "center"
                                      }}>
                                  {e.time}</td>
                                  <td style={{height: "100%", paddingTop: "35px", paddingLeft: "60px"}}>
                                    {e.jobName}
                                  </td>
                                 </>
                                  :
                                  <>
                                    <td>
                                      <Moment add={{days: 1}} format={"MMM D, YY"}>{e.date}</Moment><br/>
                                      {e.name} - {e.time}<br/>
                                      <small>{e.jobName}</small><br/>
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
})

export default connect(mapStateToProps, {getJobs, removeTime})(Time);
