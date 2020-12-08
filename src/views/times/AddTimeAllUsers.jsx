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
import {addTime} from "../../redux/actions/timeAction"
import configureStore from "../../redux/store";
const {store} = configureStore();

let loggedUser;
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
    jobs: [],
    nameWorker:'',
    workers:[],
    value: false,
    hours: parseInt(''),
    date: ano+"-"+mes+"-"+dia,
    spinner: false
  };
  constructor(props) {
    super(props);
    const {auth} = store.getState();
    loggedUser = auth.userLogged
  }

  handleInput = e => {
    e.persist()
    this.setState(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
    this.setState(({ value }) => ({ value: !value }))

    if(e.target.name === 'jobId'){
        this.state.jobs.forEach((item) => {
            if(item._id === e.target.value){
                let user = null;
                let user_ = null;
                let users = []
                item.workers.forEach((worker) => {
                    if(worker.workerId && worker.workerId === loggedUser._id){
                        user = this.props.users.filter(item => item._id === worker.workerId)[0]
                        users.push(user)
                    }else{
                        user_ = this.props.users.filter(item => item._id === worker.workerId)[0]
                        users.push(user_)
                    }
                });

                if(user !== null){
                    this.setState(prevState => ({
                        ...prevState,
                        workers: users,
                        userId: user._id,
                    }))
                }else{
                    this.setState(prevState => ({
                        ...prevState,
                        workers: users
                    }))
                }
            }
        })
    }
  }

  componentDidMount() {
    this.setState(prevState => {
        return {
            ...prevState,
            jobs : this.props.jobs.filter(item => item.status === "Approve")
        }
     })
  }

  handleSubmit = (e, props) => {
    e.preventDefault()

    this.setState(prevState =>{
      return{
        spinner: true
      }
    })
    this.props.addTime(this.state)
    this.props.history.push(`/admin/time`)
  }

  render() {
      console.log(">>>>", this.state)
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
                            <Input
                              name="jobId"
                              className="form-control-alternative"
                              type="select"
                              onChange={this.handleInput}>
                            <option>Select Job to Add Time</option>
                            {this.state.jobs.map((e,i)=>{
                              return(
                                <option key={i} value={`${e._id}`}>{e.jobName}</option>)
                            })
                            }
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Input
                              name="userId"
                              className="form-control-alternative"
                              type="select"
                              onChange={this.handleInput}>
                            <option>Select worker</option>
                            { this.state.workers.map((e,i)=>{
                              if(!e._id)return <option>Worker Delete</option>
                              return(
                                loggedUser._id === e._id ?  <option selected key={i} value={ `${e._id}`}>{e.name}</option> :
                                 <option key={i} value={`${e._id}`}>{e.name}</option>)
                            })
                            }
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <label
                              className="form-control-label d-inline-block"
                              htmlFor="input-date">
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
                              htmlFor="input-hours">
                              Hours
                            </label>
                            <Input
                              name="hours"
                              className="form-control-alternative"
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
                              color="info">Add Hours</Button>
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
