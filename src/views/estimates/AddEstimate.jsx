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
  Form,
  Table
} from "reactstrap";
// core components
import Header from "components/Headers/Header.jsx";
import Global from "../../global";
import {connect} from "react-redux";
import {addEstimate} from "../../redux/actions/jobAction";

var fecha = new Date();
      var mes = fecha.getMonth()+1;
      var dia = fecha.getDate();
      var ano = fecha.getFullYear();
      if(dia<10)
        dia='0'+dia; //agrega cero si es menor de 10
      if(mes<10)
        mes='0'+mes //agrega cero si es menor de 10

class AddEstimate extends React.Component {

  state = {
    name:'',
    address:'',
    items:[],
    itemName: '',
    description: '',
    photo:[],
    quantity: '',
    rate: '',
    estimateSubtotal: 0,
    estimateTax: 0,
    estimateDiscount: 0,
    estimatePaid: 0,
    estimateTotal: 0,
    dateCreate: ano+"-"+mes+"-"+dia,
    jobName:''
  };

  addToCart = (product) =>{
    var joined = this.state.items.concat(product);
    if (this.state.itemName === ''){
      alert('The field Item Name is required to add item')
    }
    else if (this.state.quantity === ''){
      alert('The field quantity is required to add item')
    }
    else if( this.state.rate === ''){
      alert('The field rate is required to add item')
    }
    else{
      document.getElementById("itemName").value = "";
      document.getElementById("description").value = "";
      document.getElementById("quantity").value = "";
      document.getElementById("rate").value = "";
      this.setState({items: joined})

    }
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
    } = await axios.post(Global.url + 'v2/upload', file)
    this.setState(prevState => ({ ...prevState, img }))
  }

  handleSubmit = (e, props) => {
    e.preventDefault()
    this.props.addEstimate(this.state)
    this.props.history.push(`estimates`)
  }

  render() {
    let date = new Date()
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    let product =  {
      itemName: this.state.itemName,
      description: this.state.description,
      quantity: parseInt(this.state.quantity),
      rate: parseInt(this.state.rate),
      subtotal: parseInt(this.state.quantity * this.state.rate),
    }

    let subtotal = this.state.items.reduce((acc, current, i) => acc + current.subtotal, 0)
    let tax = parseInt(this.state.estimateTax) * subtotal / 100
    let discount = parseInt(this.state.estimateDiscount)
    let paid = parseInt(this.state.estimatePaid)
    let clientName = this.state.clientName
    let address = this.state.address
    let estimateTotal = subtotal + tax - discount - paid
    let jobName = address + clientName

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
                              htmlFor="input-name" >
                              Client Name *
                            </label>
                            <Input
                              className="form-control-alternative"
                              placeholder="Enter the name client"
                              name="name"
                              required
                              type="text"
                              onChange={this.handleInput}  />
                            <br/>
                            <label
                              className="form-control-label d-inline-block"
                              htmlFor="input-name" >
                              Client Email *
                            </label>
                            <Input
                              className="form-control-alternative"
                              placeholder="Enter the email client"
                              name="email"
                              type="email"
                              required
                              onChange={this.handleInput}
                            />
                            <br/>
                            <label
                              className="form-control-label d-inline-block"
                              htmlFor="input-name" >
                              Address Estimate *
                            </label>
                            <Input
                              className="form-control-alternative"
                              placeholder="Enter the client Address"
                              name="address"
                              required
                              type="text"
                              onChange={this.handleInput}/>
                          </FormGroup>

                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-merchant">
                              Items
                            </label>
                            <Table className="align-items-center table-flush" responsive>
                              <thead className="thead-light">
                              <tr>
                                <th scope="col">Item Name</th>
                                <th scope="col">Description</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Rate</th>
                                <th scope="col">Total</th>
                                <th scope="col">Options</th>
                              </tr>
                             </thead>
                              <tbody>
                               {this.state.items.map((el, i) => (
                                <tr key={i}>
                                  <td >
                                   {el.itemName}
                                  </td>
                                <td>
                                  {el.description}
                                </td>
                                <td>
                                  {el.quantity}
                                </td>
                                <td>
                                  ${el.rate}
                                </td>
                                <td>
                                  $ {el.subtotal}
                                </td>
                                <td>
                                <Button onClick={e =>
                                    this.setState(prevState => {
                                      var filter = this.state.items.filter(e => e !== this.state.items[i])
                                      this.setState({items: filter})
                                    })
                                  }
                                style={{width:'100px', height:'20px', fontSize:'10px', paddingTop:'0'}} className="btn icon-btn btn-danger">
                                <i className="nc-icon nc-simple-remove" />
                                  Delete
                                  </Button>
                                </td>
                               </tr>
                                 )) }
                              </tbody>
                            </Table>
                            <br/>
                            <label className="form-control-label" htmlFor="input-merchant">Item Name *</label>
                            <Input
                              name="itemName"
                              className="form-control-alternative"
                              placeholder="Enter a name of item"
                              type="text"
                              id="itemName"
                              onChange={this.handleInput}/>
                            <br/>
                            <label className="form-control-label" htmlFor="input-merchant">Description</label>
                            <Input
                              name="description"
                              className="form-control-alternative"
                              placeholder="Enter a description of item"
                              type="text"
                              id="description"
                              onChange={this.handleInput}/>
                            <br/>
                            <label className="form-control-label" htmlFor="input-merchant">Quantity *</label>
                            <Input
                              name="quantity"
                              className="form-control-alternative"
                              placeholder="Enter a quantity of item"
                              type="number"
                              id="quantity"
                              onChange={this.handleInput}/>
                            <br/>
                            <label className="form-control-label" htmlFor="input-merchant">Rate *</label>
                            <Input
                              name="rate"
                              className="form-control-alternative"
                              placeholder="Enter a rate of item"
                              type="number"
                              id="rate"
                              onChange={this.handleInput}/>
                            <br/>
                            <Button
                              type="button"
                              color="info"
                              onClick={(e) => this.addToCart(product)}>
                              Add Item
                            </Button>
                            </FormGroup>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name">
                              Image
                            </label>
                            <Input
                              name="photo"
                              id="photo"
                              className="form-control-alternative"
                              placeholder="Select a photo"
                              type="file"
                              onChange={this.uploadPhoto}/>
                            <br/>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name">
                              Image Preview
                            </label>
                          {this.state.img && <img width="100%" height="400px" src={this.state.img} alt="photo_url" />}
                          </FormGroup>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name">
                              Comments
                            </label>
                            <Input
                              name="comments"
                              className="form-control-alternative"
                              placeholder="Enter a comments (optional)"
                              type="textarea"
                              rows="6"
                              onChange={this.handleInput}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                            <h4>
                              Estimate
                            </h4>
                            <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                              style={{display:"inline-flex", alignItems:"center", }}>
                              Date
                            </label>
                            <Input
                              name="dateCreate"
                              value={month<10 ? (`${day}-0${month}-${year}`):(`${day}-${month}-${year}`)}
                              className="form-control-alternative"
                              type="text"
                              onChange={this.handleInput}
                              disabled
                              width="50%"
                            />
                          </FormGroup>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                              style={{display:"inline-flex", alignItems:"center", }}>
                              Subtotal
                            </label>
                            <Input
                              name="estimateSubtotal"
                              value={ parseInt(subtotal) }
                              className="form-control-alternative"
                              type="number"
                              onChange={this.handleInput}
                              disabled
                              step="any"
                            />
                          </FormGroup>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-tax"
                              style={{display:"inline-flex", alignItems:"center", }}>
                              Tax
                            </label>
                            <Input
                              name="estimateTax"
                              defaultValue="0"
                              className="form-control-alternative"
                              type="number"
                              onChange={this.handleInput}/>
                          </FormGroup>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                              style={{display:"inline-flex", alignItems:"center", }}>
                              Discount
                            </label>
                            <Input
                              name="estimateDiscount"
                              defaultValue="0"
                              className="form-control-alternative"
                              type="number"
                              onChange={this.handleInput}/>
                          </FormGroup>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                              style={{display:"inline-flex", alignItems:"center", }}>
                              Paid
                            </label>
                            <Input
                              name="estimatePaid"
                              defaultValue="0"
                              className="form-control-alternative"
                              type="number"
                              onChange={this.handleInput}/>
                          </FormGroup>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-total"
                              style={{display:"inline-flex", alignItems:"center", }}>
                              Total
                            </label>
                            <Input
                              disabled
                              name="estimateTotal"
                              value={estimateTotal}
                              className="form-control-alternative"
                              type="number"
                              onChange={this.handleInput}
                              step="any"/>
                          </FormGroup>
                          <FormGroup>
                            <Input
                              name="jobName"
                              value={jobName}
                              className="form-control-alternative"
                              type="text"
                              onChange={this.handleInput}
                              disabled
                              width="50%"
                              hidden
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

export default connect(null, {addEstimate})(withRouter(AddEstimate));
