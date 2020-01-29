import React from "react";
import {Link} from 'react-router-dom'
import axios from 'axios'

import {
    Card,
    CardHeader,
    Container,
    Row,
    Col,
    Table,
    Input,
    Form,
    Button,
    FormGroup,
    UncontrolledCollapse
} from "reactstrap";
// core components
import Header from "components/Headers/Header.jsx";
import Global from "../../global";
import CardBody from "reactstrap/es/CardBody";

class Reports extends React.Component {
    state = {
        jobs: []
    };

    handleSubmit() {

    }

    componentDidMount() {
        axios.get(Global.url + `checkjobs`)
            .then(({data}) => {
                console.log(data);
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
                <Header/>
                {/* Page content */}
                <Container className="mt--7" fluid>
                    <Row className="mt-5">
                        <Col className="mb-5 mb-xl-0" xl="12">
                            <Card className="shadow">
                                <CardHeader className="border-0">
                                    <Row className="align-items-center">
                                        <div className="col">
                                            <h3 className="mb-0">Reports</h3>
                                        </div>
                                        <div className="col text-right">
                                            <Link to="addreport">
                                                <p  color="primary"
                                                    size="sm">
                                                    Create a Report
                                                </p>
                                            </Link>

                                        </div>
                                    </Row>
                                </CardHeader>

                                <Form className="card-header">
                                    <Row form>
                                        <Col md={2}>
                                            <FormGroup >
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-dateStart">
                                                    From Date
                                                </label>
                                                <Input
                                                    name="dateStart"
                                                    className="form-control-alternative"
                                                    type="date"
                                                    onChange={this.handleSubmit}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={2}>
                                            <FormGroup >
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-dateStart">
                                                    Up to Date
                                                </label>
                                                <Input
                                                    name="dateStart"
                                                    className="form-control-alternative"
                                                    type="date"
                                                    onChange={this.handleSubmit}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={{size:3, offset:5}} >
                                            <FormGroup >
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-dateStart">
                                                    Filter
                                                </label>
                                                <Input type="select" name="filter"
                                                       onChange={this.handleSubmit}
                                                       className="form-control-alternative">
                                                    <option>Project Manager</option>
                                                    <option>Job Name</option>
                                                    <option>Start Date</option>
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Form>

                                <Table className="align-items-center table-flush" responsive>
                                    <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Job Name</th>
                                        <th scope="col">Total Paid</th>
                                        <th scope="col">Total A/R</th>
                                        <th scope="col">Total Invoices</th>
                                        <th scope="col">Labor</th>
                                        <th scope="col">Expenses</th>
                                        <th scope="col">Profit</th>
                                    </tr>
                                    </thead>


                                    {this.state.jobs.length === 0 ? <tbody>
                                        <tr>
                                            <td>No Jobs register</td>
                                        </tr>
                                        </tbody> :
                                        this.state.jobs.map((e, i) => {

                                            let totalInvoices = e.expenses ? (e.expenses.reduce((acc, current, i) => acc + current.total, 0)) : 0 ;
                                            let totalLabor = e.expenses ? (e.expenses.reduce((acc, current, i) => acc + current.total, 0)) : 0 ;
                                            let totalExpenses = e.expenses ? (e.expenses.reduce((acc, current, i) => acc + current.total, 0)) : 0 ;
                                            let totalAR = e.paid - totalExpenses + totalInvoices - e.total;
                                            return (
                                                <tbody key={i}>
                                                    <tr>
                                                        <td>
                                                            <Button id={"toggle"+i} color="primary"><i className="ni ni-bold-down"></i></Button>
                                                        </td>
                                                        <td>{e.jobName}</td>
                                                        <td>{e.paid} USD</td>
                                                        <td>${totalAR} ISD</td>
                                                        <td>${totalInvoices } USD</td>
                                                        <td>${totalLabor} USD</td>
                                                        <td>${totalExpenses} USD</td>

                                                    </tr>
                                                    <tr>
                                                        <td colSpan={7}>
                                                            <UncontrolledCollapse toggler={"#toggle"+i}>
                                                                <Card>
                                                                    <CardBody>
                                                                        <h3>- Invoices</h3>
                                                                        <Table className="align-items-center table-flush col-md-6 col-xs-12" responsive>
                                                                            <thead className="thead-light">
                                                                            <tr>
                                                                                <th scope="col">Date</th>
                                                                                <th scope="col">Sent by</th>
                                                                                <th scope="col">Total</th>
                                                                                <th scope="col">Paid</th>
                                                                            </tr>
                                                                            </thead>
                                                                        </Table>

                                                                        <h3>- Labor</h3>
                                                                        <Table className="align-items-center table-flush col-md-6 col-xs-12" responsive>
                                                                            <thead className="thead-light">
                                                                            <tr>
                                                                                <th scope="col">Date</th>
                                                                                <th scope="col">Worker</th>
                                                                                <th scope="col">Payroll Expense</th>
                                                                                <th scope="col">Labor Expense (Efective Rate)</th>
                                                                                <th scope="col">Hours</th>
                                                                            </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                            {e.workers.map((wx, i) => {
                                                                                let time = wx.time ? (wx.time.reduce((acc, current, i) => acc + current, 0)) : 0 ;
                                                                                let effective = wx.workerId.effective? wx.workerId.effective : 0;
                                                                                let payment = wx.workerId.payment? wx.workerId.payment : 0;
                                                                                let date = new Date(wx.workerId.updatedAt).toISOString().split('T')[0];
                                                                                return (
                                                                                    <tr>
                                                                                        <td>{date}</td>
                                                                                        <td>{wx.workerId.name}</td>
                                                                                        <td align="right">$ {payment * time} USD</td>
                                                                                        <td align="right">$ {effective * time} USD</td>
                                                                                        <td>{time}</td>
                                                                                    </tr>
                                                                                    )
                                                                                }
                                                                            )}
                                                                            </tbody>
                                                                        </Table>

                                                                        <h3>- Expenses</h3>
                                                                        <Table className="align-items-center table-flush col-md-8 col-xs-12" responsive>
                                                                            <thead className="thead-light">
                                                                            <tr>
                                                                                <th scope="col">Date</th>
                                                                                <th scope="col">Worker</th>
                                                                                <th scope="col">Expense Type</th>
                                                                                <th scope="col">Amount</th>
                                                                                <th scope="col">Vendor</th>
                                                                                <th scope="col">Description</th>
                                                                            </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                            {e.expenses.map((ex, ix) => {
                                                                                    return (
                                                                                        <tr>
                                                                                            <td>{ex.date}</td>
                                                                                            <td></td>
                                                                                            <td>{ex.category}</td>
                                                                                            <td align="right">$ {ex.total} USD</td>
                                                                                            <td></td>
                                                                                            <td>{ex.description}</td>
                                                                                        </tr>
                                                                                    )
                                                                                }
                                                                            )}
                                                                            </tbody>
                                                                        </Table>
                                                                    </CardBody>
                                                                </Card>
                                                            </UncontrolledCollapse>
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

export default Reports;
