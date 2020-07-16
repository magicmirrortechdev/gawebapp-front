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
import Global from "../../global";
import Moment from "react-moment";
let loggedUser
loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
let times = [];
let newWorker = []

class Time extends React.Component {
  compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }

      const varA = (typeof a[key] === 'string')
          ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
          ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
          (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }

  state = {
    jobs:[]
  };
  constructor(props) {
    super(props);
    loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  }

  componentDidMount() {
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

      times = times.sort(this.compareValues('date','desc'));

      let mapWorker = []
      times.map((timeGeneral, i)=>{
        let newWorkerFilter = timeGeneral.workers.filter(wx => wx.workerId && wx.workerId._id === loggedUser._id)
        newWorkerFilter.map((worker, i) => {
          worker.time.map((time, j) =>{
            if(!mapWorker[timeGeneral.estimateId]){
              mapWorker[timeGeneral.estimateId] = true;
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
      newWorker = newWorker.sort(this.compareValues('date','desc'));
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
                      <th scope="col"></th>
                      <th scope="col">Date</th>
                      <th scope="col">Name</th>
                      <th scope="col">Hours</th>
                      <th scope="col">Job</th>
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
                            <td >
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

                              <DropdownItem to={`/admin/time/addtime/${estimateId}/${e.worker}/${e.workerId._id}`} tag={Link}>Add Hours</DropdownItem>
                              <DropdownItem to={`/admin/time/updatetime/${estimateId}/${e.worker}/${e.workerId._id}/${e.timeId}`} tag={Link}>Update Hours</DropdownItem>

                                { loggedUser.level >= 4 ?
                                  <DropdownItem onClick={()=>{
                                  axios.patch(Global.url + `workerdelete/${estimateId}/${e.worker}`, {worker: e.workerId._id})
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
                            </td>
                            <td scope="row"><Moment add={{days:1}} format={"MMM D, YY"}>{e.date}</Moment></td>
                            <td scope="row">{e.name}</td>
                            <td style={{height:"100%",paddingTop:"35px", paddingLeft:"60px", display:"flex", flexDirection:"column", alignItems:"baseline", alignContent:"center"}}>
                            {e.time}</td>
                            <td style={{height:"100%",paddingTop:"35px", paddingLeft:"60px"}} >
                                 {e.jobName}
                            </td>

                          </tr>
                        </tbody>
                         : null
                     )  
                    })}
                  {//nuevo bloque
                    loggedUser.level <= 1 ?
                        newWorker.map((e, i) => {
                          if (!e.workerId) return <th scope="row">Worker Delete</th>
                          let worker = e.workerId._id
                          return (
                            <tbody key={i}>
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
                                                      maxHeight: 100,
                                                    },
                                                  };
                                                },
                                              },
                                            }}
                                        >

                                          <DropdownItem
                                              to={`/admin/time/addtime/${e.id}/${e.worker}/${e.workerId._id}`}
                                              tag={Link}>Add Hours</DropdownItem>

                                          {loggedUser.level >= 4 ?
                                              <DropdownItem onClick={() => {
                                                axios.patch(Global.url + `workerdelete/${e.id}/${e.worker}`, {worker: worker})
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
