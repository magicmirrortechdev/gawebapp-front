
import React from "react";

import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Button
} from "reactstrap";

// core components
import Header from "components/Headers/Header.jsx";

class Index extends React.Component {
  state = {
    activeNav: 1,
    chartExample1Data: "data1"
  };


  toggleNavs = (e, index) => {
    e.preventDefault();
    this.setState({
      activeNav: index,
      chartExample1Data:
        this.state.chartExample1Data === "data1" ? "data2" : "data1"
    });
    let wow = () => {
      console.log(this.state);
    };
    wow.bind(this);
    setTimeout(() => wow(), 1000);
    // this.chartReference.update();
  };

  componentDidMount(props) {
    const loggedUser = localStorage.getItem('loggedUser')
    if (!loggedUser) return this.props.history.push('/auth/login')
  }
  render() {
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
                      <h3 className="mb-0">Actions</h3>
                      
                    </div>
                    {/*
                    <div className="col text-right">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        size="sm"
                      >
                        See all
                      </Button>
                    </div>
                    */}
                  </Row>
                </CardHeader>
                <CardBody>
                    <Row>
                    <Col lg="6" className="mb-5">
                    <Button
                              style={{width:'50%'}}
                              className="form-control-alternative"
                              color="info"
                              onClick={()=>{this.props.history.push(`/admin/addexpense`)}}
                            >New Expense
                    </Button>
                    <br/>
                    <br/>
                    <br/>
                    <Button
                              style={{width:'50%'}}
                              className="form-control-alternative"
                              color="info"
                              onClick={()=>{this.props.history.push(`/admin/addtime`)}}
                            >Add Time
                    </Button>
                    </Col>
                    <br/>
                    <br/>
                    <Col lg="6">
                    <Button
                              style={{width:'50%'}}
                              className="form-control-alternative"
                              color="info"
                              onClick={()=>{this.props.history.push(`/admin/addestimate`)}}
                            >New Estimate
                      </Button>
                      <br/>
                      <br/>
                      <br/>
                      <Button
                              style={{width:'50%'}}
                              className="form-control-alternative"
                              color="info"
                              onClick={()=>{this.props.history.push(`/admin/createinvoice`)}}
                            >New Invoice
                      </Button>
                    </Col>
                      
                    </Row>
                    
                </CardBody>
              </Card>
            </Col>
            
          </Row>
        </Container>
      </>
    );
  }
}

export default Index;
