import React from "react";
import ReactApexChart from "react-apexcharts";
import { Card } from "react-bootstrap";
// import { Card, CardBody } from "reactstrap";
const Acquisition = () => {
  const options = {
    labels: ["brandA", "brandB"],
    colors: ["#5756D8", "#F78819"],
    legend: { show: 1, position: "bottom" },
    dataLabels: {
      enabled: true,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
          background: "transparent",
          labels: {
            show: true,
            name: {
              show: false,
              fontSize: "16px",
              fontFamily: "Helvetica, Arial, sans-serif",
            },

            total: {
              show: true,
              showAlways: true,
            },
          },
        },
      },
    },
  };
  return (
    <>
      <Card className="brandanalytic">
        <Card.Body>
          <div className="chart-title-top-content">
            <h4 className="card-title">Acquisition</h4>
            <p>See All</p>
          </div>

          <div>
            <div>
              <div id="donut-chart">
                <ReactApexChart
                  options={options}
                  series={[25, 35]}
                  type="donut"
                  height={350}
                  className="apex-charts"
                />
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};
export default Acquisition;
