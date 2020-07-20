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

class UpdateExpense extends React.Component {
  state = {
    workerId: "",
    expenses:[],
    img: '',
    date:'',
    vendor:'',
    category: '',    
    description: '',
    total: parseInt('')
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
    console.log("montando componente, " );
    
      axios
        .get(Global.url + `estimatedetail/${this.props.match.params.estimateId}`)
        .then(({ data }) => {
          this.setState(prevState => {
            let img = ''
            let date = ''
            let vendor = ''
            let category = ''
            let description = ''
            let total
              const expenses = data.estimate.expenses
              expenses.map((e,i)=>{
                if(e._id === this.props.match.params.expenseId){
                  img = e.img
                  date = e.date
                  vendor = e.vendor
                  category = e.category
                  description = e.description
                  total = e.total
                }
                return {img, date, vendor, description, category, total}
              })
            return {
              ...prevState,
              expenses: data.estimate.expenses,
              img: img,
              date: date,
              vendor: vendor,
              category: category,
              description: description,
              total: total
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
    e.preventDefault()
        axios.patch(Global.url + `expenseupdate/${this.props.match.params.estimateId}/${this.props.match.params.expenseId}`,this.state)
        .then(response => {
          this.props.history.push(`/admin/expenses`)
          console.log(response)
        })
        .catch(err => {
          console.log(err.response)
        })
        
  }

  render() {
    console.log(this.state)

    const categories = [{category: 'Job Materials'}, {category: 'Gas'}, {category:'Supplies'}, {category:'Sub Contractors'}]
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
                              Expense Date
                            </label>
                            <Input
                              required
                              id="date"
                              className="form-control-alternative"
                              placeholder="Select a date"
                              name="date"
                              defaultValue={this.state.date}
                              type="date"
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
                              defaultValue={this.state.vendor}
                              onChange={this.handleInput}
                            />
                          </FormGroup>

                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-category"
                            >
                              Category
                            </label>
                            <Input
                              required
                              name="category"
                              className="form-control-alternative"
                              placeholder="Enter a category"
                              type="select"
                              onChange={this.handleInput}
                            >
                            {categories.map((e,i)=>{
                              return(
                                this.state.category === e.category ? <option selected key={i}>{this.state.category}</option>: 
                                <option key={i}>{e.category}</option>
                              )
                            })}
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
                              defaultValue={this.state.description}
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
                              type="number"
                              onChange={this.handleInput}
                              value={this.state.total}
                              step="any"
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
                          {!this.state.img  ? <img width="100%" height="100%" src={this.state.img} alt="photo_url" /> :
                           <img width="100%" height="100%" src={this.state.img} alt="photo_url" />}
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

export default withRouter(UpdateExpense);
