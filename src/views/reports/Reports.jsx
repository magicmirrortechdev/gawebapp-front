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
import moment from "moment";

let pdfFile;
class Reports extends React.Component {
    state = {
        jobs: [],
        workers: [],
        activeTab: '1',
        buttonActive: '1',
        modal: false,
        extension: '',
        loadFilter: false
    };

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

    handleOpenModal = (estimateId, expenseId) => {
        const job = this.props.jobs.filter(item => item._id === estimateId)[0]
        this.setState(prevState => {
            let img = '';
            const expenses = job.expenses
            expenses.map((e, i) => {
                if (e._id === expenseId) {
                    img = e.img
                }
                return {img}
            })
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
        this.updateWindowDimensions()
        window.addEventListener('resize', this.updateWindowDimensions)

        if (this.props.jobs.length === 0) this.props.getJobs()
        if (this.props.users.length === 0 ) this.props.getUsers()

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

        this.props.getJobs();
        this.props.getUsers();
        document.getElementById('spinner').style.visibility='visible';

        let jobsFilter = this.props.jobs.filter(job => job.status === 'Approve');
        jobsFilter.forEach(job =>{
            if(job.expenses.length > 0){
                job.expenses = job.expenses.filter(expenses =>
                    expenses.date >= this.state.startDate && expenses.date <= this.state.endDate
                )
            }

            if(job.invoices.length > 0){
                job.invoices = job.invoices.filter(invoices =>
                    invoices.date >= this.state.startDate && invoices.date <= this.state.endDate
                )
            }

            if(job.workers.length > 0){
                job.workers.forEach(worker =>{
                    worker.time = worker.time.filter(time =>
                        time.date >= this.state.startDate && time.date <= this.state.endDate
                    )
                })
                job.workers = job.workers.filter(worker => worker.time.length > 0)
            }
        })

        jobsFilter = jobsFilter.sort(compareValues('jobName', 'asc'));

        let workers = this.props.users.filter(user => user.role === "WORKER" ||
            user.role ==="PROJECT MANAGER" ||
            user.role ==="ADMIN");


        this.setState(prevState => {
            return {
                ...prevState,
                loadFilter: true,
                jobs: jobsFilter,
                workers: this.workersTransformer(workers, this.state.startDate, this.state.endDate)
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

    workersTransformer(users, startDate, endDate) {
        users.sort(compareValues('name', 'asc'))
        users.forEach(user => {
            let hoursPerJob = []

            user.jobs = []
            user.totalPayroll = []
            user.totalEffective = []
            user.totalHours = []
            user.proccessJobs = []

            user.works.sort(compareValues('date', 'desc')).forEach((work, i) => {
                work.time.sort(compareValues('date', 'desc')).forEach((time, i) => {
                    hoursPerJob.push({
                        _id: time._id,
                        works: work._id ? work._id : work.workId._id,
                        time: time.hours,
                        date: time.date,
                    })
                })
            })

            hoursPerJob = hoursPerJob.filter((thing, index) => {
                const _thing = JSON.stringify(thing);
                return index === hoursPerJob.findIndex(obj => {
                    return JSON.stringify(obj) === _thing;
                });
            });

            user.works.sort(compareValues('date', 'desc')).forEach(works => {
                if (works.workId && works.workId.workers) {
                    works.workId.workers.sort(compareValues('date', 'desc')).forEach(worker => {
                        if (worker.workerId && worker.workerId === user._id) {
                            hoursPerJob.forEach(hoursTime => {
                                if ((hoursTime.works === works._id) || (works.workId && hoursTime.works === works.workId._id)) {
                                    if(hoursTime.date >= this.state.startDate &&
                                        hoursTime.date <= this.state.endDate){
                                        user.jobs.push({
                                            _id:hoursTime._id,
                                            date: hoursTime.date,
                                            jobName: works.workId.jobName,
                                            hours: hoursTime.time,
                                            hoursT: hoursTime.time,
                                            payroll: user.payment * hoursTime.time,
                                            effective: user.effective * hoursTime.time,
                                        });
                                    } else if (startDate == null && endDate == null){
                                        user.jobs.push({
                                            _id:hoursTime._id,
                                            date: hoursTime.date,
                                            jobName: works.workId.jobName,
                                            hours: hoursTime.time,
                                            hoursT: hoursTime.time,
                                            payroll: user.payment * hoursTime.time,
                                            effective: user.effective * hoursTime.time,
                                        });
                                    }
                                }
                            });
                        }
                    });
                }
            });

            user.jobs = user.jobs.filter((user__, index) => {
                const _user = JSON.stringify(user__);
                return index === user.jobs.findIndex(obj => {
                    return JSON.stringify(obj) === _user;
                });
            });

            user.jobs.forEach((e, i) => {
                user.totalPayroll.push(e.payroll)
                user.totalEffective.push(e.effective)
                user.totalHours.push(e.hours)
            })

            if(user.expenses.length > 0){
                user.expenses = user.expenses.filter(expenses =>
                    expenses.date >= this.state.startDate && expenses.date <= this.state.endDate
                )
            }
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
                                                   size="sm">
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
    jobs: state.job.jobs
})

export default connect(mapStateToProps, {getUsers, getJobs})(Reports);
