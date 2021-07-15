import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

const MoneyChart = (props) => {

  return (
    <div>
      <Line
        data={props.data}
        options={{
          title: {
            display: true,
            text: "Average Rainfall per month",
            fontSize: 20,
          },
          legend: {
            display: true,
            position: "right",
          },
        }}
      />
    </div>
  );
};

export default MoneyChart