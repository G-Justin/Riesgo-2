import { Box, Typography } from "@mui/material";
import React from "react";
import { 
    BarChart, 
    Bar, 
    Tooltip, 
    XAxis, 
    Cell,
} from "recharts";

const getFloodColor = (p) => {
        if (p >= 0.9) { return "#cfd3ff"; }
        if (p < .90 && p >= .60) { return "#727ded"; }
        if (p < .60 && p >= .30) { return "#3741a1"; }
        if (p < .30 && p >= 0.10) { return "#06106b"; }
        if (p < .10) { return "#06106b"; }
}

const getHazardColor = (p) => {
    if (p >= 0.9) { return "#ffd86e"; }
    if (p < .90 && p >= .60) { return "#ffd86e"; }
    if (p < .60 && p >= .30) { return "#f6684c"; }
    if (p < .30 && p >= 0.10) { return "#9d1e69"; }
    if (p < .10) { return "#300061"; }
}

const getAccessibilityColor = (p) => {
    if (p >= 0.66) { return "#800f2f"; }
    if (p < .66 && p >= .33) { return "#c9184a"; }
    if (p >= 0) { return "#ffc2ce"; }
}

const floodData = [
  {
    name: "5 Years",
    a: 1,
  },
  {
    name: "25 Years",
    a: 0.66,
  },
  {
    name: "100 Years",
    a: 0.33,
  },
];

const hazardData = [
    {
      name: "5 Years",
      a: 0.75,
    },
    {
      name: "25 Years",
      a: 0.5,
    },
    {
      name: "100 Years",
      a: 0.25,
    },
  ];

const accessibilityData = [
    {
      name: "5 Years",
      a: 0.75,
    },
    {
      name: "25 Years",
      a: 0.5,
    },
    {
      name: "100 Years",
      a: 0.25,
    },
];

export default function Analysis() {
  return (
    <div>
    <i>Higher is better*</i>
    <Typography variant="h6">Flood Safety Score</Typography>
    <Box 
        display="flex" 
        alignItems="center"
        justifyContent="center">
        <BarChart width={320} height={150} data={floodData}>
            <XAxis dataKey="name" />
            <Tooltip />
            <Bar dataKey="a">
            {floodData.map((entry, index) => (
                <Cell fill={getFloodColor(entry.a)} />
            ))}
            </Bar>
        </BarChart>
    </Box>

    <Typography variant="h6">Hazard Safety Score</Typography>
    <Box 
        display="flex" 
        alignItems="center"
        justifyContent="center">
        <BarChart width={320} height={150} data={hazardData}>
            <XAxis dataKey="name" />
            <Tooltip />
            <Bar dataKey="a">
            {hazardData.map((entry, index) => (
                <Cell fill={getHazardColor(entry.a)} />
            ))}
            </Bar>
        </BarChart>
    </Box>

    <Typography variant="h6">Area Accessibility Score</Typography>
    <Box 
        display="flex" 
        alignItems="center"
        justifyContent="center">
        <BarChart width={320} height={150} data={accessibilityData}>
            <XAxis dataKey="name" />
            <Tooltip />
            <Bar dataKey="a">
            {accessibilityData.map((entry, index) => (
                <Cell fill={getAccessibilityColor(entry.a)} />
            ))}
            </Bar>
        </BarChart>
    </Box>
    </div>
  );
}
