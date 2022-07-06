import PropTypes from "prop-types";
import React from "react";
import { Card, CardBody } from "reactstrap";

const AddCardComponent = ({ children, className }) => {
  return (
    <React.Fragment>
      <Card>
        <CardBody style={{ padding: "30px 40px" }}>{children}</CardBody>
      </Card>
    </React.Fragment>
  );
};

AddCardComponent.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
};

export default AddCardComponent;
