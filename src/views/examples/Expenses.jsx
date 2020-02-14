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
import Global from "../../global";

class Expenses extends React.Component {
  state = {
    jobs:[]
  };


  componentDidMount() {
    axios
      .get(Global.url + 'checkjobs')
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
                    <Link to="addexpense">
                      <p
                        color="primary"
                        size="sm" 
                      >
                        Add an Expense
                      </p>
                    </Link>
                      
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Merchant</th>
                      <th scope="col">Description</th>
                      <th scope="col">Category</th>
                      <th scope="col">Date</th>
                      <th scope="col">Total</th>
                      <th scope="col">Options</th>
                    </tr>
                  </thead>
                  
                    

                     {this.state.jobs.length === 0 ?  <tbody><tr><td>No expenses register</td></tr></tbody>:
                     this.state.jobs.map((e,i)=>{
                       return(
                       e.expenses.map((e,i)=>{
                        return(
                          <tbody key={i}>
                          <tr >
                          <th scope="row" >{e.merchant}</th>
                          <td>{e.description}</td>
                          <td>{e.category}</td>
                          <td>{e.date}</td>
                          <td>{e.total}</td>
                          <td>...</td>
                          </tr>                                               
                        </tbody>
                       )
                       })
                      
                      ) })}
                      
                      
                </Table>
              </Card>
            </Col>
            
          </Row>
        </Container>
      </>
    );
  }
}

export default Expenses;
