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
        />
        <YAxis allowDataOverflow={true} />
        {/* <Tooltip /> */}
        <Bar dataKey="count" fill="#8884d8" />
        {refLineXVal !== null && <ReferenceLine x={refLineXVal} stroke="red" />}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default HistogramChart;
