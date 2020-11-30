import React from "react";

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
import {updateClient} from "../../redux/actions/clientAction";
import {connect} from "react-redux";

class UpdateClient extends React.Component {
  state = {
    firstName:'',
    lastName:'',
    email:'',
    address:'',
    contact:'',
    phone:'',
    mobile:'',
    website:'',
    tax:'',
    customPayment:'',
    notes:''
  };

  componentDidMount() {
    const client = this.props.clients.filter(item => item._id === this.props.match.params.id)[0]
    this.setState(prevState => {
      return {
        ...prevState,
        firstName: client.firstName,
        lastName: client.lastName,
        email: client.email,
        address: client.address,
        contact: client.contact,
        phone: client.phone,
        mobile: client.mobile,
        website: client.website,
        tax: client.tax,
        customPayment: client.customPayment,
        notes:client.notes,
        ...client,
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

  handleSubmit = (e, props) => {
    e.preventDefault()
    this.props.updateClient(this.props.match.params.id, this.state);
    this.props.history.push(`/admin/clients`)
  }

  render() {
    const client = this.state
    console.log(client);
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
                      <h3 className="mb-0">Information Client</h3>
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
                              htmlFor="input-username">
                              Client First Name
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-username"
                              defaultValue={client.firstName}
                              placeholder="Enter a first name"
                              name="firstName"
                              type="text"
                              onChange={this.handleInput}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                                className="form-control-label d-inline-block"
                                htmlFor="input-username">
                              Client Last Name
                            </label>
                            <Input
                                className="form-control-alternative"
                                id="input-username"
                                defaultValue={client.lastName}
                                placeholder="Enter a last name"
                                name="lastName"
                                type="text"
                                onChange={this.handleInput}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email">
                              Email address
                            </label>
                            <Input
                              name="email"
                              className="form-control-alternative"
                              id="input-email"
                              defaultValue={client.email}
                              placeholder="Enter an email address"
                              type="email"
                              onChange={this.handleInput}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name">
                              Billing Address
                            </label>
                            <Input
                              defaultValue={client.address}
                              name="address"
                              className="form-control-alternative"
                              placeholder="Enter the Billing Address"
                              type="text"
                              onChange={this.handleInput}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name">
                              Contact Name
                            </label>
                            <Input
                              defaultValue={client.contact}
                              name="contact"
                              className="form-control-alternative"
                              placeholder="Enter the Contact Name"
                              type="text"
                              onChange={this.handleInput}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name">
                              Phone
                            </label>
                            <Input
                              defaultValue={client.phone}
                              name="phone"
                              className="form-control-alternative"
                              placeholder="Enter the phone number"
                              type="number"
                              onChange={this.handleInput}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name">
                              Mobile
                            </label>
                            <Input
                            defaultValue={client.mobile}
                              name="mobile"
                              className="form-control-alternative"
                              placeholder="Enter the mobile number"
                              type="number"
                              onChange={this.handleInput}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name">
                              Website
                            </label>
                            <Input
                            defaultValue={client.website}
                              name="website"
                              className="form-control-alternative"
                              placeholder="Enter your website"
                              type="text"
                              onChange={this.handleInput}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name">
                              Tax Number
                            </label>
                            <Input
                            defaultValue={client.tax}
                              name="tax"
                              className="form-control-alternative"
                              placeholder="Select a Tax Number"
                              type="number"
                              onChange={this.handleInput}
                              step="any"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name">
                              Custom Payment Terms
                            </label>
                            <Input
                              value={client.customPayment}
                              name="customPayment"
                              className="form-control-alternative"
                              placeholder="Select one"
                              type="select"
                              onChange={this.handleInput}>
                            <option value="None">None</option>
                            <option value="7 days">7 days</option>
                            <option value="14 days">14 days</option>
                            <option value="21 days">21 days</option>
                            <option value="30 days">30 days</option>
                            <option value="45 days">45 days</option>
                            <option value="60 days">60 days</option>
                            <option value="90 days">90 days</option>
                            <option value="Custom">Custom</option>
                            </Input>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name">
                              Notes
                            </label>
                            <Input
                              value={client.notes}
                              name="notes"
                              className="form-control-alternative"
                              placeholder="Enter your notes"
                              type="textarea"
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
                              color="info">
                              Save</Button>
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
  clients: state.client.clients,
})

export default connect(mapStateToProps, {updateClient})(UpdateClient);
