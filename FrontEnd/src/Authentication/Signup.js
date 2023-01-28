import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../Firebase/firebase";
import {
  Button,
  Col,
  Form,
  Row,
  Alert,
  Card,
  Container,
} from "react-bootstrap";
const SignUp = () => {
  const [err, setError] = useState("");
  const [data, setData] = React.useState({
    fullname: "",
    email: "",
    password: "",
  });
  const { email, password, fullname } = data;
  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const Signup = (e) => {
    // e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(user);
        routeChange();
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
  };
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `${process.env.PUBLIC_URL}/dashboard/`;
    navigate(path);
  };
  return (
    <div className="page main-signin-wrapper">
      <Row className="signpages text-center">
        <Col md={12} className="col-md-12">
          <Card>
            <Row className="row-sm">
              <Col
                lg={6}
                xl={5}
                className="d-none d-lg-block text-center bg-primary details"
              >
                <div className="mt-5 pt-5 p-2 pos-absolute">
                  <img
                    src={require("../assets/img/brand/logo-light.png")}
                    className="header-brand-img mb-4"
                    alt="logo"
                  />
                  <div className="clearfix"></div>
                  <img
                    src={require("../assets/img/svgs/user.svg").default}
                    className="ht-100 mb-0"
                    alt="user"
                  />
                  <h5 className="mt-4 text-white">Create Your Account</h5>
                  <span className="tx-white-6 tx-13 mb-5 mt-xl-0">
                    Signup to create, discover and connect with the global
                    community
                  </span>
                </div>
              </Col>
              <Col lg={6} xl={7} xs={12} sm={12} className=" login_form ">
                <Container fluid>
                  <Row className=" row-sm">
                    <Card.Body className="mt-2 mb-2">
                      <img
                        src={require("../assets/img/brand/logo.png")}
                        className=" d-lg-none header-brand-img text-start float-start mb-4 auth-light-logo"
                        alt="logo"
                      />
                      <img
                        src={require("../assets/img/brand/logo-light.png")}
                        className=" d-lg-none header-brand-img text-start float-start mb-4 auth-dark-logo"
                        alt="logo"
                      />
                      <div className="clearfix"></div>
                      <h5 className="text-start mb-2">Signup for Free</h5>
                      <p className="mb-4 text-muted tx-13 ms-0 text-start">
                        It's free to signup and only takes a minute.
                      </p>
                      {err && <Alert variant="danger">{err}</Alert>}
                      <Form>
                        <Form.Group
                          className="text-start form-group"
                          controlId="fromName"
                        >
                          <Form.Label>Name</Form.Label>
                          <Form.Control
                            className="form-control"
                            placeholder="Enter your firstname and lastname"
                            type="text"
                            name="fullname"
                            value={fullname}
                            onChange={changeHandler}
                          />
                        </Form.Group>
                        <Form.Group
                          className="text-start form-group"
                          controlId="formEmail"
                        >
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            className="form-control"
                            placeholder="Enter your email"
                            type="text"
                            name="email"
                            value={email}
                            onChange={changeHandler}
                          />
                        </Form.Group>
                        <Form.Group
                          className="text-start form-group"
                          controlId="formpassword"
                        >
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            className="form-control"
                            placeholder="Enter your password"
                            type="password"
                            name="password"
                            value={password}
                            onChange={changeHandler}
                          />
                        </Form.Group>

                        <Button
                          onClick={Signup}
                          className="btn ripple btn-main-primary btn-block mt-2"
                        >
                          Create Account
                        </Button>
                      </Form>
                      <div className="text-start mt-5 ms-0">
                        <p className="mb-0">
                          Already have an account?
                          <Link
                            to={`${process.env.PUBLIC_URL}/authentication/login`}
                          >
                            {" "}
                            SignIn
                          </Link>
                        </p>
                      </div>
                    </Card.Body>
                  </Row>
                </Container>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
SignUp.propTypes = {};

SignUp.defaultProps = {};

export default SignUp;
