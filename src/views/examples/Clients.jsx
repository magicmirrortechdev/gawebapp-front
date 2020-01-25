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

class Clients extends React.Component {
  state = {
    clients:[]
  };


  componentDidMount() {
    axios
      .get(`https://greenacorn.herokuapp.com/checkclients`)
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
                    <Link to="addclient">
                      <p
                        color="primary"
                        size="sm" 
                      >
                        Add Client
                      </p>
                    </Link>
                      
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone Number</th>
                      <th scope="col">Balance Due</th>
                      <th scope="col">Options</th>
                    </tr>
                  </thead>
                  
                    

                     {this.state.clients.length === 0 ?  <tbody><tr><td>Aún no tienes gastos registrados</td></tr></tbody>:
                     this.state.clients.map((e,i)=>{
                      return(
                        <tbody key={i}>
                        <tr >
                        <th scope="row" >{e.name}</th>
                        <td>{e.email}</td>
                        <td>{e.phone}</td>
                        <td>$0.00 USD</td>
                        <td></td>
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

export default Clients;
