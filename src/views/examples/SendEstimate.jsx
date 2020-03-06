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

class SendEstimate extends React.Component {
  state = {
    name: '',
    email: '',
    items: [],
    comments: '',
    total: parseInt(''),
  }
  componentDidMount() {
    axios
      .get(Global.url + `estimatedetail/${this.props.match.params.id}`)
      .then(({ data }) => {
        this.setState(prevState => {
          let total 
          total = data.estimate.items.reduce((acc, current, i) => acc + current.subtotal, 0)
          console.log('el sb', total)
          return {
            ...prevState,
            name: data.estimate.clientId.name,
            email: data.estimate.clientId.email,
            total: total,
            items: data.estimate.items
          }
        })
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
      .post(
        Global.url + `sendestimate`,
        this.state
      )
      .then(response => {
        this.props.history.push(`/admin/estimates`)
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
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
                              name="name"
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
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                              style={{ display: 'inline-flex', alignItems: 'center' }}
                            >
                              Total
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
