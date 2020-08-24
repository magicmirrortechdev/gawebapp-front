import React from "react";
import {  withRouter } from 'react-router-dom'

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
} from "reactstrap";
// core components
import Header from "components/Headers/Header.jsx";
import {connect} from "react-redux";
import {updateJob} from "../../redux/actions/jobAction";

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
    const job = this.props.jobs.filter(item => item._id === this.props.match.params.id)[0]

    this.setState(prevState => {
      return {
        ...prevState,
        name: job.clientId.name,
        email: job.clientId.email,
        address: job.clientId.address,
        tax: job.tax,
        discount: job.discount,
        paid: job.paid,
        comments: job.comments,
        ...job
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
    this.props.updateJob(this.props.match.params.id, this.state)
    this.props.history.push(`/admin/jobs`)
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

                            >Save</Button>
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

const mapStateToProps = state => ({
  jobs: state.job.jobs,
})

export default connect(mapStateToProps, {updateJob})(withRouter(UpdateJob));
