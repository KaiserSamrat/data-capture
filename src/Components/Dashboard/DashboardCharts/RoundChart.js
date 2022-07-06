import React from "react";
import ReactApexChart from "react-apexcharts";
import { Card } from "react-bootstrap";
// import { Card, CardBody } from "reactstrap";
const RoundChart = () => {
  const options = {
    labels: ["brandA", "brandB", "brandC"],
    colors: ["#556EE6", "#34C38F", "#F46A6A"],
    legend: { show: !1 },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
        },
      },
    },
  };
  return (
    <React.Fragment>
      <Card className="brandanalytic">
        <Card.Body>
          <h4 className="card-title mb-5">Brand Analytics</h4>

          <div>
            <div>
              <div id="donut-chart">
                <ReactApexChart
                  options={options}
                  series={[30, 40, 35]}
                  type="donut"
                  height={280}
                  className="apex-charts"
                />
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};
export default RoundChart;
