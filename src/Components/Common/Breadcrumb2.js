import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { BreadcrumbItem, Col, Row } from "reactstrap";

const BreadcrumbMultiple = (props) => {
  const { title, breadcrumbItems } = props;
  const itemLength = breadcrumbItems.length;
  return (
    <Row>
      <Col xs="12">
        <div className="page-title-box d-flex align-items-center justify-content-between">
          <div>
            <h4 className="mb-2 font-size-18">{title}</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                {breadcrumbItems.map((item, key) => (
                  <BreadcrumbItem key={key} active={key + 1 === itemLength}>
                    <Link to={item.link}>{item.title}</Link>
                  </BreadcrumbItem>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

BreadcrumbMultiple.propTypes = {
  breadcrumbItems: PropTypes.array,
  title: PropTypes.string,
};

export default BreadcrumbMultiple;
