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
import TagsInput from './SetTags'

class SendEstimate extends React.Component {
  state = {
    name: '',
    email: '',
    address: '',
    items: [],
    tags: [],
    itemName: '',
    description: '',
    comments: '',
    quantity: parseInt(''),
    rate: parseInt(''),
    subtotal: 0,
    tax: parseInt(''),
    discount: parseInt(''),
    paid: parseInt(''),
    total: 0,
    dateCreate: '',
    jobName: '',
  }
  componentDidMount() {
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
            ...data.estimate,
          }
        })
        console.log(this.state)
      })
      .catch(err => {
        console.log(err)
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

  handleSubmit = (e, props) => {
    e.preventDefault()
    axios
      .patch(
        Global.url + `estimateupdate/${this.props.match.params.id}`,
        this.state
      )
      .then(response => {
        this.props.history.push(`/admin/estimates`)
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    let product = {
      itemName: this.state.itemName,
      description: this.state.description,
      quantity: parseInt(this.state.quantity),
      rate: parseInt(this.state.rate),
      subtotal: parseInt(this.state.quantity * this.state.rate),
    }
    let subtotal = this.state.items.reduce((acc, current, i) => acc + current.subtotal, 0)
    let tax = (parseInt(this.state.tax) * subtotal) / 100
    let discount = parseInt(this.state.discount)
    let paid = parseInt(this.state.paid)
    let clientName = this.state.clientName
    let address = this.state.address

    let total = subtotal + tax - discount - paid
    let jobName = address + clientName
    const selectedTags = tags => {console.log(tags)};


    console.log('el stateee', this.state)
    if (!this.state) return <p> Loading </p>
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
                      <h3 className="mb-0"> Information to send in the email
                      </h3>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                <TagsInput selectedTags={selectedTags} />

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
                              className="form-control-label d-inline-block"
                              htmlFor="input-name"
                            >
                              Emails
                            </label>
                            <Input
                              defaultValue={`${this.state.email}`}
                              className="form-control-alternative"
                              placeholder="Enter the email client"
                              name="email"
                              type="email"
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
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                          </FormGroup>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                              style={{ display: 'inline-flex', alignItems: 'center' }}
                            >
                              Total
                            </label>
                            <Input
                              name="subtotal"
                              value={parseInt(subtotal)}
                              className="form-control-alternative"
                              type="number"
                              onChange={this.handleInput}
                            />
                          </FormGroup>
                          <FormGroup>
                                <Button className="form-control-alternative" color="info">
                                  Send{' '}
                                </Button>{' '}
                          </FormGroup>
                          
                        </Col>
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

export default withRouter(SendEstimate)
