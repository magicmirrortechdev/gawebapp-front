
import React from "react";

// reactstrap components
import { Row, Col } from "reactstrap";
import Global from "../../global";

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <Row className="align-items-center justify-content-xl-between">
          <Col xl="12">
            <div className="copyright text-center text-xl-center text-muted">
              © 2020{" "}
              <a
                className="font-weight-bold ml-1"
                href="https://www.magicmirror.dev"
                rel="noopener noreferrer"
                target="_blank"
              >
                Magic Mirror - Version {Global.version}
              </a>
            </div>
          </Col>
        </Row>
      </footer>
    );
  }
}

export default Footer;
