import React from "react";
import { withRouter } from 'react-router-dom'

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
  Form
} from "reactstrap";
// core components
import Header from "components/Headers/Header.jsx";
import {store} from "../../redux/store";
import {connect} from "react-redux";
import {getJobs, payInvoice} from "../../redux/actions/jobAction";

let loggedUser
var fecha = new Date(); 
      var mes = fecha.getMonth()+1; 
      var dia = fecha.getDate(); 
      var ano = fecha.getFullYear(); 
      if(dia<10)
        dia='0'+dia; //agrega cero si es menor de 10
      if(mes<10)
        mes='0'+mes //agrega cero si es menor de 10
class PayInvoice extends React.Component {
  state = {
    clientName: '',
    nameWorker:'',
    jobName: '',
    date: ano+"-"+mes+"-"+dia,
  };

  constructor(props) {
    super(props);
    console.log("constructor!!!")
    const {auth} = store.getState();
    loggedUser = auth.userLogged
  }

  handleInput = e => {
    e.persist()
    this.setState(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  componentDidMount() {
    if (this.props.jobs.length === 0) this.props.history.push(`/admin/jobs`)
    const job = this.props.jobs.filter(item => item._id === this.props.match.params.id)[0]
    this.setState(prevState => {
      return {
        ...prevState,
        clientName: job.clientId.name,
        jobName: job.jobName,
        ...job
      }
    })
  }

  handleSubmit = (e, props) => {
    e.preventDefault()
    this.props.payInvoice(this.props.match.params.id, this.props.match.params.invoiceId, this.state)
    this.props.history.push(`/admin/invoices`)
  }

  render() {
    
    console.log(this.state)
    const clientName = this.state.clientName
    const jobName = this.state.jobName
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
                      <h3 className="mb-0">Information</h3>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  
                  <Form onSubmit={this.handleSubmit}>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="10">
                        <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-hours"
                            >
                              Client Name
                            </label>
                            <Input
                              value={clientName}
                              name="jobName"
                              className="form-control-alternative lg"
                              type="text"
                              onChange={this.handleInput}
                              disabled
                            />
                          </FormGroup>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-hours"
                            >
                              Job Name
                            </label>
                            <Input
                              value={jobName}
                              name="jobName"
                              className="form-control-alternative lg"
                              type="text"
                              onChange={this.handleInput}
                              disabled
                            />
                          </FormGroup>
                          <FormGroup>
                            <label
                              className="form-control-label d-inline-block"
                              htmlFor="input-date"
                            >
                              Pay Date
                            </label>
                            <Input
                              className="form-control-alternative"
                              placeholder="Select a date"
                              id="date"
                              value={this.state.date}
                              name="date"
                              type="date"
                              onChange={this.handleInput}
                            />
                          </FormGroup>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-hours"
                            >
                            Amount paid
                            </label>
                            <Input
                              name="paid"
                              className="form-control-alternative"
                              placeholder="0"
                              type="number"
                              onChange={this.handleInput}
                              step="any"
                            />
                          </FormGroup>
                          
                        </Col>
                      </Row>
                      
                      
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                        
                            <Button
                              className="form-control-alternative"
                              color="info"

                            >Pay</Button>
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

const mapStateToProps = state => ({
  jobs: state.job.jobs,
})

export default connect(mapStateToProps, {getJobs, payInvoice})(withRouter(PayInvoice));
