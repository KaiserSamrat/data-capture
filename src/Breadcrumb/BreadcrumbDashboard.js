import React from "react";
import "./breadcrumb.scss";
const BreadcrumbDashboard = (props) => {
  // console.log(props);
  return (
    <>
      <div className="breadcrumb-main-wrap">
        <div className="breardcrumb-left-data">
          <h4>{props.leftTitle}</h4>
        </div>
        <div className="breardcrumb-left-data">
          <h4>
            {props.rightTitle} <span> </span> {props.pageTitle}
          </h4>
        </div>
      </div>
    </>
  );
};

export default BreadcrumbDashboard;
