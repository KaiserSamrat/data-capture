import React from "react";
import ReactApexChart from "react-apexcharts";

const Demo = () => {
  const series = [
    {
      name: "South",
      data: [49, 60, 70, 91, 15, 30, 40, 35, 50],
    },
    {
      name: "North",
      data: [70, 20, 33, 35, 49, 60, 50, 19, 21],
    },
    {
      name: "Central",
      data: [22, 20, 45, 10, 9, 6, 70, 9, 12],
    },
  ];

  const options = {
    // colors: ["#008FFB", "#00E396", "#CED4DC"],
    dataLabels: {
      enabled: false,
    },

    chart: {
      type: "area",
      // height: 400,
      // stacked: true,
      events: {
        selection: function (chart, e) {
          console.log(new Date(e.xaxis.min));
        },
      },
    },
  };
  return (
    <div>
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={500}
      />
    </div>
  );
};

export default Demo;
