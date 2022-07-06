import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
// import { AvField, AvForm } from "availity-reactstrap-validation"
import MetaTags from "react-meta-tags";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import "../../assests/login.css";
import mainLogo from "../../DashboardCommonFile/img/logo.svg";
import { loginUser,loginUserError } from "../../store/actions";
const Login = () => {
  
  const { loading, token, role } = useSelector((state) => ({ ...state.Login }));
  const { error } = useSelector((state) => ({ ...state.loginError }));
  let history = useHistory();
  const dispatch = useDispatch();
  const [checkerror, setCheckError] = useState("");

  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");


  // const validateEmail = (employeeId) => {
  //   const re =
  //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   return re.test(String(employeeId).toLowerCase());
  // };
  const handleValidSubmit = (e) => {
    e.preventDefault();

    if (!employeeId || !password) {
      console.log("Field must not be empty");
      return;
    } else {
      console.log("email is valid");
      dispatch(loginUser({ employeeId, password }, history));
    }
  };
  const [showPass, setshowPass] = React.useState(false);
  useEffect(()=>{
    dispatch(loginUserError())
    
  },[])
  return (
    <React.Fragment>
      <MetaTags>
        <title>mERP</title>
      </MetaTags>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <div className="text-center mb-5">
                <img src={mainLogo} alt="" style={{ width: "120px" }} />
              </div>
              <Card
                className="overflow-hidden"
                style={{ marginTop: "10px !important" }}
              >
                <CardBody className="pt-0">
                  <form className="mt-4" onSubmit={(e) => handleValidSubmit(e)}>
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

                    <div className="mb-4">
                      <label>ID</label>
                      <input
                        name="employeeId"
                        label="Email"
                        value={employeeId}
                        className="form-control"
                        placeholder="Enter ID"
                        onChange={(e) => setEmployeeId(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label>Password</label>
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
                      <span
                        onClick={() => setshowPass(!showPass)}
                        className="custom-position"
                      >
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
                      <Col sm={12} className="">
                        <div className="">
                          {loading ? (
                            <div class="mt-3 d-grid">
                              <button
                                class="btn btn-secondary btn-block"
                                type="submit"
                              >
                                <Spinner
                                  animation="border"
                                  role="status"
                                  size="sm"
                                >
                                  <span className="visually-hidden">
                                    Loading...
                                  </span>
                                </Spinner>
                              </button>
                            </div>
                          ) : (
                            <div class="mt-3 d-grid">
                              <button
                                class="btn btn-secondary btn-block"
                                type="submit"
                              >
                                Log In
                              </button>
                            </div>
                          )}
                        </div>
                      </Col>
                      {/* <Col sm={12}>
                        <div className="input-field-group- input-radio-group-new-account text-end mt-3">
                          <p>
                            <Link to="/recovery-account">
                              {" "}
                              Forget Password?
                            </Link>
                          </p>
                        </div>
                      </Col> */}
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
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};
export default Login;
