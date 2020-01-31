import React from "react";
import {  withRouter } from 'react-router-dom'

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

let date = new Date()
let day = date.getDate()
let month = date.getMonth() + 1
let year = date.getFullYear()

class AddReport extends React.Component {

  state = {

    estimates:[],
    modalFindEstimates: false,
    invoices:[],
    modalFindInvoices: false,
    expenses:[],
    modalFindExpenses: false,
    jobstatus: 'Open',
    dateCreate: month<10 ? (`${day}-0${month}-${year}`):(`${day}-${month}-${year}`)
  };

  handleInput = e => {
    e.preventDefault()
    this.setState ({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e, props) => {
    e.preventDefault()

  }

  addEstimates = e => {
    e.preventDefault();
    this.setState({
      modalFindEstimate: true
    })
  }

  addInvoices = e => {
    e.preventDefault();

  }

  addExpenses = e => {
    e.preventDefault();
  }

  render() {
    let date = new Date()

    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()


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
                                       placeholder="Enter an estimate, client name or date..."
                                       onChange={this.handleInput}
                                       className="form-control-alternative">
                                </Input>
                                <Button color="info">
                                  Add Estimate
                                </Button>
                              </InputGroup>
                              <br/>
                              <Table bordered striped>
                                <thead>
                                  <th>Estimates</th>
                                  <th></th>
                                </thead>
                                <tbody>
                                  {this.state.estimates.length === 0 && (
                                      <tr><td  colSpan={2}>No related estimates</td></tr>
                                    )}
                                  {this.state.estimates.length > 0 && (
                                      <tr>
                                        <td>
                                        </td>
                                      </tr>
                                  )}
                                </tbody>
                              </Table>
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
                              <br/>
                              <Table bordered striped>
                                <thead>
                                <th>Invoices</th>
                                <th></th>
                                </thead>
                                <tbody>
                                {this.state.invoices.length === 0 && (
                                    <tr><td  colSpan={2}>No related invoices</td></tr>
                                )}
                                {this.state.invoices.length > 0 && (
                                    <tr>
                                      <td>
                                      </td>
                                    </tr>
                                )}
                                </tbody>
                              </Table>
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
                              <br/>
                              <Table bordered striped>
                                <thead>
                                <th>Expenses</th>
                                <th></th>
                                </thead>
                                <tbody>
                                {this.state.expenses.length === 0 && (
                                    <tr><td  colSpan={2}>No related expenses</td></tr>
                                )}
                                {this.state.expenses.length > 0 && (
                                    <tr>
                                      <td>
                                      </td>
                                    </tr>
                                )}
                                </tbody>
                              </Table>
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
