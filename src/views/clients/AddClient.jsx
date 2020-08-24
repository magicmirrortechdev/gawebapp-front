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
import {connect} from "react-redux";
import {addClient} from "../../redux/actions/clientAction";

class AddClient extends React.Component {
  state = {
    name:'',
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


  handleInput = e => {
    e.persist()
    this.setState(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  handleSubmit = (e, props) => {
    e.preventDefault()
    this.props.addClient(this.state)
    this.props.history.push(`clients`)
  }

  render() {
    const client = this.state
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
                              htmlFor="input-username"
                            >
                              Client Name
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-username"
                              defaultValue={client.name}
                              placeholder="Enter a name"
                              name="name"
                              type="text"
                              onChange={this.handleInput}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
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
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
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
                              htmlFor="input-last-name"
                            >
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
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
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
                              htmlFor="input-last-name"
                            >
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
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
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
                              htmlFor="input-last-name"
                            >
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
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Custom Payment Terms
                            </label>
                            <Input
                              defaultValue={client.customPayment}
                              name="customPayment"
                              className="form-control-alternative"
                              placeholder="Select one"
                              type="select"
                              onChange={this.handleInput}
                            >
                            <option>None</option>
                            <option>7 days</option>
                            <option>14 days</option>
                            <option>21 days</option>
                            <option>30 days</option>
                            <option>45 days</option>
                            <option>60 days</option>
                            <option>90 days</option>
                            <option>Custom</option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Notes
                            </label>
                            <Input
                            defaultValue={client.notes}
                              name="notes"
                              className="form-control-alternative"
                              placeholder="Enter your notes"
                              type="text"
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

export default connect(null, {addClient})(AddClient);
