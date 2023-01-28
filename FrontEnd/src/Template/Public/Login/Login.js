import React, { Fragment, useState } from "react";
import {
  Button,
  Col,
  Form,
  Row,
  Alert,
  Container,
  Card,
  Spinner,
} from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Variables } from "../../../Variables/Variables";
import Util from "../../../Utilities/Util";
import AesClass from "../../../Utilities/AesClass";

const Login = (props) => {
  document.title = "Login | NextCare-Task";
  const [loader, setLoader] = useState(false);

  const [err, setError] = useState("");

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    if (value == "" || value == null) {
      var element = document.getElementById(name);
      element.classList.add("is-invalid");
    } else {
      var element = document.getElementById(name);
      element.classList.remove("is-invalid");
    }

    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  let navigate = useNavigate();

  // Is Data Valid
  function IsDataValid() {
    var hasError = false;
    var element;
    if (data.email == null || data.email == "") {
      element = document.getElementById("email");
      element.classList.add("is-invalid");
      element.focus();
      hasError = true;
    }
    if (data.password == null || data.password == "") {
      element = document.getElementById("password");
      element.classList.add("is-invalid");
      element.focus();
      hasError = true;
    }

    if (hasError === true) {
      return false;
    } else {
      return true;
    }
  }

  const Login = async (e) => {
    var valid = IsDataValid();
    if (valid) {
      e.preventDefault();
      setLoader(true);
      let response = await fetch(Variables.API_URL + "User/Login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Email: data.email,
          Password: data.password,
        }),
      });
      let result = await response.json();
      if (response.status === 200) {
        localStorage.setItem("akkxX877Kl", Util.encrypt(result.Id)); // set UserId in localStorage
        localStorage.setItem("akkxXFFgt", Util.encrypt(result.FullName)); // set FullName in localStorage
        localStorage.setItem("o0pxFFgkOo", Util.encrypt(result.Email)); // set Email in localStorage
        localStorage.setItem("ppL86wS9qq", Util.encrypt(result.LoginToken)); // set LoginToken in localStorage
        localStorage.setItem("oqJSDS97QL", Util.encrypt(result.Role)); // set Permissions in localStorage
        localStorage.setItem("jjQTkm78m0", Util.encrypt(result.JwtToken)); // set jwt Token in localStorage
        setLoader(false);
        props.setIsAuth(true);
        navigate("/Admission/0");
      } else {
        setLoader(false);
        setError(result);
      }
    }
  };

  return (
    <>
      <Fragment>
        {/* <!-- Row --> */}
        <div className="page main-signin-wrapper">
          <Row className="signpages text-center">
            <Col md={12}>
              <Card>
                <Row className="row-sm">
                  <Col
                    lg={6}
                    xl={5}
                    className="d-none d-lg-block text-center bg-primary details"
                  >
                    <div className="mt-5 pt-4 p-2 pos-absolute">
                      <img
                        src={require("../../../assets/img/brand/logo-light.png")}
                        className="header-brand-img mb-4"
                        alt="logo-light"
                      />
                      <div className="clearfix"></div>
                      <img
                        src={
                          require("../../../assets/img/svgs/user.svg").default
                        }
                        className="ht-100 mb-0"
                        alt="user"
                      />
                      <h5 className="mt-4 text-white">Welcome</h5>
                      <span className="tx-white-6 tx-13 mb-5 mt-xl-0">
                        Login To Your Account
                      </span>
                    </div>
                  </Col>
                  <Col lg={6} xl={7} xs={12} sm={12} className="login_form ">
                    <Container fluid>
                      <Row className="row-sm">
                        <Card.Body className="mt-2 mb-2">
                          <img
                            src={require("../../../assets/img/brand/logo.png")}
                            className=" d-lg-none header-brand-img text-start float-start mb-4 auth-light-logo"
                            alt="logo"
                          />
                          <img
                            src={require("../../../assets/img/brand/logo-light.png")}
                            className=" d-lg-none header-brand-img text-start float-start mb-4 auth-dark-logo"
                            alt="logo"
                          />
                          <div className="clearfix"></div>
                          {err && <Alert variant="danger">{err}</Alert>}
                          <Form>
                            <h5 className="text-start mb-2">Welcome Back !!</h5>
                            <p className="mb-4 text-muted tx-13 ms-0 text-start">
                              Sign in to Your Account
                            </p>
                            <Form.Group
                              className="text-start form-group"
                              controlId="email"
                            >
                              <Form.Label>Email</Form.Label>
                              <Form.Control
                                className="form-control"
                                placeholder="Enter your email"
                                name="email"
                                type="text"
                                value={data.email}
                                onChange={(e) => changeHandler(e)}
                                required
                              />
                            </Form.Group>
                            <Form.Group
                              className="text-start form-group"
                              controlId="password"
                            >
                              <Form.Label>Password</Form.Label>
                              <Form.Control
                                className="form-control"
                                placeholder="Enter your password"
                                name="password"
                                type="password"
                                value={data.password}
                                onChange={(e) => changeHandler(e)}
                                required
                              />
                            </Form.Group>
                            <Button
                              onClick={Login}
                              className="btn ripple btn-main-primary btn-block mt-2"
                            >
                              {loader == true ? (
                                <>
                                  <Spinner
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                  />
                                  <Spinner
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                  />
                                  <Spinner
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                  />
                                </>
                              ) : (
                                "Sign In"
                              )}
                            </Button>
                          </Form>
                          <div className="text-start mt-5 ms-0">
                            <div className="mb-1">
                              <Link
                                to={`${process.env.PUBLIC_URL}/forgetpassword`}
                              >
                                {" "}
                                Forgot password ?
                              </Link>
                            </div>
                            {/* <div>
                              Don't have an account?
                              <Link
                                to={`${process.env.PUBLIC_URL}/authentication/signup`}
                              >
                                {" "}
                                Resgister Here
                              </Link>
                            </div> */}
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

        {/* <!-- End Row --> */}
      </Fragment>
    </>
  );
};

Login.propTypes = {};

Login.defaultProps = {};

export default Login;
