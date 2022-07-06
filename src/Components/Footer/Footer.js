import React from "react";
import { Container } from "react-bootstrap";
import "./footer.scss";
const Footer = () => {
  return (
    <div className="footer-main-area-wrap">
      <Container fluid>
        <div className="footer-inner-area-wrap footer-responsive">
          <p>2022 © mERP</p>
          <p>
            <a className="me-2" style={{ color: "#495057" }}>
              Contact Us
            </a>{" "}
            <a className="me-2" style={{ color: "#495057" }}>
              Privacy Policy{" "}
            </a>{" "}
            <a className="me-2" style={{ color: "#495057" }}>
              Terms & Condition
            </a>
          </p>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
