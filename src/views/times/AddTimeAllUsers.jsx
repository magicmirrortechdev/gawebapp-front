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
import {addTime} from "../../redux/actions/jobAction"

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
    time: parseInt(''),
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

    if(e.target.name === '_id'){
        this.state.jobs.forEach((item) => {
            if(item._id === e.target.value){
                let user = null;
                item.workers.forEach((worker) => {
                    if(worker.workerId && worker.workerId._id === loggedUser._id){
                        user = worker;
                    }
                });

                if(user !== null){
                    this.setState(prevState => ({
                        ...prevState,
                        workers: item.workers,
                        worker_id: user._id+'.'+ user.workerId._id,
                    }))
                }else{
                    this.setState(prevState => ({
                        ...prevState,
                        workers: item.workers
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

    const id = this.state.worker_id ? this.state.worker_id.split(".")[0] : undefined
    const workerId = this.state.worker_id ? this.state.worker_id.split(".")[1] : undefined
    this.setState(prevState =>{
      return{
        spinner: true
      }
    })
    this.props.addTime(id, workerId, this.state)
    this.props.history.push(`/admin/time`)
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
                            { this.state.workers.map((e,i)=>{
                              if(!e.workerId)return <option>Worker Delete</option>
                              return(
                                loggedUser._id === e.workerId._id ?  <option selected key={i} value={ `${e._id}.${e.workerId._id}`}>{e.workerId.name}</option> :
                                 <option  key={i} value={`${e._id}.${e.workerId._id}`}>{e.workerId.name}</option>)
                            })
                            }
                            
                            
                            </Input>
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
