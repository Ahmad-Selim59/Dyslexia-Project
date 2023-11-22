import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const BarCharts = ({ data, label }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <BarChart
        width={400}
        height={250}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 10,
          bottom: 5,
        }}
        barSize={20}
      >
        <XAxis dataKey="name" scale="point" padding={{ left: 30, right: 30 }} />
        <YAxis />
        <Tooltip />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey="score" fill="#8884d8" background={{ fill: "#eee" }} />
      </BarChart>
      <p style={{ textAlign: "center" }}>{label}</p>
    </div>
  );
};
export default BarCharts;
