import React from "react";
import {  withRouter } from 'react-router-dom'
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
  Form,
  Table
} from "reactstrap";
// core components
import Header from "components/Headers/Header.jsx";
const authService = new AuthService()

let date = new Date()
let day = date.getDate()
let month = date.getMonth() + 1
let year = date.getFullYear()

class UpdateJob extends React.Component {
  
  state = {
    
    name:'',
    email:'',
    address:'',
    items:[],
    itemName: '',
    description: '',
    comments:'',
    quantity: parseInt(''),
    rate: parseInt(''),
    subtotal: 0,
    tax: parseInt(''),
    discount: parseInt(''),
    paid: parseInt(''),
    total: 0,
    dateCreate: '',
    jobName:''
  };

  componentDidMount() {
    axios
      .get(`http://localhost:3000/estimatedetail/${this.props.match.params.id}`)
      .then(({ data }) => {
        this.setState(prevState => {
          return {
            
            ...prevState,
            name: data.estimate.clientId.name,
            email: data.estimate.clientId.email,
            address: data.estimate.clientId.address,
            tax: data.estimate.tax,
            discount: data.estimate.discount,
            paid: data.estimate.paid,
            comments: data.estimate.comments,
            ...data.estimate
          }
          
        })
        console.log(this.state)
      })
      .catch(err => {
        console.log(err)
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
    axios
      .patch(`http://localhost:3000/estimateupdate/${this.props.match.params.id}`, this.state)
      .then((response) => {
        this.props.history.push(`/admin/jobs`)
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
  
  console.log('el stateee',this.state)
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
                      <h3 className="mb-0">Information Estimate</h3>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody> 

                  <Form onSubmit={this.handleSubmit}>
                    <div className="pl-lg-4">
                      <Row>
                        <Col md="8">
                        <FormGroup>
                        <label
                              className="form-control-label d-inline-block"
                              htmlFor="input-name"
                            >
                              Client Name
                            </label>
                            <Input
                              readOnly
                              defaultValue={`${this.state.name}`}
                              className="form-control-alternative"
                              placeholder="Enter the name client"
                              name="clientName"
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
                          <Row>
                        <Col lg="6">
                          <FormGroup>
                        
                            <Button
                              className="form-control-alternative"
                              color="info"

                            >Update Job</Button>
                          </FormGroup>
                        </Col>
                      </Row>
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

export default withRouter(UpdateJob);
