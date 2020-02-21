
import React from "react";

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
import { Link } from "react-router-dom";

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
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Create Estimate</th>
                      <th scope="col">Create Invoice</th>
                      <th scope="col">Add Expense</th>
                      <th scope="col">Add Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row"><Link to="/admin/addestimate">Click Here</Link></th>
                      <td><Link to="/admin/createinvoice">Click Here</Link></td>
                      <td><Link to="/admin/addexpense">Click Here</Link></td>
                      <td><Link to="/admin/addtime">Click Here</Link></td>
                    </tr>
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

export default Index;
