import React, { useEffect } from "react";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getError } from "../../../store/Dashboard/action";
const Error = () => {
  const dispatch = useDispatch();
  const { startDateRange, endDateRange, authtoken, errorData, errorLoading } =
    useSelector((state) => ({
      authtoken: state.Login.token,
      startDateRange: state.DashboardReducer.startDateRange,
      endDateRange: state.DashboardReducer.endDateRange,
      errorData: state.DashboardReducer.errorData,
      errorLoading: state.DashboardReducer.errorLoading,
    }));
  useEffect(() => {
    dispatch(getError(authtoken, startDateRange, endDateRange));
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
            <h6 className="card-title">Market Issue % (Missing)</h6>
          </div>

          <div id="donut-chart">
            {/* <ReactApexChart
                  options={options}
                  series={options.series}
                  type="bar"
                  height={250}
                  className="apex-charts"
                /> */}
            <div id="donut-chart">
              {(errorData?.data?.chalanerror || []).map((data, key) => {
                return (
                  <>
                    <div className="row mt-4">
                      <div className="col-md-4">
                        {data?.hubInformation?.name}
                      </div>
                      <div className="col-md-8 mt-1">
                        <OverlayTrigger
                          placement="bottom"
                          overlay={
                            <Tooltip id="tooltip-disabled">
                              {data?.totlmissingChalan}
                            </Tooltip>
                          }
                        >
                          <span className="d-inline-block">
                            <div
                              style={{
                                width: data?.totlmissingChalan,
                                height: "5px",
                                borderRadius: "4px",
                                background: brandClr[key],
                              }}
                            ></div>
                          </span>
                        </OverlayTrigger>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};
export default Error;
