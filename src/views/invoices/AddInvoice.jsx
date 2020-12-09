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
import {connect} from "react-redux";
import {addInvoice} from "../../redux/actions/invoiceAction";
import configureStore from "../../redux/store";
const {store} = configureStore();

let loggedUser;
var fecha = new Date();
var mes = fecha.getMonth()+1;
var dia = fecha.getDate();
var ano = fecha.getFullYear();
if(dia < 10)
  dia='0'+dia; //agrega cero si es menor de 10
if(mes < 10)
  mes='0'+mes //agrega cero si es menor de 10

class AddInvoice extends React.Component {
  state = {
    workerId: "",
    date: ano+"-"+mes+"-"+dia,
  };

  constructor(props) {
    super(props);
    console.log("constructor!!!")
    const {auth} = store.getState();
    loggedUser = auth.userLogged
  }

  componentDidMount() {
    if (this.props.jobs.length === 0) this.props.history.push(`/admin/invoices`)
    this.setState({
      workerId: loggedUser._id,
      jobs: this.props.jobs.filter(job => job.status !== "Closed")
    })
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
    this.props.addInvoice(this.state)
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
                            <Input
                              name="_id"
                              className="form-control-alternative"
                              type="select"
                              onChange={this.handleInput}

                            >
                            <option>Select Job to Create a Invoice</option>
                            {this.state.jobs.map((e,i)=>{
                              return(
                                <option key={i} value={`${e._id}`}>{e.jobName}</option>)
                            })
                            }


                            </Input>
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
                              placeholder="0"
                              type="number"
                              onChange={this.handleInput}
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
                              placeholder="Enter a description (optional)"
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

export default connect(mapStateToProps, {addInvoice})(withRouter(AddInvoice));
