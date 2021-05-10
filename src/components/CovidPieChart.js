import React from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

const COLORS = ["#7DB3FF", "#49457B", "#FF7C78", "#00FF00"];

function CovidPieChart({ covidChartData }) {
  return (
    <PieChart width={400} height={300}>
      <Pie
        label
        dataKey="value"
        nameKey="name"
        isAnimationActive={false}
        data={covidChartData}
        cx={170}
        cy={150}
        outerRadius={80}
        fill="#8884d8"
      >
        {covidChartData.map((e, index) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
}

export default CovidPieChart;
