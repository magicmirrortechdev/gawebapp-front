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
    NavLink,
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
} from "reactstrap";
// core components
import Global from "../../global";

import Header from "components/Headers/Header.jsx";
import ReportJobs from "./reports/ReportJobs";
import ReportWorkers from "./reports/ReportWorkers";
import PDFViewer from 'pdf-viewer-reactjs';
import CustomNavigation from './reports/Navigation';

let loggedUser;
let pdfFile;

class Reports extends React.Component {
    state = {
        jobs: [],
        workers: [],
        activeTab: '1',
        buttonActive: '1',
        modal: false,
        extension: ''
    };

    constructor(props) {
        super(props);
        loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
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

    handleOpenModal = (estimateId, expenseId) => {
        axios.get(Global.url + `estimatedetail/${estimateId}`)
            .then(({data}) => {
                this.setState(prevState => {
                    let img = '';
                    const expenses = data.estimate.expenses
                    expenses.map((e, i) => {
                        if (e._id === expenseId) {
                            img = e.img
                        }
                        return {img}
                    })
                    if(img !== ''){
                        console.log("img>>>> ", img.substring(img.length - 3, img.length).toLowerCase());
                        pdfFile = img.replace("http", "https");
                        console.log(pdfFile);
                    }

                    return {
                        ...prevState,
                        img: img,
                        modal: true,
                        extension: img === ''? '': img.substring(img.length - 3, img.length).toLowerCase()
                    }
                });
            })
    }

    handleInput = e => {
        e.persist()
        this.setState(prevState => ({
          ...prevState,
          [e.target.name]: e.target.value
        }))
    }

    updateWindowDimensions = () => {
        this.setState(prevState => {return {...prevState, isMobileVersion : (window.innerWidth < Global.mobileWidth) }})
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions)
    }

    componentDidMount(props) {
        this.updateWindowDimensions()
        window.addEventListener('resize', this.updateWindowDimensions)

        axios.get(Global.url + `openjobs`)
            .then(({data}) => {
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

    getOpen =()=>{
    axios
      .get(Global.url + `openjobs`)
      .then(({ data }) => {
        this.setState(prevState => {
          return {
            ...prevState,
            buttonActive: "1",
            ...data
          }
        })
      })
      .catch(err => {
        console.log(err)
      })
    }
  getClose =()=>{
    axios
      .get(Global.url + `closejobs`)
      .then(({ data }) => {
        this.setState(prevState => {
          return {
            ...prevState,
            buttonActive: "2",
            ...data
          }
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  getAll =()=>{
    axios
      .get(Global.url + `checkjobs`)
      .then(({ data }) => {
        this.setState(prevState => {
          return {
            ...prevState,
            buttonActive: "3",
            ...data
          }
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  filterDate = () =>{
    let dates = {"startDate":this.state.startDate, "endDate": this.state.endDate}
    console.log('los params', dates)
    axios
      .post(Global.url + `filterdate`, this.state )
      .then(({ data }) => {
        
        
        this.setState(prevState => {
            return {
            ...prevState,
            ...data
          }
            
          
        })
        console.log("State filtrado",this.state)
      })
      .catch(err => {
        console.log(err)
      })
  }

  clearFilter= ()=>{
    axios.get(Global.url + `openjobs`)
        .then(({data}) => {
            console.log(data);
            this.setState(prevState => {
                return {
                    ...prevState,
                    buttonActive: "1",
                    activeTab: "1",
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
    document.getElementById("startDate").value = "";
    document.getElementById("endDate").value = "";
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

                                <Form className="card-header" >
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
                                                onClick={ this.filterDate }>
                                                <i className="fa fa-search"></i> {this.state.isMobileVersion? '' : 'Search'}
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
                                                <i className="fa fa-trash"></i> {this.state.isMobileVersion? '' : 'Clear'}</Button>
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
                                                        color={this.state.buttonActive==="1"?"info": "secondary"}
                                                        onClick={this.getOpen}>
                                                        {!this.state.isMobileVersion? 'Open' : <small>Open</small>}
                                                    </Button>
                                                    <Button
                                                        className="form-control-alternative"
                                                        color={this.state.buttonActive==="2"?"info": "secondary"}
                                                        onClick={this.getClose}>
                                                        {!this.state.isMobileVersion? 'Close' : <small>Close</small>}
                                                    </Button>
                                                    <Button
                                                        className="form-control-alternative"
                                                        color={this.state.buttonActive==="3"?"info": "secondary"}
                                                        onClick={this.getAll}>
                                                        {!this.state.isMobileVersion? 'All' : <small>All</small>}
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
                                        <ReportJobs jobs={this.state.jobs} openModal={this.handleOpenModal} isMobileVersion={this.state.isMobileVersion} />
                                    </TabPane>
                                    <TabPane tabId="2">
                                        <ReportWorkers workers={this.state.workers} isMobileVersion={this.state.isMobileVersion}/>
                                    </TabPane>
                                </TabContent>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}> Expense detail</ModalHeader>
                    <ModalBody>
                        {this.state.img && this.state.extension !=='pdf'?
                            <img width="100%" height="100%" src={this.state.img} alt="photo_url" />
                            :null
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

export default Reports;
