import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
// import { AvField, AvForm } from "availity-reactstrap-validation"
import MetaTags from "react-meta-tags";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { CardBody, Col, Row } from "reactstrap";
import longArrow from "../../assests/images/ButtonLongArrow.png";
import "../../assests/login.css";
import logoSite from "../../DashboardCommonFile/img/Logo (512x512).png";
import { loginUser } from "../../store/actions";
import loginImage from "./img/loginImage.jpg";
const Login = () => {
  const { loading, token, role } = useSelector((state) => ({ ...state.Login }));
  const { error } = useSelector((state) => ({ ...state.loginError }));
  let history = useHistory();
  const dispatch = useDispatch();
  const [checkerror, setCheckError] = useState("");

  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");

  const validateEmail = (employeeId) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(employeeId).toLowerCase());
  };
  const handleValidSubmit = (e) => {
    e.preventDefault();

    if (!employeeId || !password) {
      console.log("Field must not be empty");
      return;
    } else if (!validateEmail(employeeId)) {
      setCheckError("Email is not valid");
      return;
    } else {
      console.log("email is valid");
      dispatch(loginUser({ employeeId, password }, history));
    }
  };
  const [showPass, setshowPass] = React.useState(false);

  return (
    <React.Fragment>
      <div className="account-pages login-main-wrap">
        <MetaTags>
          <title>mERP</title>
        </MetaTags>

        <div className="login-left-logo mt-5">
          <img src={loginImage} alt="" style={{ width: "520px" }} />
        </div>
        <div className="login-right-form">
          <div className="login-right-inner-form">
            <div className="p-2">
              <div className="login-page-site-logo">
                <img src={logoSite} alt="" />
              </div>
              <CardBody className="login-right-form">
                <div className="login-right-inner-form">
                  <h2>Log In</h2>

                  <form
                    className="form-horizontal mt-4"
                    onSubmit={(e) => handleValidSubmit(e)}
                  >
                    {error || checkerror ? (
                      <Row>
                        <Col sm={12}>
                          <div className="error-main-area-hdfskjdfbschdb">
                            <p>
                              <i class="bx bxs-error-alt"></i>{" "}
                              {error || checkerror}
                            </p>
                          </div>
                        </Col>{" "}
                      </Row>
                    ) : null}

                    <div className="mb-3 input-field-login-email">
                      <input
                        name="employeeId"
                        label="Email"
                        value={employeeId}
                        className="form-control"
                        placeholder="Enter email"
                        onChange={(e) => setEmployeeId(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3 input-field-login-email password form-password-group-show-hide">
                      <input
                        name="password"
                        label="Password"
                        value={password}
                        className="form-control"
                        type={showPass ? "text" : "password"}
                        required
                        placeholder="Enter Password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <span onClick={() => setshowPass(!showPass)}>
                        {showPass ? (
                          <span>
                            <i class="fa-solid fa-eye"></i>
                          </span>
                        ) : (
                          <span>
                            <i class="fa-solid fa-eye-slash"></i>
                          </span>
                        )}
                      </span>
                    </div>

                    <Row className="mb-3">
                      <Col sm={6} className="text-end">
                        <div className="input-field-group submit-btn">
                          {loading ? (
                            <button type="submit" className="calibarX-default">
                              <Spinner animation="border" role="status">
                                <span className="visually-hidden">
                                  Loading...
                                </span>
                              </Spinner>
                            </button>
                          ) : (
                            <button type="submit" className="calibarX-default">
                              Log In <img src={longArrow} alt="" />
                            </button>
                          )}
                        </div>
                      </Col>
                      <Col sm={12}>
                        <div className="input-field-group- input-radio-group-new-account">
                          <p>
                            <Link to="/recovery-account">
                              {" "}
                              Forget Password?
                            </Link>
                          </p>
                        </div>
                      </Col>
                      {/* <Col sm={12}>
                          <div className="input-field-group input-radio-group-new-account">
                            <p>
                              Need to create a account?{" "}
                              <Link to="registration">Sign Up</Link>
                            </p>
                          </div>
                        </Col> */}
                    </Row>
                  </form>
                </div>
              </CardBody>
              {/* {loading ? (
                <div className="p-4 d-flex justify-content-center align-items-center p-2 mb-3 mt-5 mr-auto">
                  <Loader />
                </div>
              ) : (
              
              )} */}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Login;
