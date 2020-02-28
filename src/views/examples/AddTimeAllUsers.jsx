import React from "react";
import { withRouter } from 'react-router-dom'
import axios from 'axios'


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
import Global from "../../global";

let loggedUser;

class AddTime extends React.Component {
  state = {
    jobs: [],
    nameWorker:'',
    workers:[],
    value: false,
    time: parseInt('')
  };
  constructor(props) {
    super(props);
    console.log("constructor!!!")
    loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    console.log("jsonParse", loggedUser);
  }

  handleInput = e => {
    e.persist()
    this.setState(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
    this.setState(({ value }) => ({ value: !value }))
  }

  componentDidMount() {
    axios
      .get(Global.url + `checkjobs`)
      .then(({ data }) => {
        this.setState(prevState => {
          return {
            ...prevState,
            ...data
          }
        })
        console.log('aquiiii', this.state.jobs)
      })
      .catch(err => {
        console.log(err)
      })
      
  }

  componentDidUpdate(prevProps, prevState){
    if (prevState.value !== this.state.value) {
    axios
      .get(Global.url + `estimatedetail/${this.state._id}`)
      .then(({ data }) => {
        this.setState(prevState => {
          return {
            ...prevState,
            workers: data.estimate.workers,
            ...data
          }
        })
        console.log('did Mount', this.state.workers)
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
  toggle = () => {
  }

  handleSubmit = (e, props) => {
    const id = this.state.worker_id.split(".")[0]
    const workerId = this.state.worker_id.split(".")[1]
    e.preventDefault()
        axios
          .patch(Global.url + `addtime/${id}/${workerId}`,this.state)
          .then(response => {
            this.props.history.push(`/admin/time`)
            console.log(response)
          })
          .catch(err => {
            console.log(err.response)
          })
  }

  render() {
    console.log(this.state)
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
                              name="_id"
                              className="form-control-alternative"
                              type="select"
                              onChange={this.handleInput}
                              onClick={this.toggle}
                              
                            >
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
                              name="worker_id"
                              className="form-control-alternative"
                              type="select"
                              onChange={this.handleInput}
                              
                            >
                            <option>Select worker</option>
                            {this.state.workers.map((e,i)=>{
                              return(
                                loggedUser.name === e.workerId.name ? <option selected  key={i} value={`${e._id}.${e.workerId._id}`}>{loggedUser.name}</option> :
                                <option  key={i} value={`${e._id}.${e.workerId._id}`}>{e.workerId.name}</option>)
                            })
                            }
                            
                            
                            </Input>
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
                              type="number"
                              onChange={this.handleInput}
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

export default withRouter(AddTime);
