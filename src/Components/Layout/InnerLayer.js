import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { Container } from "reactstrap";
import Breadcrumb from "../../Components/Common/Breadcrumb";
import BreadcrumbMultiple from "../../Components/Common/Breadcrumb2";
const InnerLayer = ({
  children,
  wrapperClass,
  title,
  isBreadCrumb,
  link,
  mainTitle,
  subTitle,
  isMultiple,
  breadcrumbItems,
  buttonText,
  onAddHandler,
  isButton,
}) => {
  const { brandData, loading, authtoken, areaData, role } = useSelector(
    (state) => ({
      brandData: state.InfoReducer.brandData,
      authtoken: state.Login.token,
      role: state.Login.userrole,
    })
  );
  return (
    <div className="page-content">
      <Container fluid>
        {isMultiple ? (
          <BreadcrumbMultiple title={title} breadcrumbItems={breadcrumbItems} />
        ) : (
          <Breadcrumb
            breadcrumbItem={title}
            isBreadCrumb={isBreadCrumb}
            title={mainTitle}
            subTitle={subTitle}
            backLink={link}
            buttonText={buttonText}
            onAddHandler={onAddHandler}
            role={role}
            isButton={isButton}
          />
        )}

        <div className={wrapperClass}>{children}</div>
      </Container>
    </div>
  );
};

InnerLayer.propTypes = {
  title: PropTypes.string,
  wrapperClass: PropTypes.string,
  children: PropTypes.any,
  isBreadCrumb: PropTypes.bool,
  mainTitle: PropTypes.string,
  subTitle: PropTypes.string,
  link: PropTypes.string,
  breadcrumbItems: PropTypes.array,
  isMultiple: PropTypes.bool,
};

export default InnerLayer;
