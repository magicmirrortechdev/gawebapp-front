import React from "react";
import {Link} from 'react-router-dom'
import classnames from 'classnames';
import _ from 'lodash';

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
    NavLink,
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
} from "reactstrap";
// core components
import Global, {compareValues} from "../../global";

import Header from "components/Headers/Header.jsx";
import ReportJobs from "./ReportJobs";
import ReportWorkers from "./ReportWorkers";
import PDFViewer from 'pdf-viewer-reactjs';
import CustomNavigation from './Navigation';
import {connect} from "react-redux";
import {getUsers} from "../../redux/actions/userAction"
import {getJobs} from "../../redux/actions/jobAction"
import {getInvoices} from "../../redux/actions/invoiceAction"
import {getTimes} from "../../redux/actions/timeAction"
import {getExpenses} from "../../redux/actions/expenseAction"
import moment from "moment"
import configureStore from "../../redux/store";
const {store} = configureStore();

let pdfFile;
let loggedUser
class Reports extends React.Component {
    state = {
        startDateLbl: moment().startOf('week').add('days', -6).format('YYYY-MM-DD'),
        endDateLbl: moment().startOf('week').add('days', 0).format('YYYY-MM-DD'),
        startDate: moment().startOf('week').add('days', -7).format('YYYY-MM-DD'),
        endDate: moment().startOf('week').add('days', 1).format('YYYY-MM-DD'),
        jobsFilter: [],
        workersFilter: [],
        activeTab: '1',
        buttonActive: '1',
        modal: false,
        extension: '',
        loadFilter: false
    };

    constructor(props) {
        super(props);
        const {auth} = store.getState();
        loggedUser = auth.userLogged
    }

    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    toggleModal = () => {
        this.setState({
            modal: !this.state.modal
        })
    };

    handleExpenseOpenModal = (url) => {
        this.setState(prevState => {
            let img = url;
            if (img !== '') {
                img = img.replace("http", "https");
                pdfFile = img;
            }
            return {
                ...prevState,
                img: img,
                modal: true,
                extension: img === '' ? '' : img.substring(img.length - 3, img.length).toLowerCase()
            }
        })
    }

    handleOpenModal = (expenseId) => {
        const expense = this.props.expenses.filter(item => item._id === expenseId)[0]
        this.setState(prevState => {
            let img = expense.image;
            if (img !== '') {
                img = img.replace("http", "https");
                pdfFile = img
            }

            return {
                ...prevState,
                img: img,
                modal: true,
                extension: img === '' ? '' : img.substring(img.length - 3, img.length).toLowerCase()
            }
        });
    }

    handleInput = e => {
        e.persist()
        this.setState(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))

        if(e.target.name === "startDateLbl"){
            this.setState(prevState => ({
                ...prevState,
                "startDate": moment(e.target.value).add('days', -1).format('YYYY-MM-DD')
            }))
        }

        if(e.target.name === "endDateLbl"){
            this.setState(prevState => ({
                ...prevState,
                "endDate": moment(e.target.value).add('days', +1).format('YYYY-MM-DD')
            }))
        }
    }

    updateWindowDimensions = () => {
        this.setState(prevState => {
            return {...prevState, isMobileVersion: (window.innerWidth < Global.mobileWidth)}
        })
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions)
    }

    async componentDidMount(props) {
        await this.props.getJobs()
        await this.props.getUsers()
        await this.props.getTimes(loggedUser._id)
        await this.props.getInvoices(loggedUser._id)
        await this.props.getExpenses(loggedUser._id)

        this.updateWindowDimensions()
        window.addEventListener('resize', this.updateWindowDimensions)

        this.setState(prevState => {
            return {
                ...prevState,
                startDateLbl: moment().startOf('week').add('days', -6).format('YYYY-MM-DD'),
                endDateLbl: moment().startOf('week').add('days', 0).format('YYYY-MM-DD'),
                startDate: moment().startOf('week').add('days', -7).format('YYYY-MM-DD'),
                endDate: moment().startOf('week').add('days', 1).format('YYYY-MM-DD'),
                workersFilter: this.workersTransformer(
                    this.props.users.filter(user => user.role === "WORKER" ||
                    user.role ==="PROJECT MANAGER" ||
                    user.role ==="ADMIN"),
                    moment().startOf('week').add('days', -6).format('YYYY-MM-DD'),
                    moment().startOf('week').add('days', 0).format('YYYY-MM-DD'))
            }
        })
    }

    getOpen = async () => {
        document.getElementById('spinner').style.visibility='visible';
        this.setState(prevState => {
            return {
                ...prevState,
                jobsFilter: [],
                workersFilter: []
            }
        })
        await this.props.getJobs();
        const data = this.filterJobs(this.props.jobs.filter(job => job.status === 'Approve'), [])
        this.setState(prevState => {
            return {
                ...prevState,
                buttonActive: "1",
                jobsFilter: data[0],
                workersFilter: this.workersTransformer(data[1])
            }
        })
        document.getElementById('spinner').style.visibility='hidden';
    }

    getClose = async () => {
        document.getElementById('spinner').style.visibility='visible';
        this.setState(prevState => {
            return {
                ...prevState,
                jobsFilter: [],
                workersFilter: []
            }
        })
        await this.props.getJobs();
        const data = this.filterJobs(this.props.jobs.filter(job => job.status === 'Closed'), [])
        this.setState(prevState => {
            return {
                ...prevState,
                buttonActive: "2",
                jobsFilter: data[0],
                workersFilter: this.workersTransformer(data[1])
            }
        })
        document.getElementById('spinner').style.visibility='hidden';
    }

    getAll = async () => {
        document.getElementById('spinner').style.visibility='visible';

        this.setState(prevState => {
            return {
                ...prevState,
                jobsFilter: [],
                workersFilter: []
            }
        })
        await this.props.getJobs();

        const data = this.filterJobs(this.props.jobs, [])

        this.setState(prevState => {
            return {
                ...prevState,
                buttonActive: "3",
                activeTab: "1",
                loadFilter: true,
                jobsFilter: data[0],
                workersFilter: this.workersTransformer(data[1])
            }
        })

        document.getElementById('spinner').style.visibility='hidden';
     }

    filterDate = async () => {
        this.setState(prevState => {
            return {
                ...prevState,
                jobsFilter: [],
                workersFilter: [],
            }
        })
        await this.props.getJobs();

        document.getElementById('spinner').style.visibility='visible';
        const data = this.filterJobs(this.props.jobs.filter(job => job.status === 'Approve'), [])
        this.setState(prevState => {
            return {
                ...prevState,
                buttonActive: "1",
                loadFilter: true,
                jobsFilter: data[0],
                workersFilter: this.workersTransformer(data[1])
            }
        })
        document.getElementById('spinner').style.visibility='hidden';
    }

    filterJobs = (jobsFilter_, workers_) => {
        workers_ = []
        jobsFilter_.forEach(job_ => {
            job_.invoices = []
            job_.expenses = []

            if (job_.workers.length > 0) {
                job_.workers.forEach(worker => {
                    worker.time = []
                    this.props.times.forEach(time => {
                        if (time.userId === worker.workerId && time.jobId === job_._id) {
                            worker.time.push(time)
                            worker.user = this.props.users.filter(user => user._id === worker.workerId)[0]
                            workers_[worker.user._id] = worker.user
                            if (!workers_[worker.user._id].times) {
                                workers_[worker.user._id].times = []
                            }
                            workers_[worker.user._id].times.push(time)

                            if (!workers_[worker.user._id].ajobs) {
                                workers_[worker.user._id].ajobs = []
                            }
                            workers_[worker.user._id].ajobs[job_._id] = job_
                        }
                    })
                    worker.time = worker.time.filter(time_ =>
                        time_.date >= this.state.startDateLbl && time_.date <= this.state.endDate
                    )
                })
                job_.workers = job_.workers.filter(worker => worker.time.length > 0)
            }

            let expenses = this.props.expenses.filter(expense =>
                expense.jobId === job_._id && expense.date >= this.state.startDateLbl && expense.date <= this.state.endDate
            )
            if (expenses.length > 0) {
                expenses.forEach(expense => {
                    if (!workers_[expense.userId]) {
                        workers_[expense.userId] = this.props.users.filter(user => user._id === expense.userId)[0]
                        if(workers_[expense.userId]){
                            if (typeof workers_[expense.userId].jobs === 'undefined') {
                                workers_[expense.userId].jobs = []
                            }
                            if (typeof workers_[expense.userId].expenses === 'undefined') {
                                workers_[expense.userId].expenses = []
                            }
                        } else {
                            workers_[expense.userId] = {
                                _id: '',
                                jobs: [],
                                expenses: []
                            }
                        }
                    }

                    if (expense.userId === workers_[expense.userId]._id &&
                        expense.jobId === job_._id &&
                        expense.date >= this.state.startDateLbl && expense.date <= this.state.endDate) {
                        if (!workers_[expense.userId].expenses) {
                            workers_[expense.userId].expenses = []
                        }
                        expense.jobName = this.props.jobs.filter(job => job._id === expense.jobId)[0].jobName
                        workers_[expense.userId].expenses.push(expense)
                    }

                    job_.expenses.push(expense)
                })
                job_.expenses = job_.expenses.sort(compareValues('date', 'desc'))
            }

            this.props.invoices.forEach(invoice => {
                if (invoice.jobId === job_._id &&
                    invoice.invoiceDate >= this.state.startDateLbl && invoice.invoiceDate <= this.state.endDate) {
                    job_.invoices.push(invoice)
                }
            })
            job_.invoices = job_.invoices.sort(compareValues('invoiceDate', 'desc'))
        })

        console.log(workers_);
        let workers__ = []
        for(let key in workers_ ){
            workers_[key].jobs = []
            for(let keyJob in workers_[key].ajobs ){
                workers_[key].jobs.push(workers_[key].ajobs[keyJob])
            }
            workers__.push(workers_[key])
        }

        jobsFilter_ = jobsFilter_.filter(job_ => job_.invoices.length > 0 || job_.expenses.length > 0 || job_.workers.length > 0)
            .sort(compareValues('jobName', 'asc'));

        return [jobsFilter_, workers__]
    }

    clearFilter = () => {
        document.getElementById('spinner').style.visibility='visible';
        this.setState(prevState => {
            return {
                ...prevState,
                startDateLbl: moment().startOf('week').add('days', -6).format('YYYY-MM-DD'),
                endDateLbl: moment().startOf('week').add('days', 0).format('YYYY-MM-DD'),
                startDate: moment().startOf('week').add('days', -7).format('YYYY-MM-DD'),
                endDate: moment().startOf('week').add('days', 1).format('YYYY-MM-DD'),
                jobsFilter: [],
                workersFilter: [],
            }
        })

        document.getElementById('spinner').style.visibility='hidden';
    }

    workersTransformer(users, filter = true) {
        users = users.filter(user => user.expenses || user.jobs )
        users.sort(compareValues('name', 'asc'))
        users.forEach(user => {
            let hoursPerJob = []

            if(user.times){
                user.times.forEach(time => {
                    hoursPerJob.push({
                        _id: time._id,
                        works: time.jobId,
                        jobName: this.props.jobs.filter(job=> job._id === time.jobId)[0].jobName,
                        hours: time.hours,
                        date: time.date,
                        payroll: user.payRate * time.hours,
                        effective: user.effectiveRate * time.hours,
                    })
                })
            }
            user.jobs = _.uniqBy(hoursPerJob, "_id")
            if (filter){
                user.jobs = user.jobs.filter(job => job.date >= this.state.startDateLbl &&
                    job.date <= this.state.endDate )
                if (user.expenses){
                    user.expenses = user.expenses.filter(expense => expense.date >= this.state.startDateLbl &&
                        expense.date <= this.state.endDate )
                }
            }
        })
        users = users.filter(user => (user.expenses && user.expenses.length > 0) || (user.jobs && user.jobs.length > 0))
        return users;
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
                                                   size="sm" style={{display : 'none'}}>
                                                    Create a Report
                                                </p>
                                            </Link>

                                        </div>
                                    </Row>
                                </CardHeader>

                                <Form className="card-header">
                                    <Row form>
                                        <Col md={4}>
                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-dateStart">
                                                    From Date
                                                </label>
                                                <Input
                                                    name="startDateLbl"
                                                    className="form-control-alternative"
                                                    type="date"
                                                    id="startDate"
                                                    value={this.state.startDateLbl}
                                                    onChange={this.handleInput}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={4}>
                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-dateStart">
                                                    Up to Date
                                                </label>
                                                <Input
                                                    name="endDateLbl"
                                                    id="endDate"
                                                    className="form-control-alternative"
                                                    type="date"
                                                    value={this.state.endDateLbl}
                                                    onChange={this.handleInput}
                                                />

                                            </FormGroup>
                                        </Col>
                                        <Col md={2} lg={2} xl={2} xs={3} sm={2}>
                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-dateStart">
                                                    &nbsp;</label>
                                                <br/>
                                                <Button
                                                    className="form-control-alternative"
                                                    color="info"
                                                    onClick={this.filterDate}>
                                                    <i className="fa fa-search"></i> {this.state.isMobileVersion ? '' : 'Search'}
                                                </Button>
                                            </FormGroup>
                                        </Col>
                                        <Col md={2} lg={1} xl={2} xs={2} sm={2}>
                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-dateStart"
                                                >&nbsp;</label>
                                                <br/>
                                                <Button
                                                    className="form-control-alternative"
                                                    color="info"
                                                    onClick={this.clearFilter}>
                                                    <i className="fa fa-trash"></i> {this.state.isMobileVersion ? '' : 'Clear'}
                                                </Button>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Form>
                                <Form className="card-header">

                                    <Row form>
                                        {this.state.activeTab === '1' ?
                                            <Col md={12}>
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-dateStart">
                                                        Filter By Jobs
                                                    </label>
                                                    <br/>
                                                    <span>
                                                    <Button
                                                        className="form-control-alternative"
                                                        color={this.state.buttonActive === "1" ? "info" : "secondary"}
                                                        onClick={this.getOpen}>
                                                        {!this.state.isMobileVersion ? 'Open' : <small>Open</small>}
                                                    </Button>
                                                    <Button
                                                        className="form-control-alternative"
                                                        color={this.state.buttonActive === "2" ? "info" : "secondary"}
                                                        onClick={this.getClose}>
                                                        {!this.state.isMobileVersion ? 'Close' : <small>Close</small>}
                                                    </Button>
                                                    <Button
                                                        className="form-control-alternative"
                                                        color={this.state.buttonActive === "3" ? "info" : "secondary"}
                                                        onClick={this.getAll}>
                                                        {!this.state.isMobileVersion ? 'All' : <small>All</small>}
                                                    </Button>
                                                </span>
                                                </FormGroup>
                                            </Col>
                                            : null
                                        }
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
                                        <ReportJobs jobsFilter={this.state.jobsFilter} openModal={this.handleOpenModal}
                                                    isMobileVersion={this.state.isMobileVersion}/>
                                    </TabPane>
                                    <TabPane tabId="2">
                                        <ReportWorkers workersFilter={this.state.workersFilter}
                                                       openModal={this.handleExpenseOpenModal}
                                                       isMobileVersion={this.state.isMobileVersion}/>
                                    </TabPane>
                                </TabContent>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}> Expense detail</ModalHeader>
                    <ModalBody>
                        {this.state.img && this.state.extension !== 'pdf' ?
                            <img width="100%" height="100%" src={this.state.img} alt="photo_url"/>
                            : null
                        }

                        {this.state.img && this.state.extension === 'pdf' ?
                            <PDFViewer
                                document={{
                                    url: pdfFile,
                                }}
                                navigation={CustomNavigation}
                            />
                            : null
                        }

                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggleModal}>Close</Button>
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}


const mapStateToProps = state => ({
    users: state.user.users,
    jobs: state.job.jobs,
    expenses: state.expense.expenses,
    invoices: state.invoice.invoices,
    times: state.time.times
})

export default connect(mapStateToProps, {getUsers, getJobs, getExpenses, getInvoices, getTimes})(Reports);
