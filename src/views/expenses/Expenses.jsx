import React from "react";
import { Link } from 'react-router-dom'
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
import {connect} from "react-redux";
import {getExpenses, removeExpense} from "../../redux/actions/expenseAction";
import configureStore from "../../redux/store";
const {store} = configureStore();

let loggedUser
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
           loggedUser.level >= 2 ? <DropdownItem to={`/admin/expenses/${props.item._id}/update`} tag={Link}>Update</DropdownItem> :
               loggedUser.level === 1 && props.userInEstimate ? <DropdownItem to={`/admin/expenses/${props.item._id}/update`} tag={Link}>Update</DropdownItem> :
                   <DropdownItem disabled to={`/admin/expenses/${props.item._id}/update`} tag={Link}>Update</DropdownItem>
          }
          {
            loggedUser.level >= 4 ?
              <DropdownItem onClick={()=>{
                props.props.removeExpense(props.item._id)
                alert('Expense Delete')
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
    expenses:[],
    isMobileVersion: false
  };

  constructor(props) {
    super(props);
    const {auth} = store.getState();
    loggedUser = auth.userLogged;
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
    this.props.getExpenses(loggedUser._id)
  }

  render() {
   let {users, expenses} = this.props
   if (!this.state) return <p>Loading</p>
   let userInEstimate

   expenses = expenses.length > 0 ? expenses.sort(compareValues('date', 'desc')) : expenses
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
                    {expenses.length === 0 ?  <tbody><tr><td>No expenses register</td></tr></tbody>:
                      expenses.map((e,i)=>{
                      let user = users.filter(user => user._id === e.userId)[0]
                      return(
                        <tr>
                          {!this.state.isMobileVersion ?
                            <>
                              <td>
                                <ActionButton item={e} userInEstimate={userInEstimate} props={this.props}></ActionButton>
                              </td>
                              <td>
                                <Moment add={{days: 1}} date={new Date(e.date)}  format={"MMM D, YY"} />
                              </td>
                              <td>{user.name}</td>
                              <td>{e.description}</td>
                              <td>{e.category}</td>
                              <td>$ {parseFloat(Math.round(e.total * 100) / 100).toFixed(2)}</td>
                            </>
                            :
                            <>
                              <td>
                                <Moment add={{days: 1}} date={new Date(e.expense.date)}  format={"MMM D, YY"} /><br/>
                                {user.name}<br/>
                                {e.description}<br/>
                                {e.category}<br/>
                                $ {parseFloat(Math.round(e.total * 100) / 100).toFixed(2)}
                                <div className="buttonfloat-right buttonfloat-right-estimates">
                                  <ActionButton item={e} userInEstimate={userInEstimate} props={this.props}></ActionButton>
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

const mapStateToProps = state => ({
  expenses: state.expense.expenses,
  users: state.user.users
})

export default connect(mapStateToProps, {getExpenses, removeExpense})(Expenses);
