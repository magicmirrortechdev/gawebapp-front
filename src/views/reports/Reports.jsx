import React from "react";
import {Link} from 'react-router-dom'
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
        startDate: moment().startOf('week').add('days', -6).format('YYYY-MM-DD'),
        endDate: moment().startOf('week').add('days', 0).format('YYYY-MM-DD'),
        jobs: [],
        workers: [],
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
        console.log("url>>>>>>>>>>> ", url)
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
        console.log(">>>>>>>>< ", expenseId)
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
    }

    updateWindowDimensions = () => {
        this.setState(prevState => {
            return {...prevState, isMobileVersion: (window.innerWidth < Global.mobileWidth)}
        })
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions)
    }

    componentDidMount(props) {
        this.props.getJobs()
        this.props.getUsers()
        this.props.getTimes(loggedUser._id)
        this.props.getInvoices(loggedUser._id)
        this.props.getExpenses(loggedUser._id)

        this.updateWindowDimensions()
        window.addEventListener('resize', this.updateWindowDimensions)

        this.setState(prevState => {
            return {
                ...prevState,
                startDate: moment().startOf('week').add('days', -6).format('YYYY-MM-DD'),
                endDate: moment().startOf('week').add('days', 0).format('YYYY-MM-DD'),
                workers: this.workersTransformer(
                    this.props.users.filter(user => user.role === "WORKER" ||
                    user.role ==="PROJECT MANAGER" ||
                    user.role ==="ADMIN"),
                    moment().startOf('week').add('days', -6).format('YYYY-MM-DD'),
                    moment().startOf('week').add('days', 0).format('YYYY-MM-DD'))
            }
        })
    }

    getOpen = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                jobs: [],
            }
        })
        this.props.getJobs();

        this.setState(prevState => {
            return {
                ...prevState,
                buttonActive: "1",
                jobs: this.props.jobs.filter(job => job.status === 'Approve')
            }
        })
    }

    getClose = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                jobs: [],
            }
        })
        this.props.getJobs();

        this.setState(prevState => {
            return {
                ...prevState,
                buttonActive: "2",
                jobs: this.props.jobs.filter(job => job.status === 'Closed')
            }
        })
    }

    getAll = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                jobs: [],
            }
        })
        this.props.getJobs();

        this.setState(prevState => {
            return {
                ...prevState,
                buttonActive: "3",
                jobs: this.props.jobs
            }
        })
     }

    filterDate = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                jobs: [],
                workers: [],
            }
        })
        document.getElementById('spinner').style.visibility='visible';

        let workers_ = [];
        let jobsFilter = this.props.jobs.filter(job => job.status === 'Approve');
        jobsFilter.forEach(job => {
            job.invoices = []
            job.expenses = []

            if(job.workers.length > 0) {
                job.workers.forEach(worker => {
                    worker.time = []
                    this.props.times.forEach(time => {
                        if(time.userId === worker.workerId && time.jobId === job._id){
                            worker.time.push(time)
                            worker.user = this.props.users.filter(user => user._id === worker.workerId )[0]
                            workers_[worker.user._id] = worker.user
                            if(!workers_[worker.user._id].times){
                                workers_[worker.user._id].times = []
                            }
                            workers_[worker.user._id].times.push(time)

                            if(!workers_[worker.user._id].jobs_){
                                workers_[worker.user._id].jobs_ = []
                            }
                            workers_[worker.user._id].jobs_[job._id] = job
                        }
                    })
                    worker.time = worker.time.filter(time =>
                        time.date >= this.state.startDate && time.date <= this.state.endDate
                    )
                })
                job.workers = job.workers.filter(worker => worker.time.length > 0)
            }

            let expenses = this.props.expenses.filter(expense =>
                expense.jobId === job._id && expense.date >= this.state.startDate && expense.date <= this.state.endDate
            )
            if(expenses.length > 0){
                expenses.forEach(expense => {
                    if(!workers_[expense.userId]){
                        workers_[expense.userId] = this.props.users.filter(user => user._id === expense.userId )[0]
                        workers_[expense.userId].expenses = []
                        workers_[expense.userId].jobs = []
                    }

                    if(!workers_[expense.userId].expenses){
                        workers_[expense.userId].expenses = []
                    }

                    if(expense.userId === workers_[expense.userId]._id &&
                        expense.jobId === job._id &&
                        expense.date >= this.state.startDate && expense.date <= this.state.endDate){
                        workers_[expense.userId].expenses.push(expense)
                    }

                    job.expenses.push(expense)
                })
            }

            this.props.invoices.forEach(invoice => {
                if(invoice.jobId === job._id &&
                    invoice.invoiceDate >= this.state.startDate && invoice.invoiceDate <= this.state.endDate){
                    job.invoices.push(invoice)
                }
            })
        })

        let workers = []
        for(let key in workers_ ){
            workers_[key].jobs = []
            for(let keyJob in workers_[key].jobs_ ){
                workers_[key].jobs.push(workers_[key].jobs_[keyJob])
            }
            workers.push(workers_[key])
        }

        jobsFilter = jobsFilter.filter(job => job.invoices.length > 0 || job.expenses > 0 || job.workers.length > 0)
        jobsFilter = jobsFilter.sort(compareValues('jobName', 'asc'));

        this.setState(prevState => {
            return {
                ...prevState,
                loadFilter: true,
                jobs: jobsFilter,
                workers: this.workersTransformer(workers)
            }
        })
        document.getElementById('spinner').style.visibility='hidden';

    }

    clearFilter = () => {

        this.setState(prevState => {
            return {
                ...prevState,
                buttonActive: "1",
                activeTab: "1",
                jobs: this.props.jobs.filter(job => job.status === 'Approve'),
                workers: this.workersTransformer(
                    this.props.users.filter(user => user.role === "WORKER" ||
                        user.role ==="PROJECT MANAGER" ||
                        user.role ==="ADMIN"), null, null)
            }
        })

        document.getElementById("startDate").value = "";
        document.getElementById("endDate").value = "";
    }

    workersTransformer(users) {
        users = users.filter(user => user.expenses || user.jobs)
        users.sort(compareValues('name', 'asc'))
        users.forEach(user => {
            let hoursPerJob = []
            user.totalPayroll = []
            user.totalEffective = []
            user.totalHours = []

            user.jobs.sort(compareValues('date', 'desc'))
            if(user.times){
                user.times.forEach(time => {
                    if(time.date >= this.state.startDate && time.date <= this.state.endDate){
                        hoursPerJob.push({
                            _id: time._id,
                            works: time.jobId,
                            jobName: this.props.jobs.filter(job=> job._id === time.jobId)[0].jobName,
                            hours: time.hours,
                            date: time.date,
                            payroll: user.payRate * time.hours,
                            effective: user.effectiveRate * time.hours,
                        })

                        user.totalPayroll.push(user.payRate * time.hours)
                        user.totalEffective.push(user.effectiveRate * time.hours)
                        user.totalHours.push(time.hours)
                    }
                })
            }
            user.jobs = hoursPerJob
        })
        return users;
    }

    componentDidUpdate(){
        if(!this.state.loadFilter ){
            this.filterDate();
        }
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
                                                    name="startDate"
                                                    className="form-control-alternative"
                                                    type="date"
                                                    id="startDate"
                                                    value={this.state.startDate}
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
                                                    name="endDate"
                                                    id="endDate"
                                                    className="form-control-alternative"
                                                    type="date"
                                                    value={this.state.endDate}
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
                                        <ReportJobs jobs={this.state.jobs} openModal={this.handleOpenModal}
                                                    isMobileVersion={this.state.isMobileVersion}/>
                                    </TabPane>
                                    <TabPane tabId="2">
                                        <ReportWorkers workers={this.state.workers}
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
