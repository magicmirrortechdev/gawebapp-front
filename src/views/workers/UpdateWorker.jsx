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
import {connect} from "react-redux";
import {updateUser} from "../../redux/actions/userAction";

class UpdateWorker extends React.Component {
  state = {
    name:'',
    role:'',
    email:'',
    address:'',
    contact:'',
    phone:'',
    mobile:'',
    activity:'',
    type:'',
    payment:'',
    effective:'',

  };
  workerOptions = () => {
    return [
       {value: "WORKER", label: "WORKER"},
       {value: "PROJECT MANAGER", label: "PROJECT MANAGER"},
    ]
  }
  typeOptions = () => {
    return [
       {value: "1099", label: "1099"},
       {value: "Employee", label: "Employee"},
    ]
  }

  componentDidMount() {
    const user = this.props.users.filter(item => item._id === this.props.match.params.id)[0]
    this.setState(prevState => {
      return {
        ...prevState,
        name: user.name,
        role: user.role,
        email: user.email,
        address:user.address,
        contact:user.contact,
        phone: user.phone,
        mobile:user.mobile,
        activity:user.activity,
        type:user.type,
        payment:user.payment,
        effective:user.effective,
      }
    })
  }

  handleInput = e => {
    e.persist()
    this.setState(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  uploadPhoto = async e => {
    const file = new FormData()
    file.append('photo', e.target.files[0])

    const {
      data: { img }
    } = await axios.post(Global.url + 'upload', file)
    this.setState(prevState => ({ ...prevState, img }))
  }

  handleSubmit = (e, props) => {
    e.preventDefault()
    this.props.updateUser(this.props.match.params.id, this.state);
    this.props.history.push(`/admin/workers`)
  }

  render() {
    const user = this.state
    if (!this.state) return <p>Loading</p>
    const typeUser = user.type
    const roles = [{role: 'WORKER'}, {role: 'PROJECT MANAGER'}]
    const types = [{type: '1099'}, {type: 'Employee'}]
    return (
      <>
        <Header forms={true}/>
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
                            <label
                              className="form-control-label d-inline-block"
                              htmlFor="input-name"
                            >
                              Worker Name *
                            </label>
                            <Input
                              defaultValue={user.name}
                              className="form-control-alternative"
                              placeholder="Enter the worker name"
                              name="name"
                              type="text"
                              onChange={this.handleInput}
                            />
                          </FormGroup>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-role"
                            >
                              Role *
                            </label>
                            <Input
                              name="role"
                              className="form-control-alternative"
                              type="select"
                              onChange={this.handleInput}
                            >
                            {roles.map((e,i)=>{
                              return(
                                user.role === e.role ? <option selected key={i}>{user.role}</option>: 
                                <option>{e.role}</option>
                              )
                            })}
                            </Input>
                          </FormGroup>
                        
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Email *
                            </label>
                            <Input
                              name="email"
                              defaultValue={user.email}
                              className="form-control-alternative"
                              placeholder="Enter a email"
                              type="email"
                              onChange={this.handleInput}
                            />
                          </FormGroup>

                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Address *
                            </label>
                            <Input
                              name="address"
                              className="form-control-alternative"
                              placeholder="Enter an address"
                              type="text"
                              defaultValue={user.address}
                              onChange={this.handleInput}
                            />
                          </FormGroup>

                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-contactName"
                            >
                              Contact Name *
                            </label>
                            <Input
                              name="contact"
                              defaultValue={user.contact}
                              className="form-control-alternative"
                              placeholder="Enter a contact name"
                              type="text"
                              onChange={this.handleInput}
                            />
                          </FormGroup>

                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-phone"
                            >
                              Phone *
                            </label>
                            <Input
                              name="phone"
                              defaultValue={user.phone}
                              className="form-control-alternative"
                              placeholder="Enter the phone number"
                              type="number"
                              onChange={this.handleInput}
                            />
                          </FormGroup>

                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-mobile"
                            >
                              Mobile *
                            </label>
                            <Input
                              name="mobile"
                              defaultValue={user.mobile}                      
                              className="form-control-alternative"
                              placeholder="Enter the mobile number"
                              type="number"
                              onChange={this.handleInput }
                            />
                          </FormGroup>

                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-activity"
                            >
                              Activity *
                            </label>
                            <Input
                              name="activity"
                              defaultValue={user.activity}
                              className="form-control-alternative"
                              placeholder="Enter an activity (plumber, carpenter)"
                              type="text"
                              onChange={this.handleInput}
                            />
                          </FormGroup>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-type"
                            >
                              Type *
                            </label>
                            <Input
                              name="type"
                              className="form-control-alternative"
                              type="select"
                              defaultValue={this.typeOptions().find(op => {
                                  return op.value === typeUser
                                })}
                              onChange={this.handleInput}
                            >
                            {types.map((e,i)=>{
                              return(
                                user.type === e.type ? <option selected key={i}>{user.type}</option>: 
                                <option>{e.type}</option>
                              )
                            })}
                            </Input>
                          </FormGroup>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Add More Documents *
                            </label>
                            <Input
                              name="photo"
                              id="photo"
                              className="form-control-alternative"
                              type="file"
                              onChange={this.uploadPhoto}
                              multiple
                            />
                          </FormGroup>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Payment Rate *
                            </label>
                            <Input
                              name="payment"
                              defaultValue={user.payment}
                              className="form-control-alternative"
                              type="number"
                              placeholder="$0.00"
                              onChange={this.handleInput}
                              step="any"
                            />
                          </FormGroup>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Effective Rate * 
                            </label>
                            <Input
                              defaultValue={user.effective}
                              name="effective"
                              className="form-control-alternative"
                              type="number"
                              placeholder="$0.00"
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

                            >Save</Button>
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
})

export default connect(mapStateToProps, {updateUser})(withRouter(UpdateWorker));
