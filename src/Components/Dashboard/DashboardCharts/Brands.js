import React, { useEffect } from "react";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardBrand } from "../../../store/Dashboard/action";
// import { Card, CardBody } from "reactstrap";
const Brands = () => {
  const dispatch = useDispatch();
  const {
    startDateRange,
    endDateRange,
    authtoken,
    brandData,
    brandDataLoading,
  } = useSelector((state) => ({
    authtoken: state.Login.token,
    startDateRange: state.DashboardReducer.startDateRange,
    endDateRange: state.DashboardReducer.endDateRange,
    brandData: state.DashboardReducer.brandData,
    brandDataLoading: state.DashboardReducer.brandDataLoading,
  }));
  useEffect(() => {
    dispatch(getDashboardBrand(authtoken, startDateRange, endDateRange));
  }, [startDateRange, endDateRange]);
  console.log("brandData", brandData);
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
      <Card className="brandanalytic" style={{ height: "434px" }}>
        <Card.Body>
          <div className="chart-title-top-content">
            <h6 className="card-title">Top Six Brands</h6>
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
              {(brandData?.data?.brand || []).map((data, key) => {
                return (
                  <>
                    <div className="row mt-4">
                      <div className="col-md-3">{data?.brand?.name}</div>
                      <div className="col-md-9 mt-1">
                        <OverlayTrigger
                          placement="bottom"
                          overlay={<Tooltip>{data?.quantity}</Tooltip>}
                        >
                          <span className="d-inline-block">
                            <div
                              style={{
                                width: ((100*data?.quantity)/8000),
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
export default Brands;
