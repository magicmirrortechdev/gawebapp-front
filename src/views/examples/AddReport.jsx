import React from "react";
import {  withRouter } from 'react-router-dom'
import AuthService from '../../services/services'
import axios from 'axios'


import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Button,
  FormGroup,
  Input,
  Form,
  Table,
  Badge,
  InputGroup
} from "reactstrap";
// core components
import Header from "components/Headers/Header.jsx";

const authService = new AuthService()

let date = new Date()
let day = date.getDate()
let month = date.getMonth() + 1
let year = date.getFullYear()

class AddReport extends React.Component {

  state = {

    items:[],
    jobstatus: 'Open',
    itemName: '',
    description: '',
    quantity: parseInt(''),
    rate: parseInt(''),
    subtotal: 0,
    tax: 0,
    discount: 0,
    paid: 0,
    total: 0,
    dateCreate: month<10 ? (`${day}-0${month}-${year}`):(`${day}-${month}-${year}`)
  };

  handleInput = e => {
    e.preventDefault()
    console.log(this.state);
    this.setState ({
      [e.target.name]: e.target.value
    })
    console.log(this.state);
  }

  handleSubmit = (e, props) => {
    e.preventDefault()

  }

  render() {
    let date = new Date()

    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    let product={
      itemName: this.state.itemName,
      description: this.state.description,
      quantity: parseInt(this.state.quantity),
      rate: parseInt(this.state.rate),
      subtotal: parseInt(this.state.quantity * this.state.rate),

    }


    let subtotal = this.state.items.reduce((acc, current, i) => acc + current.subtotal, 0)
    let tax = parseInt(this.state.tax) * subtotal / 100
    let discount = parseInt(this.state.discount)
    let paid = parseInt(this.state.paid)
    let dateCreate = this.state.dateCreate

    let total = subtotal + tax - discount - paid

    return (
        <>
          <Header forms={true}/>
          {/* Page content */}
          <Container className="mt--7" fluid>
            <Row className="mt-5">
              <Col className="mb-5 mb-xl-0" xl="12">
                <Card className="shadow">
                  <CardHeader className="border-0">
                    <Row className="align-items-center">
                      <div className="col">
                        <h3 className="mb-0">Create a Report</h3>
                      </div>
                      <div className="col text-right">
                        <Button color="success">Save</Button>
                      </div>
                    </Row>
                  </CardHeader>
                  <CardBody>

                    <Form onSubmit={this.handleSubmit}>
                      <div className="pl-lg-4">
                        <Row>
                          <Col md="8">
                            <FormGroup>
                              <label
                                  className="form-control-label d-inline-block"
                                  htmlFor="jobName">
                                Job name
                              </label>
                              <Input
                                  className="form-control-alternative"
                                  placeholder="Enter a job name..."
                                  name="jobName"
                                  type="text"
                                  onChange={this.handleInput}
                              />
                              <br/>
                              <label
                                  className="form-control-label d-inline-block"
                                  htmlFor="projectName">
                                Project manager
                              </label>
                              <Input
                                  className="form-control-alternative"
                                  placeholder="Enter a project manager name..."
                                  name="projectName"
                                  type="text"
                                  onChange={this.handleInput}
                              />
                              <br/>
                              <label
                                  className="form-control-label d-inline-block"
                                  htmlFor="projectName">
                                Start date
                              </label>
                              <Input
                                  name="dateStart"
                                  className="form-control-alternative"
                                  type="date"
                                  onChange={this.handleInput}
                              />
                              <label
                                  className="form-control-label d-inline-block"
                                  htmlFor="projectName">
                                Job status
                              </label>
                              <Input type="select" name="jobstatus"
                                     onClick={this.handleInput}
                                     className="form-control-alternative">
                                <option>Open</option>
                                <option>Close</option>
                              </Input>
                            </FormGroup>
                            <FormGroup>
                              <label
                                  className="form-control-label d-inline-block"
                                  htmlFor="projectName">
                                Add Estimate
                              </label>
                              <InputGroup>
                                <Input type="text" name="estimates"
                                       placeholder="Enter an invoice number..."
                                       onChange={this.handleInput}
                                       className="form-control-alternative">
                                </Input>
                                <Button color="info">
                                  Add Estimate
                                </Button>
                              </InputGroup>
                            </FormGroup>

                            <FormGroup>
                              <label
                                  className="form-control-label d-inline-block"
                                  htmlFor="projectName">
                                Add Invoice
                              </label>
                              <InputGroup>
                                <Input type="text" name="invoices"
                                       placeholder="Enter an invoice number..."
                                       onChange={this.handleInput}
                                       className="form-control-alternative">
                                </Input>
                                <Button color="info">
                                  Add Invoice
                                </Button>
                              </InputGroup>
                            </FormGroup>

                            <FormGroup>
                              <label
                                  className="form-control-label d-inline-block"
                                  htmlFor="projectName">
                                Add Expenses
                              </label>
                              <InputGroup>
                                <Input type="text" name="expenses"
                                       placeholder="Enter a job expense, date or tech name..."
                                       onChange={this.handleInput}
                                       className="form-control-alternative">
                                </Input>
                                <Button color="info">
                                  Add Expense
                                </Button>
                              </InputGroup>

                            </FormGroup>

                          </Col>
                          <Col lg="4">
                            <h4>
                              {this.state.jobName}
                            </h4>
                            <br/>
                            <Badge color={this.state.jobstatus==='Open'? "success" : "light"}>{this.state.jobstatus}</Badge>
                            <FormGroup>
                              <label
                                  className="form-control-label"
                                  htmlFor="input-first-name"
                                  style={{display:"inline-flex", alignItems:"center", }}
                              >
                                Date
                              </label>
                              <div className="text-right"> {month<10 ? (`${day}-0${month}-${year}`):(`${day}-${month}-${year}`)}</div>

                            </FormGroup>
                            <hr/>
                            <FormGroup>
                              <label
                                  className="form-control-label"
                                  htmlFor="input-first-name"
                                  style={{display:"inline-flex", alignItems:"center", }}>
                                Total estimated
                              </label>
                              <div className="text-right"> $0.00 USD</div>
                            </FormGroup>
                            <FormGroup>
                              <label
                                  className="form-control-label"
                                  htmlFor="input-tax"
                                  style={{display:"inline-flex", alignItems:"center", }}>
                                Total invoiced
                              </label>
                              <div className="text-right"> $0.00 USD</div>
                            </FormGroup>
                            <FormGroup>
                              <label
                                  className="form-control-label"
                                  htmlFor="input-first-name"
                                  style={{display:"inline-flex", alignItems:"center", }}>
                                Total expenses
                              </label>
                              <div className="text-right"> $0.00 USD</div>
                            </FormGroup>
                            <hr/>
                            <FormGroup>
                              <label
                                  className="form-control-label"
                                  htmlFor="input-first-name"
                                  style={{display:"inline-flex", alignItems:"center", }}>
                                Balance
                              </label>
                              <div className="text-right"> $0.00 USD</div>
                            </FormGroup>

                          </Col>
                        </Row>

                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </Col>

            </Row>
          </Container>
        </>
    );
  }
}

export default withRouter(AddReport);
