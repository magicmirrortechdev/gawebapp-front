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

class AddEstimate extends React.Component {
  
  state = {
    
    clientName:'',
    address:'',
    items:[],
    itemName: '',
    description: '',
    quantity: parseInt(''),
    rate: parseInt(''),
    subtotal: 0,
    tax: 0,
    discount: 0,
    paid: 0,
    total: 0,
    dateCreate: month<10 ? (`${day}-0${month}-${year}`):(`${day}-${month}-${year}`),
    jobName:''
  };

  addToCart = (product) =>{
    var joined = this.state.items.concat(product);
    this.setState({items: joined})
    document.getElementById("itemName").value = "";
    document.getElementById("description").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("rate").value = "";    
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
    } = await axios.post('http://localhost:3000/upload', file)
    this.setState(prevState => ({ ...prevState, img }))
  }

  handleSubmit = (e, props) => {
    e.preventDefault()
        authService
          .addEstimate(this.state)
          .then(response => {
            //aquí deberia ir una notificacion o un swal o un toastr
            this.props.history.push(`estimates`)
            console.log(response)
          })
          .catch(err => {
            //aquí deberia ir una notificacion o un swal o un toastr
            console.log(err.response)
            alert(err.response.data.msg || err.response.data.err.message)
          })
  }

  render() {
    let date = new Date()

    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

   let product={
    itemName: this.state.itemName,
    description: this.state.description,
    quantity: parseInt(this.state.quantity),
    rate: parseInt(this.state.rate),
    subtotal: parseInt(this.state.quantity * this.state.rate),

  }
  

  let subtotal = this.state.items.reduce((acc, current, i) => acc + current.subtotal, 0)
  let tax = parseInt(this.state.tax) * subtotal / 100
  let discount = parseInt(this.state.discount)
  let paid = parseInt(this.state.paid)
  let clientName = this.state.clientName
  let address = this.state.address

  let total = subtotal + tax - discount - paid
  let jobName = address+clientName
  
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
                              className="form-control-alternative"
                              placeholder="Enter the name client"
                              name="clientName"
                              type="text"
                              onChange={this.handleInput}
                            />
                            <br/>
                            <Input
                              className="form-control-alternative"
                              placeholder="Enter the email client"
                              name="email"
                              type="email"
                              onChange={this.handleInput}
                            />
                            <br/>
                            <Input
                              className="form-control-alternative"
                              placeholder="Enter the address client"
                              name="address"
                              type="text"
                              onChange={this.handleInput}
                            />
                          </FormGroup>
                        
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-merchant"
                            >
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
                                <Button
                                onClick={e =>
                  
                                this.setState(prevState => {
                                var filter = this.state.items.filter(e => e !== this.state.items[i])
                                    this.setState({items: filter})
                                })
                                }
                                style={{width:'100px', height:'20px', fontSize:'10px', paddingTop:'0'}}
                                className="btn icon-btn btn-danger"
                                >
                
                                <i className="nc-icon nc-simple-remove" />
                                  &nbsp; Delete
               
                                  </Button>
                                </td>
                               </tr>
                                 )) }
                              </tbody>
                            </Table>
                            <br/>
                            <Input
                              name="itemName"
                              className="form-control-alternative"
                              placeholder="Enter a name of item"
                              type="text"
                              id="itemName"
                              onChange={this.handleInput}
                            />
                            <br/>
                            <Input
                              name="description"
                              className="form-control-alternative"
                              placeholder="Enter a description of item"
                              type="text"
                              id="description"
                              onChange={this.handleInput}
                            />
                            <br/>
                            <Input
                              name="quantity"
                              className="form-control-alternative"
                              placeholder="Enter a quantity of item"
                              type="number"
                              id="quantity"
                              onChange={this.handleInput}
                            />
                            <br/>
                            <Input
                              name="rate"
                              className="form-control-alternative"
                              placeholder="Enter a rate of item"
                              type="number"
                              id="rate"
                              onChange={this.handleInput}
                            />
                            <br/>
                            <button
                              type="button"
                              onClick={(e) => this.addToCart(product)}
                                className="btn btn-primary"
                            >
                              Add Item
                            </button>
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
                              multiple
                            />
                          </FormGroup>

                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
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
                            <h4
                              
                            >
                              Estimate
                            </h4>
                            <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                              style={{display:"inline-flex", alignItems:"center", }}
                            >
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
                              style={{display:"inline-flex", alignItems:"center", }}
                            >
                              Subtotal 
                            </label>
                            <Input
                              
                              name="subtotal"
                              value={ parseInt(subtotal) }
                              className="form-control-alternative"
                              type="number"
                              onChange={this.handleInput}
                              disabled
                            />
                            
                          </FormGroup>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-tax"
                              style={{display:"inline-flex", alignItems:"center", }}
                            >
                              Tax 
                            </label>
                            <Input
                              
                              name="tax"
                              defaultValue="0"
                              className="form-control-alternative"
                              type="number"
                              onChange={this.handleInput}

                              
                            />
                            
                          </FormGroup>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                              style={{display:"inline-flex", alignItems:"center", }}
                            >
                              Discount 
                            </label>
                            <Input
                              
                              name="discount"
                              defaultValue="0"
                              className="form-control-alternative"
                              type="number"
                              onChange={this.handleInput}

                              
                            />
                            
                          </FormGroup>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                              style={{display:"inline-flex", alignItems:"center", }}
                            >
                              Paid 
                            </label>
                            <Input
                              
                              name="paid"
                              defaultValue="0"
                              className="form-control-alternative"
                              type="number"
                              onChange={this.handleInput}
                            />
                            
                          </FormGroup>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-total"
                              style={{display:"inline-flex", alignItems:"center", }}
                            >
                              Total 
                            </label>
                            <Input
                              disabled
                              name="total"
                              value={total}
                              className="form-control-alternative"
                              type="number"
                              onChange={this.handleInput}
                            />
                            
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

                            >Register</Button>
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

export default withRouter(AddEstimate);
