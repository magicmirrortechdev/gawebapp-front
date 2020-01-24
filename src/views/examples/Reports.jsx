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
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, FormGroup
} from "reactstrap";
// core components
import Header from "components/Headers/Header.jsx";

class Reports extends React.Component {
    state = {
        reports: []
    };

    handleSubmit() {

    }

    componentDidMount() {
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
                                        <th scope="col">Project Manager</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Total Estimated</th>
                                        <th scope="col">Total Invoiced</th>
                                        <th scope="col">Total Expended</th>
                                        <th scope="col">
                                        </th>
                                    </tr>
                                    </thead>


                                    {this.state.reports.length === 0 ? <tbody>
                                        <tr>
                                            <td>No Reports register</td>
                                        </tr>
                                        </tbody> :
                                        this.state.reports.map((e, i) => {
                                            return (
                                                <tbody key={i}>
                                                <tr>
                                                    <td>{e.jobName}</td>
                                                    <td>{e.projectName}</td>
                                                    <td>{e.status}</td>
                                                    <td>$200,000 USD</td>
                                                    <td>$100,000 USD</td>
                                                    <td>$100,000 USD</td>
                                                    <td><UncontrolledDropdown>
                                                        <DropdownToggle>
                                                            ...
                                                        </DropdownToggle>
                                                        <DropdownMenu>
                                                            <DropdownItem>Details</DropdownItem>
                                                            <DropdownItem>Export to Excel</DropdownItem>
                                                            <DropdownItem>Edit</DropdownItem>
                                                            <DropdownItem><span
                                                                className="text-danger">Delete</span></DropdownItem>
                                                        </DropdownMenu>
                                                    </UncontrolledDropdown></td>
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
