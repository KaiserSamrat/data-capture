import React, { useState } from "react";
// import { AvField, AvForm } from "availity-reactstrap-validation"
import MetaTags from "react-meta-tags";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
import { Alert, CardBody, Col, Row } from "reactstrap";
import longArrow from "../../assests/images/ButtonLongArrow.png";
import mainLogo from "../../assests/images/main-logo.png";
import "../../assests/login.css";
import Loader from "../../Loader/MaacLoader";
import { resetPassword } from "../../store/actions";

const PasswordConfirmation = () => {
  //  const { error } = useSelector((state) => ({ ...state.loginError }));
  const { loading, error} = useSelector((state) => ({
     
     loading : state.registration.loading,
     error : state.registration.error
  }))
  let history = useHistory();
  const dispatch = useDispatch();
  const [checkerror, setCheckError] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  let [email, setEmail] = useState("");
  let location = useLocation();
  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("pass and confirm pass", password, confirmPassword);
    //got email from url
    const email = new URLSearchParams(location.search).get("email");
    //got token from url
    const accountActivateToken = new URLSearchParams(location.search).get(
      "token"
    );
    if (!password || password.length < 6) {
      // toast.error("Password is too short");
      setCheckError("Password is too short")
    } else if (password !== confirmPassword) {
      // toast.error("Passwords are not matched");
      setCheckError("Passwords are not matched")

    } else {
      dispatch(
        resetPassword(
          email,
          accountActivateToken,
          password,
          confirmPassword,
          history
        )
      );
    }
  };
  return (
    <React.Fragment>
      <div className="account-pages login-main-wrap">
        <MetaTags>
          <title>Login | GameProject</title>
        </MetaTags>

        <div className="login-left-logo">
          <img src={mainLogo} alt="" />
        </div>
        <div className="login-right-form">
          <div className="login-right-inner-form">
            <div className="p-2">
              {loading ? (
                <div className="p-4 d-flex justify-content-center align-items-center p-2 mb-3 mt-5 mr-auto">
                <div class="spinner-border" role="status">
  <span class="sr-only">Loading...</span>
</div>
                </div>
              ) : (
                <CardBody className="login-right-form">
                  <div className="login-right-inner-form">
                    <h2>
                      <b>Confirm Password</b>
                    </h2>
                    <form
                      className="form-horizontal mt-4"
                      onSubmit={(e) => handleSubmit(e)}
                    >
                      {error || checkerror ? (
                        <Alert color="danger">{error || checkerror}</Alert>
                      ) : null}

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
                      <div className="mb-3">
                        <input
                          name="confirmPassword"
                          label="Confirm Password"
                          value={confirmPassword}
                          className="form-control"
                          type="password"
                          placeholder="Enter Password"
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                      </div>

                      <Row className="mb-3">
                        <Col sm={12}></Col>
                        <Col sm={6} className="text-end">
                          <div className="input-field-group submit-btn">
                            <button type="submit" className="calibarX-default">
                              Confirm Password <img src={longArrow} alt="" />
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
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default PasswordConfirmation;
