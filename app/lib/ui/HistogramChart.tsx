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
  Cell,
} from "recharts";

import { plasmaCmap } from "@/app/lib/constants";

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
  // Function to determine color based on index value using plasmaCmap
  const getColor = (index: number, total: number) => {
    const cmapIndex = Math.floor((plasmaCmap.length - 1) * (index / total));
    const [r, g, b] = plasmaCmap[cmapIndex];
    return `rgba(${r * 255}, ${g * 255}, ${b * 255}, 1)`;
  };

  const cappedRefLineXVal =
    refLineXVal &&
    (refLineXVal <= 0
      ? data[0].bin
      : refLineXVal > data[data.length - 1].bin
      ? data[data.length - 1].bin
      : refLineXVal);

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
          tickFormatter={(tick = 0) => tick.toFixed(2)}
        />
        <YAxis allowDataOverflow />
        {/* <Tooltip /> */}
        <Bar dataKey="count">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getColor(index, data.length)} />
          ))}
        </Bar>
        {cappedRefLineXVal !== null && (
          <ReferenceLine x={cappedRefLineXVal} stroke="red" strokeWidth={1.5} />
        )}
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
