import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { toast } from "react-toastify";
import { Alert, Col, Row } from "reactstrap";
import longArrow from "../../assests/images/ButtonLongArrow.png";
import mainLogo from "../../assests/images/main-logo.png";
import "../../assests/login.css";
import Loader from "../../Loader/MaacLoader";
import { loginUser, registrationUser } from "../../store/actions";
import "./registration.scss";
const Registration = () => {
  const [role, setRole] = useState("teacher");
  let [key, setKey] = useState("home");
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [email, setEmail] = useState("");
  let [phoneNumber, setPhoneNumber] = useState("");
  let [id, setId] = useState("");
  let [instituteName, setInstitueName] = useState("");
  let [password, setPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");
  // const { loading,  } = useSelector((state) => ({ ...state.Login }));
  let history = useHistory();
  const dispatch = useDispatch();
  const [checkerror, setCheckError] = useState("");

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const { token,  error , loading} = useSelector((state) => ({
    token: state.Login.token,
    error :state.registration.error,
     loading : state.registration.loading
  }))
  const handleValidSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      console.log("Field must not be empty");
      return;
    } else if (!validateEmail(email)) {
      setCheckError("Email is not valid");
      return;
    } else {
      console.log("email is valid");
      dispatch(loginUser({ email, password }, history));
    }
  };

  const hanldeTabSelect = (e, index) => {
    e.preventDefault();
    console.log("hello index data", index);

    if (index == 0) {
      setRole("teacher");
    } else if (index == 1) {
      setRole("student");
    }
  };
  const handleClick = (e) => {
    e.preventDefault();
    console.log("hello all data", e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!role) {
      toast.error("Please Select Role first");
    } else {
      if (!firstName) {
        toast.error("Please insert your fist name");
      } else if (!lastName) {
        toast.error("Please insert your last Name");
      } else if (!email) {
        toast.error("Please insert your email");
      } else if (!phoneNumber) {
        toast.error("Please insert your Phone Number");
      }    else if (password.length < 6) {
        toast.error("Password length must be more than 5");
      } else if (password !== confirmPassword) {
        toast.error("Both password are not matched");
      } else {
        dispatch(
          registrationUser(
            role,
            firstName,
            lastName,
            email,
            phoneNumber,
            instituteName ? instituteName :"",
            password,
            confirmPassword
          )
        );
      }
    }
  };
  return (
    <Container fluid className="hgfertyhbvfdertyhbg">
      <div className="account-pages login-main-wrap">
        <div className="login-left-logo">
          <img src={mainLogo} alt="" />
        </div>
        <div className="login-right-form registration">
          <div className="login-right-inner-forms-registration">
            <h2 className="mb-4">Complete Your Profile</h2>
            <Tabs activeKey={key} onClick={(e) => handleClick(e)}>
              <TabList>
                <Tab eventKey="teacher" onClick={(e) => hanldeTabSelect(e, 0)}>
                  <span>
                    <span></span>
                  </span>
                  Teacher
                </Tab>
                <Tab eventKey="student" onClick={(e) => hanldeTabSelect(e, 1)}>
                  <span>
                    <span></span>
                  </span>
                  Student
                </Tab>
              </TabList>
              {/* <h2>Loading data : {loading}</h2>
              <h3>error : {error}</h3> */}
              {loading ?   <div className="p-4 d-flex justify-content-center align-items-center p-2 mb-3 mt-5 mr-auto">
                      <Loader />
                    </div> : <> <TabPanel>
                <div className="p-2 container">
                  {loading ? (
                    <div className="p-4 d-flex justify-content-center align-items-center p-2 mb-3 mt-5 mr-auto">
                    <div class="spinner-border" role="status">
                       <span class="sr-only">Loading...</span>
                      </div>
                    </div>
                  ) : (
                    <div className="login-right-form-registration">
                      <div className="login-right-inner-form-registration">
                        <form
                          className="form-horizontal mt-4"
                            onSubmit={(e) => handleValidSubmit(e)}
                            autoComplete="off"
                        >
                          {error || checkerror ? (
                            <Alert color="danger">{error || checkerror}</Alert>
                          ) : null}
                          <Row>
                            <Col lg={6}>
                              <div className="mb-3">
                                <input
                                  name="firstName"
                                  label="firstName"
                                  value={firstName}
                                  className="form-control"
                                  placeholder="First Name"
                                  type="text"
                                  onChange={(e) => setFirstName(e.target.value)}
                                  required
                                />
                              </div>
                            </Col>
                            <Col lg={6}>
                              <div className="mb-3">
                                <input
                                  name="lastName"
                                  label="lastName"
                                  value={lastName}
                                  className="form-control"
                                  type="text"
                                  required
                                  placeholder="Last Name"
                                  onChange={(e) => setLastName(e.target.value)}
                                />
                              </div>
                            </Col>
                            <Col lg={12}>
                              <div className="mb-3">
                                <input
                                  // name="email"
                                  label="email"
                                  value={email}
                                  className="form-control"
                                  type="text"
                                  required
                                  placeholder="type your email"
                                  onChange={(e) => setEmail(e.target.value)}
                                />
                              </div>
                            </Col>
                            <Col lg={12}>
                              <div className="mb-3">
                                <input
                                  name="phoneNumber"
                                  label="Phone Number"
                                  value={phoneNumber}
                                  className="form-control"
                                  type="number"
                                  required
                                  placeholder="017xxxxxx"
                                  onChange={(e) =>
                                    setPhoneNumber(e.target.value)
                                  }
                                />
                              </div>
                            </Col>
                            {/* <Col lg={6}>
                              <div className="mb-3">
                                <input
                                  name="id"
                                  label="id"
                                  value={id}
                                  className="form-control"
                                  type="text"
                                  required
                                  placeholder="ID No."
                                  onChange={(e) => setId(e.target.value)}
                                />
                              </div>
                            </Col> */}
                            <Col lg={12}>
                              <div className="mb-3">
                                <input
                                  // name="instituteName"
                                  label="Institue Name"
                                  value={instituteName}
                                  className="form-control"
                                  type="text"
                                  required
                                  placeholder="Institute Name (optional)"
                                  onChange={(e) =>
                                    setInstitueName(e.target.value)
                                  }
                                />
                              </div>
                            </Col>
                            <Col lg={12}>
                              <div className="mb-3">
                                <input
                                   label="Password"
                                  value={password}
                                  className="form-control"
                                  type="password"
                                  required
                                  placeholder="New Password"
                                  onChange={(e) => setPassword(e.target.value)}
                                />
                              </div>
                            </Col>
                            <Col lg={12}>
                              <div className="mb-3">
                                <input
                                  name="password"
                                  label="Password"
                                  value={confirmPassword}
                                  className="form-control"
                                  type="password"
                                  required
                                  placeholder="Confirm Password"
                                  onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                  }
                                />
                              </div>
                            </Col>
                            </Row>
                           
                          
                          <Row className="mb-3">
                            <Col sm={6} className="text-end">
                              <div className="input-field-group submit-btn jhvnbnjdvbcnjhfbn">
                                <button
                                  type="submit"
                                  className="calibarX-default"
                                  onClick={(e) => handleSubmit(e)}
                                >
                                  Registration <img src={longArrow} alt="" />
                                </button>
                              </div>
                            </Col>
                            <Col sm={12}>
                              <div className="input-field-group input-radio-group-new-account">
                                <p>
                                  Already have a account?
                                  <Link to="login">Login</Link>
                                </p>
                              </div>
                            </Col>
                          </Row>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              </TabPanel>
              <TabPanel>
                <div className="p-2 container">
                  {loading ? (
                    <div className="p-4 d-flex justify-content-center align-items-center p-2 mb-3 mt-5 mr-auto">
                      <Loader />
                    </div>
                  ) : (
                    <div className="login-right-form-registration">
                      <div className="login-right-inner-form-registration">
                        <form
                          className="form-horizontal mt-4"
                          onSubmit={(e) => handleValidSubmit(e)}
                        >
                          {error || checkerror ? (
                            <Alert color="danger">{error || checkerror}</Alert>
                          ) : null}
                          <Row>
                            <Col lg={6}>
                              <div className="mb-3">
                                <input
                                  name="firstName"
                                  label="firstName"
                                  value={firstName}
                                  className="form-control"
                                  placeholder="First Name"
                                  type="text"
                                  onChange={(e) => setFirstName(e.target.value)}
                                  required
                                />
                              </div>
                            </Col>
                            <Col lg={6}>
                              <div className="mb-3">
                                <input
                                  name="lastName"
                                  label="lastName"
                                  value={lastName}
                                  className="form-control"
                                  type="text"
                                  required
                                  placeholder="Last Name"
                                  onChange={(e) => setLastName(e.target.value)}
                                />
                              </div>
                            </Col>
                            <Col lg={12}>
                              <div className="mb-3">
                                <input
                                  name="email"
                                  label="email"
                                  value={email}
                                  className="form-control"
                                  type="text"
                                  required
                                  placeholder="email@gmail.com"
                                  onChange={(e) => setEmail(e.target.value)}
                                />
                              </div>
                            </Col>
                            <Col lg={12}>
                              <div className="mb-3">
                                <input
                                  name="phoneNumber"
                                  label="Phone Number"
                                  value={phoneNumber}
                                  className="form-control"
                                  type="number"
                                  required
                                  placeholder="017xxxxxx"
                                  onChange={(e) =>
                                    setPhoneNumber(e.target.value)
                                  }
                                />
                              </div>
                            </Col>
                            {/* <Col lg={6}>
                              <div className="mb-3">
                                <input
                                  name="id"
                                  label="id"
                                  value={id}
                                  className="form-control"
                                  type="text"
                                  required
                                  placeholder="ID No."
                                  onChange={(e) => setId(e.target.value)}
                                />
                              </div>
                            </Col> */}
                            <Col lg={12}>
                              <div className="mb-3">
                                <input
                                  name="instituteName"
                                  label="Institue Name"
                                  value={instituteName}
                                  className="form-control"
                                  type="text"
                                  required
                                  placeholder="Institute Name (optional)"
                                  onChange={(e) =>
                                    setInstitueName(e.target.value)
                                  }
                                />
                              </div>
                            </Col>
                            <Col lg={12}>
                              <div className="mb-3">
                                <input
                                  name="password"
                                  label="Password"
                                  value={password}
                                  className="form-control"
                                  type="password"
                                  required
                                  placeholder="New Password"
                                  onChange={(e) => setPassword(e.target.value)}
                                />
                              </div>
                            </Col>
                            <Col lg={12}>
                              <div className="mb-3">
                                <input
                                  name="password"
                                  label="Password"
                                  value={confirmPassword}
                                  className="form-control"
                                  type="password"
                                  required
                                  placeholder="Confirm Password"
                                  onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                  }
                                />
                              </div>
                            </Col>
                          </Row>
                          
                          <Row className="mb-3">
                            <Col sm={6} className="text-end">
                              <div className="input-field-group submit-btn jhvnbnjdvbcnjhfbn">
                                <button
                                  type="submit"
                                  className="calibarX-default"
                                  onClick={(e) => handleSubmit(e)}
                                >
                                  Registration <img src={longArrow} alt="" />
                                </button>
                              </div>
                            </Col>
                            <Col sm={12}>
                              <div className="input-field-group input-radio-group-new-account">
                                <p>
                                  Already have a account?
                                  <Link to="/login">Login</Link>
                                </p>
                              </div>
                            </Col>
                          </Row>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              </TabPanel> </>}
            
            </Tabs>
            {/* <div className="p-2">
              {loading ? (
                <div className="p-4 d-flex justify-content-center align-items-center p-2 mb-3 mt-5 mr-auto">
                  <Loader />
                </div>
              ) : (
                <CardBody className="login-right-form">
                  <div className="login-right-inner-form">
                    <h2>
                      <b>Log In</b>
                    </h2>
                    <form
                      className="form-horizontal mt-4"
                      onSubmit={(e) => handleValidSubmit(e)}
                    >
                      {error || checkerror ? (
                        <Alert color="danger">{error || checkerror}</Alert>
                      ) : null}

                      <div className="mb-3">
                        <input
                          name="email"
                          label="Email"
                          value={email}
                          className="form-control"
                          placeholder="Enter email"
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <input
                          name="password"
                          label="Password"
                          value={password}
                          className="form-control"
                          type="password"
                          required
                          placeholder="Enter Password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>

                      <Row className="mb-3">
                        <Col sm={12}>
                          <div className="input-field-group- input-radio-group-new-account">
                            <p>
                              <Link to="registration"> Forget Password?</Link>
                            </p>
                          </div>
                        </Col>
                        <Col sm={6} className="text-end">
                          <div className="input-field-group submit-btn">
                            <button type="submit" className="calibarX-default">
                              Log In <img src={longArrow} alt="" />
                            </button>
                          </div>
                        </Col>
                        <Col sm={12}>
                          <div className="input-field-group input-radio-group-new-account">
                            <p>
                              Need to create a account?{" "}
                              <Link to="registration">Sign Up</Link>
                            </p>
                          </div>
                        </Col>
                      </Row>
                    </form>
                  </div>
                </CardBody>
              )}
            </div> */}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Registration;
