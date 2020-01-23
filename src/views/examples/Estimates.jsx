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
  Dropdown,
  DropdownToggle,
  Media,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
// core components
import Header from "components/Headers/Header.jsx";



class Icons extends React.Component {
  state = {
    estimates:[]
  };

  componentDidMount() {
    axios
      .get(`http://localhost:3000/checkestimates`)
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
                    <Link to="addestimate">
                      <p
                        color="primary"
                        size="sm" 
                      >
                        Add Estimate
                      </p>
                    </Link>
                      
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Client</th>
                      <th scope="col">Date</th>
                      <th scope="col">Status</th>
                      <th scope="col">Total</th>
                      <th scope="col">Options</th>
                    </tr>
                  </thead>
                  {this.state.estimates.length === 0 ?  <tbody><tr><td>No estimates register</td></tr></tbody>:
                     this.state.estimates.map((e,i)=>{
                      return(
                        <tbody key={i}>
                        <tr >
                        <th scope="row" >{e.clientId.name}</th>
                        <td>{e.dateCreate}</td>
                        <td>{e.status}</td>
                        <td>{e.total}</td>
                        <td>
                        <Dropdown position="absolute" direction="up" isOpen={this.state.btnDropup} toggle={() => { this.setState({ btnDropup: !this.state.btnDropup }); }}>
                        <DropdownToggle className="pr-0" nav >
                        <Media className="align-items-center">
                    <Media className="ml-2 d-none d-lg-block">
                      <span className="mb-0 mt-0 text-sm font-weight-bold">
                        ...
                      </span>
                    </Media>
                  </Media>
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
                          <DropdownItem onClick={()=>{}}>Convert to Invoice</DropdownItem>
                          <DropdownItem>Approve</DropdownItem>
                          <DropdownItem>Decline</DropdownItem>
                          <DropdownItem>Sent Email</DropdownItem>
                          <DropdownItem>Update</DropdownItem>
                          <DropdownItem>Delete</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                        </td>
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



export default Icons;
