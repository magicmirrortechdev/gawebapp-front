import React from "react";
import { Link } from 'react-router-dom'
import axios from 'axios'

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

let loggedUser ;
let times = [];
let newWorker = []

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

        <DropdownItem to={`/admin/time/addtime/${props.estimateId}/${props.worker}/${props.workerId._id}`} tag={Link}>Add Hours</DropdownItem>
        <DropdownItem to={`/admin/time/updatetime/${props.estimateId}/${props.worker}/${props.workerId._id}/${props.timeId}`} tag={Link}>Update Hours</DropdownItem>

        { loggedUser.level >= 4 ?
            <DropdownItem onClick={()=>{
              axios.patch(Global.url + `deletetime/${props.estimateId}/${props.workerId._id}/${props.timeId}`, {}).then(({data}) => {
                window.location.reload()
                alert('Time Removed')
              })
                  .catch(err => {
                    console.log(err.response)
                  })
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

          <DropdownItem
              to={`/admin/time/addtime/${props.id}/${props.worker}/${props.workerId._id}`}
              tag={Link}>Add Hours</DropdownItem>
          <DropdownItem to={`/admin/time/updatetime/${props.id}/${props.worker}/${props.workerId._id}/${props.timeId}`} tag={Link}>Update Hours</DropdownItem>

          {loggedUser.level >= 4 ?
              <DropdownItem onClick={() => {
                axios.patch(Global.url + `deletetime/${props.id}/${props.workerId._id}/${props.timeId}`, {})
                    .then(({data}) => {

                      window.location.reload()
                      alert('Worker Removed')
                    })
                    .catch(err => {
                      console.log(err.response)
                    })
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
    loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  }

  updateWindowDimensions = () => {
    this.setState(prevState => {return {...prevState, isMobileVersion : (window.innerWidth < 768) }})
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
      .get(Global.url + `checkjobs/${loggedUser._id}`)
      .then(({ data }) => {
        this.setState(prevState => {
          console.log(data)
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
      .get(Global.url + `checkjobs`)
      .then(({ data }) => {
        console.log(data)
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

  render() {

    if (!this.state) return <p>Loading</p>
    else {
      times = [];
      this.state.jobs.map((e,i) => {
        let projectManager = e.projectManager.map((e,i)=> !projectManager ? <p style={{fontSize:"10px"}}>Project Manager Delete</p> : <p style={{fontSize:"10px"}} key={i}>{e.projectId.name}</p>)
        if(e.workers.length > 0){
          e.workers.map((worker, i ) => {
            worker.time.map((time, i) => {
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
            });
          })
        }
      });

      times = times.sort(compareValues('date','desc'));

      let mapWorker = []
      times.map((timeGeneral, i)=>{
        let newWorkerFilter = timeGeneral.workers.filter(wx => wx.workerId && wx.workerId._id === loggedUser._id)
        newWorkerFilter.map((worker, i) => {
          worker.time.map((time, j) =>{
            if(!mapWorker[timeGeneral.timeId]){
              mapWorker[timeGeneral.timeId] = true;
              newWorker.push({
                id: timeGeneral.estimateId,
                date: time.date,
                time: time.hours,
                jobName: timeGeneral.jobName,
                worker: worker._id,
                name: worker.workerId.name,
                workerId: worker.workerId,
              })
            }
          });
        });
      });
      newWorker = newWorker.sort(compareValues('date','desc'));
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
                    loggedUser.level >= 2 ?
                    <div className="col text-right">
                    <Link to="addtime">
                      <p
                        color="primary"
                        size="sm" 
                      >
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
                       let jobName = <p style={{fontSize:"10px"}} key={i}>{e.jobName}</p>
                       let projectManager = e.projectManager
                       let estimateId = e.estimateId
                       return(
                        loggedUser.level >= 2 ?
                        <tbody key={i}>
                          <tr>
                            {!this.state.isMobileVersion ?
                                <>
                                  <td >
                                    <ButtonOne {...e}></ButtonOne>
                                  </td>
                                  <td scope="row"><Moment add={{days:1}} format={"MMM D, YY"}>{e.date}</Moment></td>
                                  <td scope="row">{e.name}</td>
                                  <td style={{height:"100%",paddingTop:"35px", paddingLeft:"60px", display:"flex", flexDirection:"column", alignItems:"baseline", alignContent:"center"}}>
                                    {e.time}</td>
                                  <td style={{height:"100%",paddingTop:"35px", paddingLeft:"60px"}} >
                                    {e.jobName}
                                  </td>
                                </>
                              :
                              <>
                                <td>
                                  <Moment add={{days:1}} format={"MMM D, YY"}>{e.date}</Moment><br/>
                                  {e.name} - {e.time}<br/>
                                  <small>{e.jobName}</small> <br/>
                                  <ButtonOne {...e}></ButtonOne>
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
                        newWorker.map((e, i) => {
                          if (!e.workerId) return <th scope="row">Worker Delete</th>
                          return (
                            <tbody key={i}>
                              <tr>
                                {!this.state.isMobileVersion ?
                                 <>
                                  <td>
                                    <ButtonTwo {...e}></ButtonTwo>
                                  </td>
                                  <td scope="row"><Moment add={{days: 1}} format={"MMM D, YY"}>{e.date}</Moment></td>
                                  <td scope="row">{e.name}</td>
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
                                      <ButtonTwo {...e}></ButtonTwo>
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

export default Time;
