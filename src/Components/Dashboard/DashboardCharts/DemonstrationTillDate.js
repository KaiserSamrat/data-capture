import React from "react";
import ReactApexChart from "react-apexcharts";
import { Card } from "react-bootstrap";
// import { Card, CardBody } from "reactstrap";
const DemonstrationTillDate = () => {
  const options = {
    labels: ["brandA", "brandB"],
    colors: ["#67D166", "#A444EF"],
    legend: {
      show: true,
      position: "bottom",
      labels: {
        colors: "#A444EF",
        useSeriesColors: true,
      },
    },
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
            <h4 className="card-title">Demonstration till date</h4>
            <p>See All</p>
          </div>

          <div>
            <div>
              <div id="donut-chart">
                <ReactApexChart
                  options={options}
                  series={[20, 55]}
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
export default DemonstrationTillDate;
