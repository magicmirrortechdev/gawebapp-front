import React from "react";
import { Link } from 'react-router-dom'
import axios from 'axios'
import Moment from 'react-moment'

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
                      <th scope="col">Description</th>
                      <th scope="col">Category</th>
                      <th scope="col">Date</th>
                      <th scope="col">Total</th>
                      <th scope="col">Options</th>
                    </tr>
                  </thead>
                  
                    

                     {this.state.jobs.length === 0 ?  <tbody><tr><td>No expenses register</td></tr></tbody>:
                     this.state.jobs.map((e,i)=>{
                       const estimateId = e._id
                       return(
                       e.expenses.map((e,i)=>{
                        return(
                          <tbody key={i}>
                          <tr >
                          <th scope="row" >{e.description}</th>
                          <td>{e.category}</td>
                          <td>
                          <Moment format={"YYYY-MM-DD"}>
                          {e.date}
                          </Moment>
                          </td>
                          <td>$ {parseFloat(Math.round(e.total * 100) / 100).toFixed(2)} USD</td>
                          <td>
                            <div className="dropdownButtons">
                            <UncontrolledDropdown>
                              <DropdownToggle>
                                ...
                              </DropdownToggle>
                              <DropdownMenu>
                                <DropdownItem to={`/admin/expenses/${estimateId}/${e._id}/update`} tag={Link}>Update</DropdownItem>
                                <DropdownItem onClick={()=>{
                                  axios.patch(Global.url + `expensedelete/${estimateId}/${e._id}`)
                                  .then(({data})=>{
                                    alert('Expense Delete')
                                        window.location.reload()
                                  })
                                  .catch(err => {
                                    console.log(err.response)
                                  })
                                }}><span
                                    className="text-danger">Delete</span></DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </div>
                          </td>
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
