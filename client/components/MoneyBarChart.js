import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  ReferenceLine,
} from "recharts";

const MoneyBarChart = (props) => {
  const [lineData, setLineData] = useState([]);

  useEffect(() => {
    const sumMap = {};

    props.months.forEach((month) => (sumMap[month] = {dollarsUsed: 0, dollarsWasted: 0}));
    
    props.items.reduce((acc, cur) => {
      const createdAt = new Date(cur.createdAt).toISOString().substr(0, 7);

      let dollarsUsed = (cur.price / 100) * (cur.quantityUsed / cur.originalQuantity);
      let dollarsWasted = 0;

      if (
        cur.itemStatus === "EXPIRED" ||
        cur.itemStatus === "EXPIRED_REMOVED"
      ) {
        dollarsWasted +=
          (cur.price / 100) *
          ((cur.originalQuantity - cur.quantityUsed) / cur.originalQuantity);
      }

      acc[createdAt].dollarsUsed += dollarsUsed;
      acc[createdAt].dollarsWasted -= dollarsWasted;
      return acc;
    }, sumMap);

    console.log(sumMap)

    const line = [];
    for (const [key, value] of Object.entries(sumMap)) {
      line.push({ month: key, dollarsUsed: value.dollarsUsed, dollarsWasted: value.dollarsWasted });
    }
    console.log()
    setLineData(line);
  }, [props.items]);

  return props.items.length ? (
    <div className="test">
      Food Usage
      {console.log(lineData, props.items)}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={lineData}
          stackOffset="sign"
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <ReferenceLine y={0} stroke="#000" />
          <Bar dataKey="dollarsUsed" fill="green" stackId="stack" />
          <Bar dataKey="dollarsWasted" fill="red" stackId="stack" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  ) : null;
};

export default MoneyBarChart;
