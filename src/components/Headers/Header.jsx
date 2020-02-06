
import React from "react";

// reactstrap components
import {  Container} from "reactstrap";

class Header extends React.Component {
  render() {
    return (
      <>
        <div className={"header bg-gradient-info pb-7 pt-5 " + (!this.props.forms ? "pt-md-8": "")} >
            {!this.props.forms && (
                <Container fluid >
                  <div className="header-body">
                  {/* Card stats 
                  <Row>
                    <Col lg="6" xl="3">
                      <Card className="card-stats mb-4 mb-xl-0">
                        <CardBody>
                          <Row>
                            <div className="col">
                              <CardTitle
                                  tag="h5"
                                  className="text-uppercase text-muted mb-0"
                              >
                                0 Overdue
                              </CardTitle>
                              <span className="h2 font-weight-bold mb-0">
                            $ 0.00 USD
                          </span>
                            </div>
                            <Col className="col-auto">
                              <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                                <i className="fas fa-chart-bar" />
                              </div>
                            </Col>
                          </Row>
                          <p className="mt-3 mb-0 text-muted text-sm">

                            <span className="text-nowrap">View Invoices</span>
                          </p>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col lg="6" xl="3">
                      <Card className="card-stats mb-4 mb-xl-0">
                        <CardBody>
                          <Row>
                            <div className="col">
                              <CardTitle
                                  tag="h5"
                                  className="text-uppercase text-muted mb-0"
                              >
                                0 unpaid
                              </CardTitle>
                              <span className="h2 font-weight-bold mb-0">
                            $0.00 USD
                          </span>
                            </div>
                            <Col className="col-auto">
                              <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                                <i className="fas fa-chart-pie" />
                              </div>
                            </Col>
                          </Row>
                          <p className="mt-3 mb-0 text-muted text-sm">

                            <span className="text-nowrap">View Invoices</span>
                          </p>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col lg="6" xl="3">
                      <Card className="card-stats mb-4 mb-xl-0">
                        <CardBody>
                          <Row>
                            <div className="col">
                              <CardTitle
                                  tag="h5"
                                  className="text-uppercase text-muted mb-0"
                              >
                                0 Unsent
                              </CardTitle>
                              <span className="h2 font-weight-bold mb-0">$0.00 USD</span>
                            </div>
                            <Col className="col-auto">
                              <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                                <i className="fas fa-users" />
                              </div>
                            </Col>
                          </Row>
                          <p className="mt-3 mb-0 text-muted text-sm">
                            <span className="text-nowrap">View Invoices</span>
                          </p>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                  */}
                </div>
                </Container>
            )}
        </div>
      </>
    );
  }
}

export default Header;
