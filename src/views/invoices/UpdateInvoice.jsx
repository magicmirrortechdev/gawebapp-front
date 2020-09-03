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
  Form
} from "reactstrap";
// core components
import Header from "components/Headers/Header.jsx";
import {connect} from "react-redux";
import {updateInvoice, getJobs} from "../../redux/actions/jobAction";
import configureStore from "../../redux/store";
const {store} = configureStore();

let loggedUser;

class UpdateInvoice extends React.Component {
  state = {
    workerId: "",
    date:'',
    description: '',
    total: parseInt(''),
    jobName: '',
  };

  constructor(props) {
    super(props);
    console.log("constructor!!!")
    const {auth} = store.getState();
    loggedUser = auth.userLogged
  }

  componentDidMount() {

    if (this.props.jobs.length === 0) this.props.history.push(`/admin/jobs`)
    const job = this.props.jobs.filter(item => item._id === this.props.match.params.estimateId)[0]
    this.setState(prevState => {
      let date = ''
      let description = ''
      let total
      const invoices = job.invoices
          invoices.map((e,i)=>{
            if(e._id === this.props.match.params.invoiceId){
              date = e.date
              description = e.description
              total = e.total
            }
            return {date,description,total}
          })
      return {
        ...prevState,
        workerId: loggedUser._id,
        jobName: job.jobName,
        date: date,
        description: description,
        total: total
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


  handleSubmit = async (e, props) => {
    this.props.updateInvoice(this.props.match.params.estimateId, this.props.match.params.invoiceId, this.state)
    this.props.history.push(`/admin/invoices`)
  }

  render() {    
    console.log(this.state)
    if(!this.state.workerId||this.state.workerId==='') return <p>Loading</p>
    

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
                      <h3 className="mb-0">Information Invoice</h3>
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
                            htmlFor="input-jobName"
                            >
                            Job Name
                            </label>
                            <Input
                              disabled
                              name="_id"
                              className="form-control-alternative"
                              type="text"
                              onChange={this.handleInput}
                              value={this.state.jobName}
                            />
                          </FormGroup>
                          <FormGroup>
                            <label
                              className="form-control-label d-inline-block"
                              htmlFor="input-date"
                            >
                              Invoice Date
                            </label>
                            <Input
                              className="form-control-alternative"
                              placeholder="Select a date"
                              id="date"
                              value={this.state.date}
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
                              Total Invoice
                            </label>
                            <Input
                              name="total"
                              className="form-control-alternative"
                              type="number"
                              onChange={this.handleInput}
                              value={this.state.total}
                              step="any"
                            />
                          </FormGroup>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Description
                            </label>
                            <Input
                              defaultValue={this.state.description}
                              name="description"
                              className="form-control-alternative"
                              placeholder="This is an invoice generated with the items of an estimate"
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

const mapStateToProps = state => ({
  jobs: state.job.jobs,
})

export default connect(mapStateToProps, {getJobs, updateInvoice})(withRouter(UpdateInvoice));
