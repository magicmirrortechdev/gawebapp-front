import React from "react";
import { withRouter } from 'react-router-dom'
import AuthService from '../../services/services'
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
const authService = new AuthService()


class AddWorker extends React.Component {
  state = {
  };

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
        authService
          .addWorker(this.state)
          .then(response => {
            this.props.history.push(`workers`)
            console.log(response)
          })
          .catch(err => {
            console.log(err.response)
          })
  }

  render() {
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
                              Display Name
                            </label>
                            <Input
                              required
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
                              Type
                            </label>
                            <Input
                              required
                              name="role"
                              className="form-control-alternative"
                              type="select"
                              onChange={this.handleInput}
                            >
                            <option selected disabled >Choose One</option>
                            <option>WORKER</option>
                            <option>PROJECT MANAGER</option>
                            </Input>
                          </FormGroup>
                        
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Email
                            </label>
                            <Input
                              required
                              name="email"
                              className="form-control-alternative"
                              placeholder="Enter a email"
                              type="email"
                              onChange={this.handleInput}
                            />
                          </FormGroup>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-password"
                            >
                              Password
                            </label>
                            <Input
                              required
                              name="password"
                              className="form-control-alternative"
                              placeholder="Enter a password"
                              type="password"
                              onChange={this.handleInput}
                            />
                          </FormGroup>

                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Address
                            </label>
                            <Input
                              required
                              name="address"
                              className="form-control-alternative"
                              placeholder="Enter an address"
                              type="text"
                              onChange={this.handleInput}
                            />
                          </FormGroup>

                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-contactName"
                            >
                              Contact Name
                            </label>
                            <Input
                              required
                              name="contact"
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
                              Phone
                            </label>
                            <Input
                              required
                              name="phone"
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
                              Mobile
                            </label>
                            <Input
                              required
                              name="mobile"                          
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
                              Activity
                            </label>
                            <Input
                              required
                              name="activity"
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
                              Type
                            </label>
                            <Input
                              required
                              name="type"
                              className="form-control-alternative"
                              type="select"
                              onChange={this.handleInput}
                            >
                            <option>1099</option>
                            <option>Employee</option>
                            </Input>
                          </FormGroup>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Add Documents
                            </label>
                            <Input
                              required
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
                              Payment Rate
                            </label>
                            <Input
                              required
                              name="payment"
                              className="form-control-alternative"
                              type="number"
                              placeholder="$0.00 USD"
                              onChange={this.handleInput}
                            />
                          </FormGroup>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Effective Rate 
                            </label>
                            <Input
                              required
                              name="effective"
                              className="form-control-alternative"
                              type="number"
                              placeholder="$0.00 USD"
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

export default withRouter(AddWorker);
