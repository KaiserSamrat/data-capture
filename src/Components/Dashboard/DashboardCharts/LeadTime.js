import React, { useEffect } from "react";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getLead } from "../../../store/Dashboard/action";
// import { Card, CardBody } from "reactstrap";
const LeadTime = () => {
  const dispatch = useDispatch();
  const { startDateRange, endDateRange, authtoken, leadData, leadDataLoading } =
    useSelector((state) => ({
      authtoken: state.Login.token,
      startDateRange: state.DashboardReducer.startDateRange,
      endDateRange: state.DashboardReducer.endDateRange,
      leadData: state.DashboardReducer.leadData,
      leadDataLoading: state.DashboardReducer.leadDataLoading,
    }));
  useEffect(() => {
    dispatch(getLead(authtoken, startDateRange, endDateRange));
  }, [startDateRange, endDateRange]);
  let brandClr = [
    "#556EE6",
    "#34C38F",
    "red",
    "blue",
    "green",
    "black",
    "yellow",
  ];
  return (
    <>
      <Card className="brandanalytic" style={{ paddingBottom: "20px" }}>
        <Card.Body>
          <div className="chart-title-top-content">
            <h6 className="card-title">Lead Time (Per hour)</h6>
          </div>

          <div id="donut-chart">
            <div className="row mt-4">
              <div className="col-md-4">
                <span className="me-2">CW</span> -{" "}
                <span className="ms-2">DH</span>
              </div>
              <div className="col-md-8 mt-1">
                <OverlayTrigger
                  placement="bottom"
                  overlay={
                    <Tooltip id="tooltip-disabled">
                      {Math.ceil(leadData?.data?.chalantime[0]?.difference)}
                    </Tooltip>
                  }
                >
                  {leadData?.data?.chalantime[0]?.difference >= 100 ? (
                    <div
                      style={{
                        width: "100%",
                        height: "5px",
                        borderRadius: "4px",
                        background: brandClr[0],
                      }}
                    ></div>
                  ) : (
                    <div
                      style={{
                        width: leadData?.data?.chalantime[0]?.difference,
                        height: "5px",
                        borderRadius: "4px",
                        background: brandClr[0],
                      }}
                    ></div>
                  )}
                </OverlayTrigger>
              </div>
            </div>
            {/* <div className="row mt-4">
              <div className="col-md-4">
                <span className="me-2">DH</span> -{" "}
                <span className="ms-2">Delivery</span>
              </div>
              <div className="col-md-8 mt-1">
                <div
                  style={{
                    width: "60%",
                    height: "5px",
                    borderRadius: "4px",
                    background: "#34C38F",
                  }}
                ></div>
              </div>
            </div> */}
            {/* <div className="row mt-4">
              <div className="col-md-4">
                <span className="me-2">BP</span> -{" "}
                <span className="ms-2">Delivery</span>
              </div>
              <div className="col-md-8 mt-1">
                <div
                  style={{
                    width: "40%",
                    height: "5px",
                    borderRadius: "4px",
                    background: "#F1B44C",
                  }}
                ></div>
              </div>
            </div> */}
          </div>
        </Card.Body>
      </Card>
    </>
  );
};
export default LeadTime;
