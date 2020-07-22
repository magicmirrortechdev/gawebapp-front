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
import Global, {compareValues} from "../../global";
var loggedUser

const ActionButton = (props) => {
  return (
    <span className="dropdownButtons">
      <UncontrolledDropdown>
        <DropdownToggle>
          ...
        </DropdownToggle>
        <DropdownMenu modifiers={{
          setMaxHeight: {
            enabled: true,
            order: 890,
            fn: (data) => {
              return {
                ...data,
                styles: {
                  ...data.styles,
                  overflow: 'auto',
                  maxHeight: 130,
                },
              };
            },
          },
        }}>
          {
           loggedUser.level >= 2 ? <DropdownItem to={`/admin/expenses/${props.estimateId}/${props.expense._id}/update`} tag={Link}>Update</DropdownItem> :
               loggedUser.level === 1 && props.userInEstimate ? <DropdownItem to={`/admin/expenses/${props.estimateId}/${props.expense._id}/update`} tag={Link}>Update</DropdownItem> :
                   <DropdownItem disabled to={`/admin/expenses/${props.estimateId}/${props.expense._id}/update`} tag={Link}>Update</DropdownItem>
          }
          {
            loggedUser.level >= 4 ?
              <DropdownItem onClick={()=>{
                axios.patch(Global.url + `expensedelete/${props.estimateId}/${props.expense._id}`)
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
              : null
          }
        </DropdownMenu>
      </UncontrolledDropdown>
    </span>
  )
}

class Expenses extends React.Component {
  state = {
    jobs:[],
    isMobileVersion: false
  };

  constructor(props) {
    super(props);
    loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  }

  updateWindowDimensions = () => {
    this.setState(prevState => {return {...prevState, isMobileVersion : (window.innerWidth < Global.mobileWidth) }})
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)

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

  render() {
    if (!this.state) return <p>Loading</p>
    let estimateId =""
    let allExpenses=[]
    let userInEstimate 
    this.state.jobs.map((e,i)=>{
      return e.expenses.map(ex =>{
        allExpenses.push({estimateId: e._id, expense:ex, date:ex.date})
        return(allExpenses)
      })
    })
    this.state.jobs.map((e,i)=>{
      if(!e.workers)return <th scope="row">Worker Delete</th>
      estimateId = e._id
      userInEstimate =e.workers.length > 0 && e.workers.filter(wx =>{ 
        return (wx.workerId && wx.workerId._id  === loggedUser._id)
      }).length > 0

      return(estimateId, userInEstimate)
       }) 
    allExpenses.sort(compareValues('date', 'desc'))
    console.log(loggedUser.level)
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
                      <p color="primary" size="sm" >
                        Add an Expense
                      </p>
                    </Link>
                      
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      {!this.state.isMobileVersion ?
                        <>
                          <th scope="col"></th>
                          <th scope="col">Date</th>
                          <th scope="col">Employee</th>
                          <th scope="col">Description</th>
                          <th scope="col">Category</th>
                          <th scope="col">Total</th>
                        </>
                        :
                        <th>Details</th>
                      }
                    </tr>
                  </thead>
                  <tbody>
                    {allExpenses.length === 0 ?  <tbody><tr><td>No expenses register</td></tr></tbody>:
                      allExpenses.map((e,i)=>{
                      return(
                        <tr>
                          {!this.state.isMobileVersion ?
                            <>
                              <td>
                                <ActionButton {...e} userInEstimate={userInEstimate}></ActionButton>
                              </td>
                              <td>
                                <Moment add={{days: 1}} date={new Date(e.expense.date)}  format={"MMM D, YY"} />
                              </td>
                              <td>{e.expense.workerId && e.expense.workerId.name}</td>
                              <td>{e.expense.description}</td>
                              <td>{e.expense.category}</td>
                              <td>$ {parseFloat(Math.round(e.expense.total * 100) / 100).toFixed(2)}</td>
                            </>
                            :
                            <>
                              <td>
                                <Moment add={{days: 1}} date={new Date(e.expense.date)}  format={"MMM D, YY"} /><br/>
                                {e.expense.workerId && e.expense.workerId.name}<br/>
                                {e.expense.description}<br/>
                                {e.expense.category}<br/>
                                $ {parseFloat(Math.round(e.expense.total * 100) / 100).toFixed(2)}
                                <div className="buttonfloat-right buttonfloat-right-estimates">
                                  <ActionButton {...e} userInEstimate={userInEstimate}></ActionButton>
                                </div>
                              </td>
                            </>
                          }
                        </tr>
                     )
                   })}
                  </tbody>
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
