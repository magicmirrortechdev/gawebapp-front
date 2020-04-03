import React from "react";
import { withRouter } from 'react-router-dom'
import AuthService from '../../services/services'


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
const authService = new AuthService()


class AddJob extends React.Component {
  state = {
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
        authService
          .addJob(this.state)
          .then(response => {
            this.props.history.push(`jobs`)
            console.log(response)
          })
          .catch(err => {
            console.log(err.response)
            alert(err.response.data.msg || err.response.data.err.message)
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
                      <h3 className="mb-0">New Job</h3>
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
                              htmlFor="input-nameClient"
                            >
                              Client Name
                            </label>
                            <Input
                              className="form-control-alternative"
                              placeholder="Enter a billing name or search your clients list"
                              name="name"
                              type="text"
                              onChange={this.handleInput}
                            />
                          </FormGroup>
                          <FormGroup>
                            <label
                              className="form-control-label d-inline-block"
                              htmlFor="input-nameClient"
                            >
                              Client Email
                            </label>
                            <Input
                              className="form-control-alternative"
                              placeholder="Enter a billing name or search your clients list"
                              name="email"
                              type="email"
                              onChange={this.handleInput}
                            />
                          </FormGroup>
                          <FormGroup>
                          <label
                            className="form-control-label d-inline-block"
                            htmlFor="input-nameClient"
                          >
                            Address Client
                          </label>
                          <Input
                            className="form-control-alternative"
                            placeholder="Enter a billing name or search your clients list"
                            name="address"
                            type="text"
                            onChange={this.handleInput}
                          />
                          </FormGroup>

                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-dateStart"
                            >
                              Date Start
                            </label>
                            <Input
                              name="dateStart"
                              className="form-control-alternative"
                              type="date"
                              onChange={this.handleInput}
                            />
                          </FormGroup>

                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-dateEnd"
                            >
                              Date End
                            </label>
                            <Input
                              name="dateEnd"
                              className="form-control-alternative"
                              type="date"
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

export default withRouter(AddJob);
