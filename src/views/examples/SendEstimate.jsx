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
  Table
} from 'reactstrap'
import { WithContext as ReactTags } from 'react-tag-input';

// core components
import Header from 'components/Headers/Header.jsx'
import Global from "../../global";

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

class SendEstimate extends React.Component {
  state = {
    name: '',
    email: '',
    items: [],
    comments: '',
    address: '',
    addressEstimate: "",
    tags : [],
    total: parseInt(''),
  }

  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
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
            name: data.estimate.nameEstimate ? data.estimate.nameEstimate : data.estimate.clientId.name,
            email: data.estimate.clientId.email,
            addressEstimate: data.estimate.addressEstimate,
            total: total,
            address: data.estimate.addressEstimate ? data.estimate.addressEstimate : data.estimate.clientId.address,
            items: data.estimate.items,
            tags: [{id: data.estimate.clientId.email, text: data.estimate.clientId.email}]
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
        console.log(err.response)
      })
  }

  handleDelete(i) {
    const { tags } = this.state;
    this.setState({
      tags: tags.filter((tag, index) => index !== i),
    });
  }

  handleAddition(tag) {
    this.setState(state => ({ tags: [...state.tags, tag] }));
  }

  handleDrag(tag, currPos, newPos) {
    const tags = [...this.state.tags];
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    this.setState({ tags: newTags });
  }

  render() {
    let address = this.state.address
    let addressEstimate = this.state.addressEstimate
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
                            <br/>
                            <label
                              className="form-control-label d-inline-block"
                              htmlFor="input-name"
                            >
                              Address
                            </label>
                            <Input
                              defaultValue={`${addressEstimate ? addressEstimate : address}`}
                              className="form-control-alternative"
                              placeholder="Enter the address client"
                              name="address"
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
                            <br/>
                              <div>
                                <ReactTags
                                    placeholder="Add email"
                                    tags={this.state.tags}
                                    handleDelete={this.handleDelete}
                                    handleAddition={this.handleAddition}
                                    handleDrag={this.handleDrag}
                                    delimiters={this.state.delimiters} />
                              </div>
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
