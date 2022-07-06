import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { BreadcrumbItem, Col, Row } from "reactstrap";
import Button from "../Common/Button";

const Breadcrumb = (props) => {
  // const {pathname} = useLocation()
  return (
    <Row>
      <Col xs="12">
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <div>
            <h4 className="mb-0 font-size-16">{props.breadcrumbItem}</h4>
            {props.isBreadCrumb && (
              <div className="page-title-right custom-bottom-margin">
                <ol className="breadcrumb m-0 p-0 mt-2">
                  <BreadcrumbItem>
                    <Link to={props.backLink}>{props.title}</Link>
                  </BreadcrumbItem>
                  <BreadcrumbItem active>
                    <Link to="#">{props.subTitle}</Link>
                  </BreadcrumbItem>
                </ol>
              </div>
            )}
          </div>
          {props.isButton ? (
            <div>
              <Button
                className="btn button d-flex align-items-center"
                onClick={props.onAddHandler}
              >
                + {props.buttonText}
              </Button>
            </div>
          ) : (
            <span></span>
          )}
        </div>
      </Col>
    </Row>
  );
};

Breadcrumb.propTypes = {
  breadcrumbItem: PropTypes.string,
  buttonText: PropTypes.string,
  onAddHandler: PropTypes.string,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  isBreadCrumb: PropTypes.bool,
  backLink: PropTypes.string,
};

export default Breadcrumb;
