import React from 'react'
import { withRouter } from 'react-router-dom'
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
  Table,
} from 'reactstrap'
// core components
import Header from 'components/Headers/Header.jsx'
import Global from "../../global";
import {connect} from "react-redux";
import {updateEstimate} from "../../redux/actions/jobAction";

class UpdateEstimate extends React.Component {
  state = {
    name: '',
    email: '',
    address: '',
    items: [],
    itemName: '',
    description: '',
    comments: '',
    estimateName: '',
    quantity: parseInt(''),
    rate: parseInt(''),
    estimateSubtotal: 0,
    estimateTax: parseInt(''),
    estimateDiscount: parseInt(''),
    estimatePaid: parseInt(''),
    estimateTotal: 0,
    estimateAddress: "",
    dateCreate: '',
    jobName: '',
  }
  componentDidMount() {
    const estimate = this.props.estimates.filter(item => item._id === this.props.match.params.id)[0]
    const client = this.props.clients.filter(item => item._id === estimate.clientId)[0]
    this.setState(prevState => {
      return {
        ...prevState,
        email: client.email,
        name: client.firstName + ' ' + client.lastName,
        ...estimate
      }
    })
  }

  addToCart = product => {
    var joined = this.state.items.concat(product)
    this.setState({ items: joined })
    document.getElementById('itemName').value = ''
    document.getElementById('description').value = ''
    document.getElementById('quantity').value = ''
    document.getElementById('rate').value = ''
  }
  handleInput = e => {
    e.persist()
    this.setState(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  uploadPhoto = async e => {
    const file = new FormData()
    file.append('photo', e.target.files[0])

    const {
      data: { img },
    } = await axios.post(Global.url + 'upload', file)
    this.setState(prevState => ({ ...prevState, img }))
  }

  handleSubmit = (e, props) => {
    e.preventDefault()
    this.props.updateEstimate(this.props.match.params.id, this.state)
    this.props.history.push(`/admin/estimates`)
  }

  render() {
    let product = {
      itemName: this.state.itemName,
      description: this.state.description,
      quantity: parseInt(this.state.quantity),
      rate: parseInt(this.state.rate),
      subtotal: parseInt(this.state.quantity * this.state.rate),
    }
    let estimateSubtotal = this.state.items.reduce((acc, current, i) => acc + current.subtotal, 0)
    let tax = (parseInt(this.state.estimateTax) * estimateSubtotal) / 100
    let discount = parseInt(this.state.estimateDiscount)
    let paid = parseInt(this.state.estimatePaid)
    let clientName = this.state.clientName
    let address = this.state.address

    let estimateTotal = estimateSubtotal + tax - discount - paid
    let jobName = address + clientName

    console.log('el stateee', this.state)
    if (!this.state) return <p> Loading </p>
    let dateCreate = this.state.dateCreate

    return (
      <>
        <Header /> {/* Page content */}{' '}
        <Container className="mt--7" fluid>
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="12">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0"> Information Estimate </h3>
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
                              htmlFor="input-name">
                              Client Name
                            </label>
                            <Input
                              defaultValue={this.state.name}
                              className="form-control-alternative"
                              placeholder="Enter the name client"
                              name="name"
                              type="text"
                              onChange={this.handleInput}/>
                            <br />
                            <label
                              className="form-control-label d-inline-block"
                              htmlFor="input-name">
                              Email Client*
                            </label>
                            <Input
                              defaultValue={`${this.state.email}`}
                              className="form-control-alternative"
                              placeholder="Enter the email client"
                              name="email"
                              type="email"
                              onChange={this.handleInput}
                            />
                            <br />
                            <label
                              className="form-control-label d-inline-block"
                              htmlFor="input-name">
                              Address Estimate*
                            </label>
                            <Input
                              defaultValue={this.state.jobAddress}
                              className="form-control-alternative"
                              placeholder="Enter the address client"
                              name="address"
                              type="text"
                              onChange={this.handleInput}
                            />
                          </FormGroup>

                          <FormGroup>
                            <label className="form-control-label" htmlFor="input-merchant">
                              Items
                            </label>

                            <Table className="align-items-center table-flush" responsive>
                              <thead className="thead-light">
                                <tr>
                                  <th scope="col"> Item Name </th>
                                  <th scope="col"> Description </th>
                                  <th scope="col"> Quantity </th>
                                  <th scope="col"> Rate </th>
                                  <th scope="col"> Total </th>
                                  <th scope="col"> Options </th>
                                </tr>
                              </thead>
                              <tbody>
                                {this.state.items.map((el, i) => (
                                  <tr key={i}>
                                    <td> {el.itemName} </td>
                                    <td> {el.description} </td>
                                    <td> {el.quantity} </td>
                                    <td>$ {el.rate} </td>
                                    <td>$ {el.subtotal} </td>
                                    <td>
                                      <Button
                                        onClick={e =>
                                          this.setState(prevState => {
                                            var filter = this.state.items.filter(
                                              e => e !== this.state.items[i]
                                            )
                                            this.setState({ items: filter })
                                          })
                                        }
                                        style={{
                                          width: '100px',
                                          height: '20px',
                                          fontSize: '10px',
                                          paddingTop: '0',
                                        }}
                                        className="btn icon-btn btn-danger"
                                      >
                                        <i className="nc-icon nc-simple-remove" /> Delete
                                      </Button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                            <br />
                            <Input
                              name="itemName"
                              className="form-control-alternative"
                              placeholder="Enter a name of item"
                              type="text"
                              id="itemName"
                              onChange={this.handleInput}
                            />
                            <br />
                            <Input
                              name="description"
                              className="form-control-alternative"
                              placeholder="Enter a description of item"
                              type="text"
                              id="description"
                              onChange={this.handleInput}
                            />
                            <br />
                            <Input
                              name="quantity"
                              className="form-control-alternative"
                              placeholder="0"
                              type="number"
                              id="quantity"
                              onChange={this.handleInput}
                            />
                            <br />
                            <Input
                              name="rate"
                              className="form-control-alternative"
                              placeholder="0"
                              type="number"
                              id="rate"
                              onChange={this.handleInput}
                            />
                            <br />
                            <button
                              type="button"
                              onClick={e => this.addToCart(product)}
                              className="btn btn-primary"
                            >
                              Add Item
                            </button>
                          </FormGroup>
                          <FormGroup>
                            <label className="form-control-label" htmlFor="input-last-name">
                              Image{' '}
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
                            <label className="form-control-label" htmlFor="input-first-name">
                              Comments{' '}
                            </label>
                            <Input
                              defaultValue={`${this.state.comments}`}
                              name="comments"
                              className="form-control-alternative"
                              placeholder="Enter a comments (optional)"
                              type="text"
                              onChange={this.handleInput}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <h4>Estimate</h4>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                              style={{ display: 'inline-flex', alignItems: 'center' }}
                            >
                              Date Create{' '}
                            </label>
                            <Input
                              defaultValue={`${dateCreate}`}
                              name="dateCreate"
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
                              style={{ display: 'inline-flex', alignItems: 'center' }}>
                              Subtotal{' '}
                            </label>
                            <Input
                              name="estimateSubtotal"
                              value={parseInt(estimateSubtotal)}
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
                              style={{ display: 'inline-flex', alignItems: 'center' }}>
                              Tax{' '}
                            </label>
                            <Input
                              value={this.state.estimateTax}
                              name="tax"
                              className="form-control-alternative"
                              type="number"
                              onChange={this.handleInput}
                            />
                          </FormGroup>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                              style={{ display: 'inline-flex', alignItems: 'center' }}>
                              Discount
                            </label>
                            <Input
                              value={this.state.estimateDiscount}
                              name="estimateDiscount"
                              className="form-control-alternative"
                              type="number"
                              onChange={this.handleInput}/>
                          </FormGroup>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                              style={{ display: 'inline-flex', alignItems: 'center' }}>
                              Paid{' '}
                            </label>
                            <Input
                              name="estimatePaid"
                              value={this.state.estimatePaid}
                              className="form-control-alternative"
                              type="number"
                              onChange={this.handleInput}/>
                          </FormGroup>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-total"
                              style={{ display: 'inline-flex', alignItems: 'center' }}>
                              Total{' '}
                            </label>
                            <Input
                              disabled
                              name="estimateTotal"
                              value={estimateTotal}
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
                          </FormGroup>{' '}
                          <Row>
                            <Col lg="6">
                              <FormGroup>
                                <Button className="form-control-alternative" color="info">
                                  Save{' '}
                                </Button>{' '}
                              </FormGroup>{' '}
                            </Col>{' '}
                          </Row>{' '}
                        </Col>{' '}
                      </Row>
                    </div>{' '}
                  </Form>{' '}
                </CardBody>{' '}
              </Card>{' '}
            </Col>
          </Row>{' '}
        </Container>{' '}
      </>
    )
  }
}

const mapStateToProps = state => ({
  estimates: state.job.jobs,
  clients: state.client.clients
})

export default connect(mapStateToProps, {updateEstimate})(withRouter(UpdateEstimate));
