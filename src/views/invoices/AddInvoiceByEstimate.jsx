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
import {store} from "../../redux/store";
import {connect} from "react-redux";
import {convertInvoice, getJobs} from "../../redux/actions/jobAction";

let loggedUser;
var fecha = new Date(); 
      var mes = fecha.getMonth()+1; 
      var dia = fecha.getDate(); 
      var ano = fecha.getFullYear(); 
      if(dia<10)
        dia='0'+dia; //agrega cero si es menor de 10
      if(mes<10)
        mes='0'+mes //agrega cero si es menor de 10
class AddInvoice extends React.Component {
  state = {
    workerId: "",
    date:ano+"-"+mes+"-"+dia,
    name: '',
      email: '',
      address: '',
      items: [],
      itemName: '',
      description: '',
      comments: '',
      subtotal: parseInt(''),
      tax: parseInt(''),
      discount: parseInt(''),
      paid: parseInt(''),
      total: 0,
      dateCreate: '',
      jobName: '',
  };

  constructor(props) {
    super(props);
    console.log("constructor!!!")
    const {auth} = store.getState();
    loggedUser = auth.userLogged
  }

  componentDidMount() {
    console.log(loggedUser);
    const job = this.props.jobs.filter(item => item._id === this.props.match.params.id)[0]
    let subtotal = job.items.reduce((acc, current, i) => acc + current.subtotal, 0)
    let tax = (parseInt(job.tax) * subtotal) / 100
    let discount = parseInt(job.discount)
    let paid = parseInt(job.paid)

    this.setState(prevState => {
      return {
        ...prevState,
        workerId: loggedUser._id,
        name: job.clientId.name,
        email: job.clientId.email,
        address: job.clientId.address,
        tax: job.tax,
        discount: job.discount,
        paid: job.paid,
        comments: job.comments,
        jobName: job.jobName,
        items: job.items,
        total:  parseInt(subtotal + tax - discount - paid)
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
    e.preventDefault()
    this.props.convertInvoice(this.props.match.params.id, this.state)
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

export default connect(mapStateToProps, {getJobs, convertInvoice})(withRouter(AddInvoice));
