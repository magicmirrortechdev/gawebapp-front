import React from "react";
import { withRouter } from 'react-router-dom'
import AuthService from '../../services/services'


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
const authService = new AuthService()


class AddReport extends React.Component {
  state = {
  };

  handleInput = e => {
    e.persist()
    this.setState(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

 

  handleSubmit = (e, props) => {
    e.preventDefault()
        authService
          .addJob(this.state)
          .then(response => {
            //aquí deberia ir una notificacion o un swal o un toastr
            this.props.history.push(`jobs`)
            console.log(response)
          })
          .catch(err => {
            //aquí deberia ir una notificacion o un swal o un toastr
            console.log(err.response)
            alert(err.response.data.msg || err.response.data.err.message)
          })
  }

  render() {
    return (
      <>
        <Header />
        {/* Page content */}

      </>
    );
  }
}

export default withRouter(AddReport);
