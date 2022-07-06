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
import { forgetPassword, resetPassword } from "../../store/actions";

const RecoveryAccount = () => {
 
  const { message, error, loading } = useSelector((state) => ({
    message: state.ForgetPassword.message,
    error : state.ForgetPassword.error,
    loading : state.ForgetPassword.loading
      
  }));
  let history = useHistory();
  const dispatch = useDispatch();
  const [checkerror, setCheckError] = useState("");

  let [email, setEmail] = useState("");
  let location = useLocation();
  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e) => {
  
    
    if (!email) {
      setCheckError("Enter a valid email")
    } else {
      dispatch(
       forgetPassword(email)
      );
    }
     
    
  };
  return (
    <React.Fragment>
      <div className="account-pages login-main-wrap">
        <MetaTags>
          <title>Recovery Account | GameProject</title>
        </MetaTags>

        <div className="login-left-logo">
          <img src={mainLogo} alt="" />
        </div>
        <div className="login-right-form">
          <div className="login-right-inner-form">
            <div className="p-2">
              {loading ? (
                <div className="p-4 d-flex justify-content-center align-items-center p-2 mb-3 mt-5 mr-auto">
                  <Loader />
                </div>
              ) : (
                <CardBody className="login-right-form">
                  <div className="login-right-inner-form">
                    <h2>
                      <b>Recovery Account</b>
                    </h2>
                    <form
                      className="form-horizontal mt-4"
                      onSubmit={(e) => handleSubmit(e)}
                    >
                     

                      <div className="mb-3">
                        <input
                          name="recoveryAccount"
                          label="Recovery Account"
                          value={email}
                          className="form-control"
                          type="email"
                          placeholder="Enter Email"
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>

                        <Row className="mb-3">
                          {error || checkerror ? (
                            <Col sm={6} className="text-end">
                          <div className="error-main-area-hdfskjdfbschdb">
                            <p>
                              <i class="bx bxs-error-alt"></i> {error || checkerror}
                            </p>
                          </div>
                        </Col>
                       ) : null}
                        
                        <Col sm={12}>
                          <div className="input-field-group submit-btn">
                            <button  type="submit" className="calibarX-default">
                              Recovery Account <img src={longArrow} alt="" />
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
export default RecoveryAccount;
