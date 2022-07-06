import React from "react";
import MainFooter from "../StudentPages/Common/footer/MainFooter";
import LoginHeader from "../StudentPages/Common/LoginHeader";
import succsessfullIcon from "./img/illustration.svg";
const Succsessfull = () => {
  return (
    <div>
      <LoginHeader />
      <div className="succsessfull-massage-main-area-wrap">
        <div>
          <div className="succsessfull-massage-image">
            <img src={succsessfullIcon} alt="" />
          </div>
          <div className="succsessfull-massage-content">
            <h3>Check your email</h3>
            <p>
              A mail has been sent in your <br /> account.
            </p>
          </div>
        </div>
      </div>
      <MainFooter />
    </div>
  );
};

export default Succsessfull;
