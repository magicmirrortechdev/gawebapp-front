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
} from "reactstrap";
// core components
import Header from "components/Headers/Header.jsx";

class Jobs extends React.Component {
  state = {
    jobs:[]
  };


  componentDidMount() {
    axios
      .get(`http://localhost:3000/checkjobs`)
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
                    <div className="col text-right">
                    <Link to="addjob">
                      <p
                        color="primary"
                        size="sm" 
                      >
                        Create Report
                      </p>
                    </Link>
                      
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Client</th>
                      <th scope="col">Job Name</th>
                      <th scope="col">Date Start</th>
                      <th scope="col">Date End</th>
                      <th scope="col">Worker(s)</th>
                      <th scope="col">Type</th>
                      <th scope="col">Time</th>
                      <th scope="col">Options</th>
                    </tr>
                  </thead>
                  
                    

                     {this.state.jobs.length === 0 ?  <tbody><tr><td>No jobs register</td></tr></tbody>:
                     this.state.jobs.map((e,i)=>{
                      return(
                        <tbody key={i}>
                        <tr >
                        <th scope="row" >{e.nameClient}</th>
                        <td>{e.jobName}</td>
                        <td>{e.dateStart}</td>
                        <td>{e.dateEnd}</td>
                        <td>{e.worker}</td>
                        <td>Invoice</td>
                        <td>{e.invoice}</td>
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
