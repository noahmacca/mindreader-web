"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

interface HistogramData {
  bin: number;
  count: number;
}

interface HistogramChartProps {
  data: HistogramData[];
  refLineXVal: number | null;
}

const HistogramChart: React.FC<HistogramChartProps> = ({
  data,
  refLineXVal,
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ bottom: 30 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          type="number"
          dataKey="bin"
          domain={["dataMin", "dataMax"]}
          padding={{ left: 15, right: 15 }}
          label={{
            value: "Activation",
            position: "bottom",
            offset: 0,
          }}
          // tickFormatter={(tick = 0) => tick.toFixed(2)}
        />
        <YAxis allowDataOverflow />
        {/* <Tooltip /> */}
        <Bar dataKey="count" fill="#8884d8" />
        {refLineXVal !== null && <ReferenceLine x={refLineXVal} stroke="red" />}
      </BarChart>
    </ResponsiveContainer>
  );
};

// Override console.error
// This is a hack to suppress the warning about missing defaultProps in recharts library as of version 2.12
// @link https://github.com/recharts/recharts/issues/3615
const error = console.error;
console.error = (...args: any) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};

export default HistogramChart;
