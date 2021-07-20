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

const MoneyLineChart = (props) => {
  const [lineData, setLineData] = useState([]);

  useEffect(() => {
    const sumMap = {};

    props.months.forEach((month) => (sumMap[month] = 0));

    props.items.reduce((acc, cur) => {
      const createdAt = new Date(cur.createdAt).toISOString().substr(0, 7);

      let sum = (cur.price / 100) * (cur.quantityUsed / cur.originalQuantity);

      if (
        cur.itemStatus === "EXPIRED" ||
        cur.itemStatus === "EXPIRED_REMOVED"
      ) {
        sum +=
          (cur.price / 100) *
          -1 *
          ((cur.originalQuantity - cur.quantityUsed) / cur.originalQuantity);
      }

      acc[createdAt] += sum;
      return acc;
    }, sumMap);
    const lineData = [];
    for (const [key, value] of Object.entries(sumMap)) {
      lineData.push({ month: key, dollars: value });
    }
    setLineData(lineData);
  }, [props.items, props.months]);

  const Offset = () => {
    const dataMax = Math.max(...lineData.map((i) => i.dollars));
    const dataMin = Math.min(...lineData.map((i) => i.dollars));

    if (dataMax <= 0) {
      return 0;
    }
    if (dataMin >= 0) {
      return 1;
    }

    return dataMax / (dataMax - dataMin);
  };

  const off = Offset();

  return props.items.length ? (
    <div className="test">
      Net $
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={lineData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={"month"} />
          <YAxis dataKey="dollars" />
          <Tooltip />
          <defs>
            <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset={off} stopColor="green" stopOpacity={1} />
              <stop offset={off} stopColor="red" stopOpacity={1} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="dollars"
            stroke="#000"
            fill="url(#splitColor)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  ) : null;
};

export default MoneyLineChart;
