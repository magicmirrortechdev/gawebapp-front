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



class AddEstimate extends React.Component {
  state = {
    cart:[]
  };

  

  addToCart = (product) =>{
    this.setState(prevState => {
      return {
        cart:[prevState.cart.push(product)]
      }
    })
    document.getElementById("itemName").value = "";
    document.getElementById("description").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("rate").value = "";

    console.log("El cart", this.state.cart)

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
          .addExpense(this.state)
          .then(response => {
            //aquí deberia ir una notificacion o un swal o un toastr
            this.props.history.push(`expenses`)
            console.log(response)
          })
          .catch(err => {
            //aquí deberia ir una notificacion o un swal o un toastr
            console.log(err.response)
            alert(err.response.data.msg || err.response.data.err.message)
          })
  }

  render() {
   let product={
    itemName: Form.itemName,
    description: Form.description,
    quantity: parseInt(Form.amount),
    rate: parseInt(Form.rate),

  }
  console.log("elproduct", product)
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
                        <Col md="7">
                          <FormGroup>
                            <label
                              className="form-control-label d-inline-block"
                              htmlFor="input-date"
                            >
                              Client
                            </label>
                            <Input
                              className="form-control-alternative"
                              placeholder="Select a date"
                              name="clientName"
                              type="text"
                              onChange={this.handleInput}
                            />
                            <br/>
                            <Input
                              className="form-control-alternative"
                              placeholder="Enter the email of client"
                              name="email"
                              type="email"
                              onChange={this.handleInput}
                            />
                            <br/>
                            <Input
                              className="form-control-alternative"
                              placeholder="Enter the email of client"
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
                              </tr>
                             </thead>
                              <tbody>
                               {this.state.cart.map((el, i) => (
                                <tr key={i}>
                                  <td >
                                   {el.name}
                                  </td>
                                <td>
                                {el.description}
                                </td>
                                <td>
                                ${el.quantity}
                                </td>
                                <td>
                                ${el.rate}
                                </td>
                                <td>
                                <Button
                                onClick={e =>
                  
                                this.setState(prevState => {
                                return prevState.cart.filter(e => e !== this.state.cart[i])
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
                                 ))}
                                 <tr>
                                   <td></td>
                                   <td></td>
                                   <td><b>Total:</b> $ {this.state.cart.reduce((acc, current, i) => acc + current.amount, 0)}</td>
                                   <td></td>
                                 </tr>
                              </tbody>
                            </Table>
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
                              placeholder="Enter a quantity"
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
                              htmlFor="input-last-name"
                            >
                              Job
                            </label>
                            <Input
                              name="job"
                              className="form-control-alternative"
                              placeholder="Enter a job or search your job list"
                              type="text"
                              onChange={this.handleInput}
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
                        <Col lg="5">
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

export default withRouter(AddEstimate);
