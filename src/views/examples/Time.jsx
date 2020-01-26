import React from "react";
import { Link } from 'react-router-dom'
import axios from 'axios'
import AuthService from '../../services/services'

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

const authService = new AuthService()


class Time extends React.Component {
  state = {
    users:[]
  };


  componentDidMount() {
    axios
      .get(`https://greenacorn.herokuapp.com/workers`)
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


  

  render() {
    console.log('Aqui está el state', this.state)

    if (!this.state) return <p>Loading</p>
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
                      <h3 className="mb-0">Employee Information</h3>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Total Hours</th>
                      <th scope="col">Job</th>
                      <th scope="col">Site Managers</th>                     
                      <th scope="col">Options</th>
                    </tr>
                  </thead>
                  
                    

                     {this.state.users.length === 0 ?  <tbody><tr><td>No workers register</td></tr></tbody>:
                     this.state.users.map((e,i)=>{
                      // let subtotal = e.items.reduce((acc, current, i) => acc + current.subtotal, 0)
                      // let tax = parseInt(e.tax) * subtotal / 100
                      // let discount = e.discount
                      // let paid = e.paid
                      // let expensesCost = parseInt(e.expenses.reduce((acc, current, i) => acc + current.total, 0))
                      return(
                        <tbody key={i}>
                        <tr >
                        <th scope="row">{e.name}</th>
                        <td style={{display:"flex", flexDirection:"column", alignItems:"center", alignContent:"center"}}>
                        {e.works.map((e,i)=>{
                          let time = e.time.reduce((acc, current, i) => acc + current, 0)
                          return(
                            <p style={{fontSize:"10px"}} key={i}>{time}</p>
                            
                          )
                        })}</td>
                        <td >
                        {e.works.map((e,i)=>{
                          
                          return(
                             !e.workId.jobName ? <p style={{fontSize:"10px"}}>Work Delete</p>:
                              <p style={{fontSize:"10px"}} key={i}>{e.workId.jobName}</p>
                            
                            
                            
                          )
                        })}
                        </td>
                        
                        <td>{e.works.map((e,i)=>{
                           
                           return(
                             e.workId.projectManager.map((e,i)=>{
                               return(
                                 <p style={{fontSize:"10px"}} key={i}>{e.projectId.name}</p>
                               )
                             })
                             
                           )
                         })}</td>
                        
                        <td >
                            <UncontrolledDropdown>
                           <DropdownToggle>
                              ...
                          </DropdownToggle>
                          <DropdownMenu
                            modifiers={{
                                    setMaxHeight: {
                                      enabled: true,
                                      order: 890,
                                      fn: (data) => {
                                        return {
                                          ...data,
                                          styles: {
                                            ...data.styles,
                                            overflow: 'auto',
                                            maxHeight: 100,
                                          },
                                        };
                                      },
                                    },
                                  }}
                                                        >
                          
                          <DropdownItem to={`/admin/time/addtime/${e._id}`} tag={Link}>Add Hours</DropdownItem>

                          <DropdownItem onClick={()=>{
                            authService
                              .estimateDelete(e._id)
                              .then(({data}) => {
                                
                                window.location.reload()
                                
                              })
                              .catch(err => {
                                //aquí deberia ir una notificacion o un swal o un toastr
                                console.log(err.response)
                                alert(err.response.data.msg || err.response.data.err.message)
                              })
                          }}><span
                                  className="text-danger">Delete</span></DropdownItem>
                          </DropdownMenu>
                          </UncontrolledDropdown>
                         
                        
                        </td>
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

export default Time;
