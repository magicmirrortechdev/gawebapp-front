import React from "react";
import {  withRouter } from 'react-router-dom'
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
class AddExpense extends React.Component {
  state = {
    workerId: ""
  };

  constructor(props) {
    super(props);
    console.log("constructor!!!")
    loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    console.log("jsonParse", loggedUser);
  }

  componentDidMount() {
    console.log(loggedUser);
    this.setState({
      workerId: loggedUser._id
    })
    console.log("montando componente, " );
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

  handleSubmit = async (e, props) => {
    e.preventDefault()
        await axios.patch(Global.url + `addexpense/${this.props.match.params.id}`,this.state)
        this.props.history.push('/admin/jobs')
  }

  render() {

    console.log(this.state)
    if(!this.state.workerId||this.state.workerId===null||this.state.workerId==='') return <p>Loading</p>
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
                      <h3 className="mb-0">Information Expense</h3>
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
                              htmlFor="input-date"
                            >
                              Expense Date
                            </label>
                            <Input
                              className="form-control-alternative"
                              placeholder="Select a date"
                              name="date"
                              type="date"
                              onChange={this.handleInput}
                            />
                          </FormGroup>
                        
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-merchant"
                            >
                              Merchant
                            </label>
                            <Input
                              name="merchant"
                              className="form-control-alternative"
                              placeholder="Enter a merchant (optional)"
                              type="text"
                              onChange={this.handleInput}
                            />
                          </FormGroup>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-merchant"
                            >
                              Vendor
                            </label>
                            <Input
                              name="vendor"
                              className="form-control-alternative"
                              placeholder="Enter name of vendor"
                              type="text"
                              onChange={this.handleInput}
                            />
                          </FormGroup>

                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-category"
                            >
                              Category
                            </label>
                            <Input
                              name="category"
                              className="form-control-alternative"
                              placeholder="Enter a category"
                              type="select"
                              onChange={this.handleInput}
                            >
                            <option>Choose One</option>
                            <option>Job Materials</option>
                            <option>Gas</option>
                            <option>Suplies</option>
                            <option>Sub Contractors</option>
                            </Input>
                          </FormGroup>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Description
                            </label>
                            <Input
                              name="description"
                              className="form-control-alternative"
                              placeholder="Enter a description (optional)"
                              type="text"
                              onChange={this.handleInput}
                            />
                          </FormGroup>

                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Image
                            </label>
                            <Input
                              name="photo"
                              id="photo"
                              className="form-control-alternative"
                              placeholder="Select a photo"
                              type="file"
                              onChange={this.uploadPhoto}
                            />
                          </FormGroup>

                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Total
                            </label>
                            <Input
                              name="total"
                              className="form-control-alternative"
                              placeholder="Enter the total"
                              type="number"
                              onChange={this.handleInput}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Image Preview
                            </label>
                          {this.state.img && <img width="510px" height="500px" src={this.state.img} alt="photo_url" />}
                        </Col>
                      </Row>
                      
                      
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                        
                            <Button
                              className="form-control-alternative"
                              color="info"

                            >Register</Button>
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

export default withRouter(AddExpense);
