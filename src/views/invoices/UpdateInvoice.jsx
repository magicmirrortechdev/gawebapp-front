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
import moment from 'moment'
import {getInvoices, updateInvoice} from "../../redux/actions/invoiceAction";
import configureStore from "../../redux/store";
const {store} = configureStore();

let loggedUser;

class UpdateInvoice extends React.Component {
  state = {
    workerId: "",
    invoiceDate:'',
    invoiceDescription: '',
    invoiceTotal: parseInt(''),
    jobName: '',
  };

  constructor(props) {
    super(props);
    const {auth} = store.getState();
    loggedUser = auth.userLogged
  }

  componentDidMount() {
    if (this.props.invoices.length === 0) this.props.history.push(`/admin/invoices`)
    const invoice = this.props.invoices.filter(item => item._id === this.props.match.params.invoiceId)[0]
    this.setState(prevState => {
      const job = this.props.jobs.filter(job => job._id === invoice.jobId)[0]
      return {
        ...prevState,
        workerId: loggedUser._id,
        jobName: job.jobName ,
        invoiceDate: moment(invoice.invoiceDate).format("YYYY-MM-DD"),
        invoiceDescription: invoice.invoiceDescription,
        invoiceTotal: invoice.invoiceTotal
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
    this.props.updateInvoice(this.props.match.params.invoiceId, this.state)
    this.props.history.push(`/admin/invoices`)
  }

  render() {
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
                              value={this.state.invoiceDate}
                              name="invoiceDate"
                              type="date"
                              onChange={this.handleInput}
                            />
                          </FormGroup>

                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-merchant">
                              Total Invoice
                            </label>
                            <Input
                              name="invoiceTotal"
                              className="form-control-alternative"
                              type="number"
                              onChange={this.handleInput}
                              value={this.state.invoiceTotal}
                              step="any"
                            />
                          </FormGroup>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name">
                              Description
                            </label>
                            <Input
                              defaultValue={this.state.invoiceDescription}
                              name="invoiceDescription"
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
                              color="info">Save</Button>
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
  invoices: state.invoice.invoices,
  jobs: state.job.jobs
})

export default connect(mapStateToProps, {getInvoices, updateInvoice})(withRouter(UpdateInvoice));
