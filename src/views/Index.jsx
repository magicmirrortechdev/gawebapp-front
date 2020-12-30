import React from "react";

import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Button
} from "reactstrap";
// core components
import Header from "components/Headers/Header.jsx";
import {connect} from "react-redux";
import {getInvoices} from "../redux/actions/invoiceAction";
import {getExpenses} from "../redux/actions/expenseAction";
import {getTimes} from "../redux/actions/timeAction";
import {getUsers} from "../redux/actions/userAction";
import {getJobs} from "../redux/actions/jobAction";
import {getClients} from "../redux/actions/clientAction";
import {logoutUser} from '../redux/actions/authAction'

import Global from "../global";

class Index extends React.Component {
  state = {
    activeNav: 1,
    chartExample1Data: "data1"
  };

  toggleNavs = (e, index) => {
    e.preventDefault();
    this.setState({
      activeNav: index,
      chartExample1Data:
        this.state.chartExample1Data === "data1" ? "data2" : "data1"
    });
    let wow = () => {
      console.log(this.state);
    };
    wow.bind(this);
    setTimeout(() => wow(), 1000);
    // this.chartReference.update();
  };

  componentDidMount(props) {
    if (!this.props.userLogged || localStorage.version !== Global.version) {
        this.props.logoutUser()
        this.props.history.push('/auth/login')
    } else {
        this.loadInfo(this.props.userLogged)
    }
  }

  async loadInfo(loggedUser) {
      if(this.props.jobs.length === 0 && this.props.users.length === 0){
          document.getElementById('spinner').style.visibility='visible';
          if(loggedUser.level <=1) {
              await this.props.getJobs(loggedUser._id)
          }else{
              await this.props.getJobs();
              await this.props.getClients();
          }
          await this.props.getExpenses(loggedUser._id)
          await this.props.getInvoices(loggedUser._id)
          await this.props.getTimes(loggedUser._id)
          await this.props.getUsers(loggedUser._id)
          document.getElementById('spinner').style.visibility='hidden';
      }
  }

  render() {
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
                      <h3 className="mb-0">Actions</h3>

                    </div>
                    {/*
                    <div className="col text-right">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        size="sm"
                      >
                        See all
                      </Button>
                    </div>
                    */}
                  </Row>
                </CardHeader>
                <CardBody>
                    <Row>
                    <Col lg="6" className="mb-5">
                    <Button
                              style={{width:'50%'}}
                              className="form-control-alternative"
                              color="info"
                              onClick={()=>{this.props.history.push(`/admin/addexpense`)}}
                            >New Expense
                    </Button>
                    <br/>
                    <br/>
                    <br/>
                    <Button
                              style={{width:'50%'}}
                              className="form-control-alternative"
                              color="info"
                              onClick={()=>{this.props.history.push(`/admin/addtime`)}}
                            >Add Time
                    </Button>
                    </Col>
                    <br/>
                    <br/>
                    <Col lg="6">
                    <Button
                              style={{width:'50%'}}
                              className="form-control-alternative"
                              color="info"
                              onClick={()=>{this.props.history.push(`/admin/addestimate`)}}
                            >New Estimate
                      </Button>
                      <br/>
                      <br/>
                      <br/>
                      <Button
                              style={{width:'50%'}}
                              className="form-control-alternative"
                              color="info"
                              onClick={()=>{this.props.history.push(`/admin/createinvoice`)}}
                            >New Invoice
                      </Button>
                    </Col>

                    </Row>

                </CardBody>
              </Card>
            </Col>

          </Row>
        </Container>
      </>
    );
  }
}

const mapStateToProps = state => ({
    userLogged: state.auth.userLogged,
    users: state.user.users,
    jobs: state.job.jobs
})

export default connect(mapStateToProps, {getUsers, getClients, getJobs, logoutUser, getTimes, getExpenses, getInvoices})(Index);
