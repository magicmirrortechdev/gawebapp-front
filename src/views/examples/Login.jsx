import React from "react";
import { withRouter } from 'react-router-dom'

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
} from "reactstrap";
import {connect} from "react-redux";
import {logInUser} from "../../redux/actions/authAction";

class Login extends React.Component {

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.userLogged) {
      return nextProps.history.push('/admin/index')
    }
  }

  componentDidMount(props) {
    if(this.props.userLogged){
      return this.props.history.push('/admin/index')
    }
  }

  handleSubmit =  (e, props) => {
    e.preventDefault()
    this.props.logInUser(this.state)
  }
  
  handleInput = e => {
    e.persist()
    this.setState(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  render() {
    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Sign in with credentials <i className="fas fa-key"></i></small>
              </div>
              <Form role="form">
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Email" type="email" name="email" onChange={this.handleInput} />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Password" type="password" name="password" onChange={this.handleInput}/>
                  </InputGroup>
                </FormGroup>
                <div className="custom-control custom-control-alternative custom-checkbox">
                  <input
                    className="custom-control-input"
                    id=" customCheckLogin"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor=" customCheckLogin"
                  >
                    <span className="text-muted">Remember me</span>
                  </label>
                  
                </div>
                
                <div className="text-center">
                  <Button className="my-4" color="primary" type="button" onClick={this.handleSubmit} >
                    Sign in
                  </Button>
                  <br/>
                  
                </div>
                  <span>
                          Forgot Password?
                          <a href="/forgotpassword">
                            &nbsp; Reset Here
                          </a>
                  </span>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </>
    );
  }
}

const mapStateToProps = state => ({
  err: state.auth.loginErr,
  userLogged: state.auth.userLogged,
})

export default connect(mapStateToProps, {logInUser})(withRouter(Login));
