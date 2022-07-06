import React from "react";
import ReactApexChart from "react-apexcharts";
const SurveyOverview = () => {
  const options = {
    chart: {
      height: 300,
      type: "bar",
      toolbar: {
        show: !1,
      },
    },
    plotOptions: {
      bar: {
        horizontal: !1,
        columnWidth: "2%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: !1,
    },
    stroke: {
      show: !0,
      width: 2,
      colors: ["transparent"],
    },
    series: [
      {
        name: "Total store",
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
      },
    ],
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
    },
    yaxis: {
      title: {
        text: "$(thousands)",
      },
    },
    fill: {
      opacity: 1,
    },
    colors: ["#556EE6"],
  };
  const series = [
    {
      name: "Quantity",
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
    },
  ];
  return (
    <div className="page-content">
      <h5>Store Add Analytic</h5>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height="320"
        className="apex-charts"
      />
    </div>
  );
};
export default SurveyOverview;
