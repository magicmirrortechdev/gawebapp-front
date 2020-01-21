
import React from "react";

import Chart from "chart.js";
// react plugin used to create charts
// reactstrap components
import {
  Card,
  CardHeader,

  Table,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
} from "variables/charts.jsx";

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
  componentWillMount() {
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }
  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="8">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Notifications</h3>
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
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Number</th>
                      <th scope="col">Job</th>
                      <th scope="col">Date</th>
                      <th scope="col">Status</th>
                      <th scope="col">Total</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Kitchen Remove</td>
                      <td>Dec 24, 2019</td>
                      <td>50%</td>
                      <td>$0.00 USD</td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
            </Col>
            <Col xl="4">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Recently Edited</h3>
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
                  <Row>
                  <div className="col">
                      <h4 className="mb-0">No recently edited documents</h4>
                  </div>
                  </Row>
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Weekly Sales</h3>
                    </div>
                  </Row>
                  <Row>
                    <div className="col">
                      <h2 className="mb-0">$0.00 USD</h2>
                    </div>
                  </Row>
                  <Row>  
                    <div className="col">
                      <p className="mb-0" href="#">View More</p>
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
                
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Index;
