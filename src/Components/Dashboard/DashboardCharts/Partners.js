import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Card } from "react-bootstrap";
// import { Card, CardBody } from "reactstrap";
import {getDashboardPartner} from '../../../store/Dashboard/action'
import { useDispatch, useSelector } from "react-redux";
const Partners = () => {
  const dispatch = useDispatch();
  const { startDateRange, endDateRange, authtoken, partnerDataLoading, partnerData } =
  useSelector((state) => ({
    authtoken: state.Login.token,
    startDateRange: state.DashboardReducer.startDateRange,
    endDateRange:  state.DashboardReducer.endDateRange,
    partnerData: state.DashboardReducer.partnerData,
    partnerDataLoading: state.DashboardReducer.partnerDataLoading,
   
  }));
  useEffect(() => {
    dispatch(getDashboardPartner(authtoken, startDateRange, endDateRange));
  }, [startDateRange, endDateRange]);

console.log('partnerData',partnerData);
  var valueOption = {
    series: [
      {
        data: [
          {
            x: partnerData?.data?.partner[0]?._id?.partner,
            y: partnerData?.data?.partner[0]?.quantity || [],
          },

          {
            x: partnerData?.data?.partner[1]?._id?.partner,
            y: partnerData?.data?.partner[1]?.quantity || [],
          },
          {
            x: partnerData?.data?.partner[2]?._id?.partner,
            y: partnerData?.data?.partner[2]?.quantity || [],
          },
       
        ],
      },
    ],
    // legend: {
    //   show: false
    // },
    chart: {
      height: 350,
      type: "treemap",
      foreColor: "#FFFFFF",
    },
    title: {
      // text: 'Basic Treemap'
    },
    fill: {
      colors: undefined,
      opacity: 1,
      type: "solid",
    },
    dataLabels: {
      enabled: true,
      style: {
        //fontSize: "50px",
        colors: ["#FFFFFF", "#FFFFFF", "#FFFFFF"],
      },

      formatter: function (val, opt) {
        const removeAll = val.replaceAll("(cr)", "");
        return removeAll;
      },
    },
    colors: ["#348BFF", "#F7B941", "#6D6CD4"],
    plotOptions: {
      treemap: {
        distributed: true,
        enableShades: false,
      },
    },
    legend: {
      horizontalAlign: "center",
      offsetX: 40,
    },
  };
  return (
    <>
      <Card className="brandanalytic">
        <Card.Body>
          <div className="chart-title-top-content">
            <h4 className="card-title">Partners</h4>
          </div>

          <div>
            <div>
              <div id="chart">
                <ReactApexChart
                  options={valueOption}
                  series={valueOption?.series || []}
                  type="treemap"
                  height={350}
                  className="apex-charts construction-chart"
                />
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};
export default Partners;
