import React from "react";
import {Link} from 'react-router-dom'
import axios from 'axios'
import classnames from 'classnames';

import {
    Card,
    CardHeader,
    Container,
    Row,
    Col,
    Input,
    Form,
    FormGroup,
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink
} from "reactstrap";
// core components
import Global from "../../global";

import Header from "components/Headers/Header.jsx";
import ReportJobs from "./reports/ReportJobs";
import ReportWorkers from "./reports/ReportWorkers";

class Reports extends React.Component {
    state = {
        jobs: [],
        workers: [],
        activeTab: '2'
    };

    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

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
            });

        axios.get(Global.url + `workers`)
            .then(({data}) => {
                console.log(data);
                this.setState(prevState => {
                    return {
                        ...prevState,
                        workers: data.users
                    }
                })
            })
            .catch(err => {
                console.log(err)
            });

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
                                                <p color="primary"
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
                                            <FormGroup>
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
                                            <FormGroup>
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
                                        <Col md={{size: 3, offset: 5}}>
                                            <FormGroup>
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

                                <Nav tabs>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({active: this.state.activeTab === '1'})}
                                            onClick={() => {
                                                this.toggleTab('1');
                                            }}>
                                            P&L
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({active: this.state.activeTab === '2'})}
                                            onClick={() => {
                                                this.toggleTab('2');
                                            }}>
                                            Workers
                                        </NavLink>
                                    </NavItem>
                                </Nav>

                                <TabContent activeTab={this.state.activeTab}>
                                    <TabPane tabId="1">
                                        <ReportJobs jobs={this.state.jobs} />
                                    </TabPane>
                                    <TabPane tabId="2">
                                        <ReportWorkers workers={this.state.workers} />
                                    </TabPane>
                                </TabContent>

                            </Card>
                        </Col>

                    </Row>
                </Container>
            </>
        );
    }
}

export default Reports;
