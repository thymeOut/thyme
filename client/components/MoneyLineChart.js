import React from "react";
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
  ReferenceLine
} from "recharts";

const MoneyLineChart = (props) => {

  const Offset = () => {
    const dataMax = Math.max(...props.data.map((i) => i.dollars));
    const dataMin = Math.min(...props.data.map((i) => i.dollars));

    if (dataMax <= 0) {
      return 0;
    }
    if (dataMin >= 0) {
      return 1;
    }

    return dataMax / (dataMax - dataMin);
  };

  const off = Offset()

  return (
      props.data.length ? 
    <div className="test">
      <ResponsiveContainer width="100%" height="100%">

        <AreaChart
          width={500}
          height={400}
          data={props.data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={"month"} />
          <YAxis dataKey="dollars"/>
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
    </div>: null
  );
};

export default MoneyLineChart;
