import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Card } from "react-bootstrap";
import {getBpDelivery} from '../../../store/Dashboard/action'
import { useDispatch, useSelector } from "react-redux";
// import { Card, CardBody } from "reactstrap";
const BpDelivery = () => {

  const dispatch = useDispatch();
  const { startDateRange, endDateRange, authtoken, bpDelivery } =
  useSelector((state) => ({
    authtoken: state.Login.token,
    startDateRange: state.DashboardReducer.startDateRange,
    endDateRange:  state.DashboardReducer.endDateRange,
    topBanner: state.DashboardReducer.topBanner,
    bpDelivery: state.DashboardReducer.bpDelivery
  }));
  console.log('bpDelivery', bpDelivery);
  let monthData = bpDelivery?.data?.month
  let QuantityData = bpDelivery?.data?.unit
  useEffect(() => {
    dispatch(getBpDelivery(authtoken, startDateRange, endDateRange));
  }, [startDateRange, endDateRange]);
  const options = {
    series: [
      {
        name: 'Quantity',
        data: QuantityData || [],
      },
    ],
    chart: {
      height: 350,
      type: "bar",
      events: {
        click: function (chart, w, e) {
          // console.log(chart, w, e)
        },
      },
    },
    colors: [
      "#FB9905",
    ],
    plotOptions: {
      bar: {
        columnWidth: "15%",
        distributed: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: monthData || [],
      labels: {
        style: {
          // colors: colors,
          fontSize: "12px",
        },
      },
      axisBorder: {
        show: false,
        
      },
      axisTicks: {
        show: false,
      },
    },
  };
  return (
    <>
      <Card className="brandanalytic">
        <Card.Body>
          <div className="chart-title-top-content">
            <h6 className="card-title">BP Delivery</h6>
          </div>

          <div>
            <div>
              <div id="donut-chart">
                <ReactApexChart
                  options={options}
                  series={options.series || []}
                  type="bar"
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
export default BpDelivery;
