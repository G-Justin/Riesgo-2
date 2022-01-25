import { Box, Typography } from "@mui/material";
import React from "react";
import { BarChart, Bar, Tooltip, Legend, XAxis, Cell } from "recharts";

// const green = "#58C0A1"
// const teal = "#53C2E2"
// const blue = "#5597DE"
// const orange = "#F2B35B"
// const red = "#F16D64"
    
const getColor = (p) => {
        // if (p >= 90) { return green; }
        // if (p < 90 && p >= 80) { return teal; }
        // if (p < 80 && p >= 70) { return blue; }
        // if (p < 70 && p >= 60) { return orange; }
        // if (p < 60) { return red; }
        if(p === 1) {return "#cfd3ff"}
        if(p === 0.66) {return "#727ded"}
        if(p === 0.33) {return "#3741a1"}
        if(p === 0) {return "#06106b"}
}

const data = [
  {
    name: "5 Years",
    Flood_Score: 0.33,
  },
  {
    name: "25 Years",
    Flood_Score: 0.66,
  },
  {
    name: "100 Years",
    Flood_Score: 1,
  },
];

export default function Analysis() {
  return (
    <div>
    <Typography variant="h6">Flood</Typography>
    <Box 
        display="flex" 
        alignItems="center"
        justifyContent="center">
        <BarChart width={320} height={150} data={data}>
            <XAxis dataKey="name" />
            <Tooltip />
            <Legend />
            <Bar dataKey="Flood_Score">
            {data.map((entry, index) => (
                <Cell fill={getColor(entry.Flood_Score)} />
            ))}
            </Bar>
        </BarChart>
    </Box>
    </div>
  );
}
