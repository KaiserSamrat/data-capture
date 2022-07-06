import PropTypes from "prop-types";
import React from "react";
import { Card } from "reactstrap";

const CardComponent = ({ children, className }) => {
  return (
    <React.Fragment>
      <Card className="CustomCard">{children}</Card>
    </React.Fragment>
  );
};

CardComponent.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
};

export default CardComponent;
