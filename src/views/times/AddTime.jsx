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
import {connect} from "react-redux";
import {addTime} from "../../redux/actions/jobAction";

var fecha = new Date(); 
      var mes = fecha.getMonth()+1; 
      var dia = fecha.getDate(); 
      var ano = fecha.getFullYear(); 
      if(dia<10)
        dia='0'+dia; //agrega cero si es menor de 10
      if(mes<10)
        mes='0'+mes //agrega cero si es menor de 10
class AddTime extends React.Component {
  state = {
    jobName: '',
    nameWorker:'',
    date: ano+"-"+mes+"-"+dia,

  };

  handleInput = e => {
    e.persist()
    this.setState(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  componentDidMount() {
    if (this.props.jobs.length === 0) this.props.history.push(`/admin/times`)
    const job = this.props.jobs.filter(item => item._id === this.props.match.params.estimateId)[0]
    const user = this.props.users.filter(item => item._id === this.props.match.params.workerId)[0]
    this.setState(prevState => {
      return {
        ...prevState,
        jobName: job.jobName,
        ...job,
        nameWorker: user.name,
        ...user
      }
    })
  }

  handleSubmit = (e, props) => {
    e.preventDefault()
    this.props.addTime(this.props.match.params.id, this.props.match.params.workerId, this.state)
    this.props.history.push(`/admin/time`)
  }

  render() {
    console.log(this.state)
    const jobName = this.state.jobName
    const workerName = this.state.nameWorker
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
                        <Col lg="8">
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
                              className="form-control-label"
                              htmlFor="input-hours"
                            >
                              Worker Name
                            </label>
                            <Input
                              value={workerName}
                              name="workerName"
                              className="form-control-alternative"
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
                             Date
                            </label>
                            <Input
                              required
                              id="date"
                              className="form-control-alternative"
                              placeholder="Select a date"
                              name="date"
                              value={this.state.date}
                              type="date"
                              onChange={this.handleInput}
                            />
                          </FormGroup>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-hours"
                            >
                              Hours
                            </label>
                            <Input
                              name="time"
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

                            >Add Hours</Button>
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
  users: state.user.users
})

export default connect(mapStateToProps, {addTime})(withRouter(AddTime));
