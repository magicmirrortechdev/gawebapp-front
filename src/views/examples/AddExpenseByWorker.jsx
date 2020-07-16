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
class AddExpense extends React.Component {
  state = {
    workerId: "",
    date: ano+"-"+mes+"-"+dia,
    colorError: false
  };

  constructor(props) {
    super(props);
    loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    this.selectRef = React.createRef();
  }

  componentDidMount() {
    this.setState({
      workerId: loggedUser._id,
      jobs:[],
      _id: '',
      category: '',

    })
    axios
      .get(Global.url + `openjobs`)
      .then(({ data }) => {
        this.setState(prevState => {
          return {
            ...prevState,
            ...data
          }
        })
      })
      .catch(err => {
        console.log(err)
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
    const total =  this.state.total

    e.preventDefault()
    if (this.state._id==='') {
      alert('Select a Job to continue');
    }
    else if (this.state.category==='') {
      alert('Select a category to continue');
    }
    else if (!total.match(/^0|-?[0-9]\d*(\.\d+)?$/gm)){
      alert('Total quantity not valid')
    }
    else {
      this.setState({ colorError: false });
       await axios.patch(Global.url + `addexpense/${this.state._id}`,this.state)
      this.props.history.push('/admin/expenses')
    }
       
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
                      <h3 className="mb-0">Information Expense</h3>
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
                              htmlFor="input-date"
                            >
                              Job Name *
                            </label>
                            <Input
                              ref={this.selectRef}
                              name="_id"
                              className="form-control-alternative"
                              type="select"
                              onChange={this.handleInput}                              
                            >
                            <option selected disabled>Select Job to Add Expense</option>
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
                              Expense Date *
                            </label>
                            <Input
                              required
                              className="form-control-alternative"
                              placeholder="Select a date"
                              id="date"
                              name="date"
                              type="date"
                              value={this.state.date}
                              onChange={this.handleInput}
                            />
                          </FormGroup>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-merchant"
                            >
                              Vendor
                            </label>
                            <Input
                              name="vendor"
                              className="form-control-alternative"
                              placeholder="Enter name of vendor"
                              type="text"
                              onChange={this.handleInput}
                            />
                          </FormGroup>

                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-category"
                            >
                              Category *
                            </label>
                            <Input
                              required
                              name="category"
                              className="form-control-alternative"
                              placeholder="Enter a category"
                              type="select"
                              onChange={this.handleInput}
                            >
                            <option selected disabled >Choose One</option>
                            <option>Job Materials</option>
                            <option>Gas</option>
                            <option>Supplies</option>
                            <option>Sub Contractors</option>
                            </Input>
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
                              Image *
                            </label>
                            <Input
                              name="photo"
                              id="photo"
                              className="form-control-alternative"
                              placeholder="Select a photo"
                              type="file"
                              onChange={this.uploadPhoto}
                            />
                          </FormGroup>

                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Total *
                            </label>
                            <Input
                              required
                              name="total"
                              className="form-control-alternative"
                              placeholder="Enter the total"
                              type="text"
                              onChange={this.handleInput}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Image Preview
                            </label>
                          {this.state.img && <img width="100%" height="100%" src={this.state.img} alt="photo_url" />}
                        </Col>
                      </Row>
                      
                      
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                        
                            <Button
                              disabled={this.state.img ? false : true}
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

export default withRouter(AddExpense);
