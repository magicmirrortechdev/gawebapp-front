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
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Job Name</th>
                      <th scope="col">Date Start</th>
                      <th scope="col">Date End</th>
                      <th scope="col">Worker(s)</th>
                      <th scope="col">Total</th>
                      <th scope="col">Options</th>
                    </tr>
                  </thead>
                  
                    

                     {this.state.jobs.length === 0 ?  <tbody><tr><td>No jobs register</td></tr></tbody>:
                     this.state.jobs.map((e,i)=>{
                      let subtotal = e.items.reduce((acc, current, i) => acc + current.subtotal, 0)
                      let tax = parseInt(e.tax) * subtotal / 100
                      let discount = e.discount
                      let paid = e.paid
                      return(
                        <tbody key={i}>
                        <tr >
                        <th scope="row" >{e.jobName}</th>
                        <td>{e.dateStart}</td>
                        <td>{e.dateEnd}</td>
                        <td>{e.workers}</td>
                        <td>${subtotal + tax - paid - discount}USD</td>
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
