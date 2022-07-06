import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Card } from "react-bootstrap";
import {getDashboardCategory} from '../../../store/Dashboard/action'
import { useDispatch, useSelector } from "react-redux";
// import { Card, CardBody } from "reactstrap";
const Category = () => {
  const dispatch = useDispatch();
  const { startDateRange, endDateRange, authtoken, dashboardCategory, dashboardCategoryLoading } =
  useSelector((state) => ({
    authtoken: state.Login.token,
    startDateRange: state.DashboardReducer.startDateRange,
    endDateRange:  state.DashboardReducer.endDateRange,
    dashboardCategory: state.DashboardReducer.dashboardCategory,
    dashboardCategoryLoading: state.DashboardReducer.dashboardCategoryLoading,
   
  }));
  useEffect(() => {
    dispatch(getDashboardCategory(authtoken, startDateRange, endDateRange));
  }, [startDateRange, endDateRange]);
  console.log('dashboardCategory', dashboardCategory);

  let category1 = dashboardCategory?.data?.category[0]?.categories?.name
  let category2 = dashboardCategory?.data?.category[1]?.categories?.name
  let category3 = dashboardCategory?.data?.category[2]?.categories?.name
  let categoryUnit1 = dashboardCategory?.data?.category[0]?.quantity || 0
  let categoryUnit2 = dashboardCategory?.data?.category[1]?.quantity || 0
  let categoryUnit3 = dashboardCategory?.data?.category[2]?.quantity || 0
  console.log(category1,category2,category3);
  var series = [
    categoryUnit1,
    categoryUnit2,
    categoryUnit3,
  ]
  const options = {
    labels: [category1|| "",category2 || "",category3 || "" ],
    colors: ["#F46A6A", "#556EE6", "#34C38F"],
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
            // show: true,
            name: {
              show: false,
              fontSize: "16px",
              fontFamily: "Helvetica, Arial, sans-serif",
            },

            // total: {
            //   show: true,
            //   showAlways: true,
            // },
          },
        },
      },
    },
  };
  return (
    <>
      <Card className="brandanalytic" style={{ height: "434px" }}>
        <Card.Body>
          <div className="chart-title-top-content">
            <h6 className="card-title">Top Three Categories</h6>
          </div>

          <div>
            <div>
              <div id="donut-chart">
                <ReactApexChart
                  options={options}
                  series={series || []}
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
export default Category;
