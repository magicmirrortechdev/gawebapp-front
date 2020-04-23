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


class Time extends React.Component {
  state = {
    jobs:[]
  };


  componentDidMount() {
    axios
      .get(Global.url + `checkjobs`)
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
    console.log('Aqui está el state', this.state)

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
                      <h3 className="mb-0">Employee Information</h3>
                    </div>
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
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Total Hours</th>
                      <th scope="col">Job</th>
                      <th scope="col">Options</th>
                    </tr>
                  </thead>
                  
                    

                     {this.state.jobs.length === 0 ?  <tbody><tr><td>No workers register</td></tr></tbody>:
                     this.state.jobs.map((e,i)=>{
                       let jobName = <p style={{fontSize:"10px"}} key={i}>{e.jobName}</p>
                       let projectManager = e.projectManager.map((e,i)=>!projectManager ? <p style={{fontSize:"10px"}}>Project Manager Delete</p> : <p style={{fontSize:"10px"}} key={i}>{e.projectId.name}</p>)
                       let estimateId = e._id                       
                      return(
                        e.workers.map((e,i)=>{
                        let time = <p style={{fontSize:"10px"}}>{e.time.reduce((acc, current, i) => acc + current.hours, 0) ?e.time.reduce((acc, current, i) => acc + current.hours, 0) : e.time.reduce((acc, current, i) => acc + current, 0)}</p>

                          if(!e.workerId)return <th scope="row">Worker Delete</th>
                          let worker = e.workerId._id
                          console.log(time)
                          return(
                        <tbody key={i}>
                        <tr>
                        <th scope="row">{e.workerId.name}</th>
                        <td style={{height:"100%",paddingTop:"35px", paddingLeft:"60px", display:"flex", flexDirection:"column", alignItems:"baseline", alignContent:"center"}}>
                        {time}</td>
                        <td style={{height:"100%",paddingTop:"35px", paddingLeft:"60px"}} >
                             {jobName}
                        </td>                        
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
                                            maxHeight: 100,
                                          },
                                        };
                                      },
                                    },
                                  }}
                                                        >
                          
                          <DropdownItem to={`/admin/time/addtime/${estimateId}/${e._id}/${e.workerId._id}`} tag={Link}>Add Hours</DropdownItem>

                          <DropdownItem onClick={()=>{
                            axios.patch(Global.url + `workerdelete/${estimateId}/${e._id}`, {worker: worker})
                              .then(({data}) => {
                                
                                window.location.reload()
                                alert('Worker Removed')                               
                              })
                              .catch(err => {
                                console.log(err.response)
                              })
                          }}><span
                                  className="text-danger">Delete</span></DropdownItem>
                          </DropdownMenu>
                          </UncontrolledDropdown>
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

export default Time;
