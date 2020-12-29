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
import {addUser, getUsers} from '../../redux/actions/userAction'
import {addWorkers} from '../../redux/actions/jobAction'

class AddWorkerJob extends React.Component {
  handleInput = e => {
    e.persist()
    this.setState(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  componentDidMount() {
    if(this.props.users.length === 0) this.props.getUsers()
    this.setState(prevState =>({
      estimate : this.props.jobs.filter(item => item._id === this.props.match.params.id)[0]
    }))
  }

  handleSubmit = async (e, props) => {
    e.preventDefault()
    this.props.addWorkers(this.props.match.params.id, {id2: this.state._id})
    this.props.history.push(`/admin/jobs`)
  }

  render() {
    const {users} = this.props
    if (!this.state || users.length === 0) return <p>Loading</p>
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
                      <h3 className="mb-0">Information Worker</h3>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody> 

                  <Form onSubmit={this.handleSubmit}>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6"> 
                          <FormGroup>
                            <Input
                              name="_id"
                              className="form-control-alternative"
                              type="select"
                              onChange={this.handleInput}>
                            <option>Select worker</option>
                            {users.map((e,i)=>{
                              let bandera = true
                              this.state.estimate.workers.forEach(worker =>{
                                if(worker.workerId === e._id){
                                  bandera = false
                                }
                              })

                              return(
                                !bandera ? null :
                                e.role === 'PROJECT MANAGER' ? <option key={i} value={`${e._id}`}>{e.name} (Project Manager)</option> :
                                e.role === 'WORKER' ? <option key={i} value={`${e._id}`}>{e.name} (Worker)</option> :
                                e.role === 'ADMIN' ? <option key={i} value={`${e._id}`}>{e.name} (Admin)</option> :  null
                                )
                            })
                            }
                            
                            
                            </Input>
                          </FormGroup>
                          
                        </Col>
                      </Row>
                      
                      
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                        
                            <Button
                              className="form-control-alternative"
                              color="info"

                            >Add Worker</Button>
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
  users: state.user.users,
  jobs: state.job.jobs
})

export default connect(mapStateToProps, {addUser, getUsers, addWorkers})(withRouter(AddWorkerJob));
