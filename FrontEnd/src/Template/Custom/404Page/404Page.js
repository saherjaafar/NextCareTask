import React, { Fragment } from "react";
import { Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
const Error404 = () => {
  document.querySelector("body").classList.add("error-1");
  return (
    <Fragment>
      {/* <!-- Page --> */}
      <div className="ltr main-body leftmenu">
        <div className="page main-signin-wrapper bg-primary construction">
          <Container>
            <div className="construction1 text-center details text-white">
              <div>
                <Col lg={12}>
                  <h1 className="tx-140 mb-0">404</h1>
                </Col>
                <Col lg={12}>
                  <h1>Oops.The Page you are looking for doesn't exit..</h1>
                  <h6 className="tx-15 mt-3 mb-4 text-white-50">
                    You may have mistyped the address or the page may have
                    moved. Try searching below.
                  </h6>
                  <Link
                    to={`${process.env.PUBLIC_URL}/dashboard/`}
                    className="btn ripple btn-success text-center mb-2"
                  >
                    Back to Home
                  </Link>
                </Col>
              </div>
            </div>
          </Container>
        </div>
      </div>
      {/* <!-- End Page - */}
    </Fragment>
  );
};

Error404.propTypes = {};

Error404.defaultProps = {};

export default Error404;
