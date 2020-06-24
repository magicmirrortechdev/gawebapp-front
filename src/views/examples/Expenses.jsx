import React from "react";
import { Link } from 'react-router-dom'
import axios from 'axios'
import Moment from 'react-moment'

import {
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  Table,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown
} from "reactstrap";
// core components
import Header from "components/Headers/Header.jsx";
import Global from "../../global";
var loggedUser

class Expenses extends React.Component {
  state = {
    jobs:[]
  };

  constructor(props) {
    super(props);
    loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  }

  componentDidMount() {
    loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    if(loggedUser.level <=1){
      axios
      .get(Global.url + `checkjobs/${loggedUser._id}`)
      .then(({ data }) => {
        console.log('si entraaa')
        this.setState(prevState => {
          return {
            ...prevState,
            ...data
          }
        })
      })
      .catch(err => {
        console.log('err response usuario 1-',err)
      })
    }
    if(loggedUser.level >=2){
      axios.get(Global.url + `checkjobs`)
      .then(({ data }) => {
        this.setState(prevState => {
          return {
            ...prevState,
            ...data
          }
        })
      })
      .catch(err => {
        console.log('err response usuario 2+', err)
      })
    }
  }

  compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }
  
      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];
  
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }


  

  render() {
    if (!this.state) return <p>Loading</p>
    let estimateId =""
    let allExpenses=[]
    let userInEstimate 
    this.state.jobs.map((e,i)=>{
      return e.expenses.map(ex =>{
        allExpenses.push(ex)
        return(allExpenses)
      })
    })
    this.state.jobs.map((e,i)=>{
      if(!e.workers)return <th scope="row">Worker Delete</th>
      estimateId = e._id
      console.log('workers',e.workers)

      userInEstimate =e.workers.length > 0 && e.workers.filter(wx =>{ 
        return wx.workerId._id  === loggedUser._id - 1
      }).length > 0

      return(estimateId, userInEstimate)
       }) 
    allExpenses.sort(this.compareValues('date', 'desc'))
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
                      <h3 className="mb-0">Information</h3>
                    </div>
                    <div className="col text-right">
                    <Link to="addexpense">
                      <p
                        color="primary"
                        size="sm" 
                      >
                        Add an Expense
                      </p>
                    </Link>
                      
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">Description</th>
                      <th scope="col">Category</th>
                      <th scope="col">Date</th>
                      <th scope="col">Total</th>
                    </tr>
                  </thead>
                  
                       {allExpenses === 0 ?  <tbody><tr><td>No expenses register</td></tr></tbody>:
                        allExpenses.map((e,i)=>{
                        return(
                          <tbody key={i}>
                      
                          <tr>
                          <td>
                            <span className="dropdownButtons">
                            <UncontrolledDropdown>
                              <DropdownToggle>
                                ...
                              </DropdownToggle>
                              <DropdownMenu>
                                 {
                                   loggedUser.level >= 2 ? <DropdownItem to={`/admin/expenses/${estimateId}/${e._id}/update`} tag={Link}>Update</DropdownItem> : 
                                   loggedUser.level === 1 && userInEstimate ? <DropdownItem to={`/admin/expenses/${estimateId}/${e._id}/update`} tag={Link}>Update</DropdownItem> :
                                   <DropdownItem disabled to={`/admin/expenses/${estimateId}/${e._id}/update`} tag={Link}>Update</DropdownItem>
                                 }
                                {
                                  loggedUser.level >= 4 ?
                                  <DropdownItem onClick={()=>{
                                  axios.patch(Global.url + `expensedelete/${estimateId}/${e._id}`)
                                  .then(({data})=>{
                                    alert('Expense Delete')
                                        window.location.reload()
                                  })
                                  .catch(err => {
                                    console.log('err',err)
                                  })
                                }}><span
                                    className="text-danger">Delete</span>
                                </DropdownItem>
                                :null
                              }
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </span>
                          </td>
                          <th scope="row" >{e.description}</th>
                          <td>{e.category}</td>
                          <td>
                          <Moment add={{days: 1}} date={new Date(e.date)}  format={"MMM D, YY"} />
                          
                          </td>
                          <td>$ {parseFloat(Math.round(e.total * 100) / 100).toFixed(2)}</td>
                          
                          </tr>                                               
                        </tbody>
                       )
                       })}
                      
                      
                      
                      
                </Table>
              </Card>
            </Col>
            
          </Row>
        </Container>
      </>
    );
  }
}

export default Expenses;
