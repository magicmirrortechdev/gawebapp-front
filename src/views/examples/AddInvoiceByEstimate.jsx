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
    loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    console.log("jsonParse", loggedUser);
  }

  componentDidMount() {
    console.log(loggedUser);
    this.setState({
      workerId: loggedUser._id
    })
    axios
      .get(Global.url + `estimatedetail/${this.props.match.params.id}`)
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
            jobName: data.estimate.jobName,
            ...data.estimate,
          }
        })
        let subtotal = this.state.items.reduce((acc, current, i) => acc + current.subtotal, 0)
        let tax = (parseInt(this.state.tax) * subtotal) / 100
        let discount = parseInt(this.state.discount)
        let paid = parseInt(this.state.paid)
        this.setState(prevState=>{return{total:  parseInt(subtotal + tax - discount - paid)}})
        console.log(this.state)
      })
      .catch(err => {
        console.log(err.response)
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
        await axios.patch(Global.url + `convertinvoice/${this.props.match.params.id}`,this.state)
        this.props.history.push('/admin/invoices')
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

export default withRouter(AddInvoice);
