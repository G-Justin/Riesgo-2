import { Box, Typography } from "@mui/material";
import React from "react";
import { 
    BarChart, 
    Bar, 
    Tooltip, 
    XAxis, 
    YAxis,
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

const getSustainabilityColor = (p) => {
    if (p >= .6) { return "#2fe02f"; }
    if (p < .6 && p >= .4) { return "#2fe02f"; }
    if (p < .4 && p >= .2) { return "#d4e02f"; }
    if (p < .2) { return "#e0762f"; }
}

export default function Analysis(props) {

    const [analysisState, setAnalysisState] = React.useState(props);
    React.useEffect(() => {
        setAnalysisState(props);
      }, [props]);

    //React.useEffect(() => console.log('Value Changed!'));
    //React.useEffect(() => console.log(analysisState.data));
    
    var floodData = [
        {
            name: "5 Years",
            score: analysisState.data[0] + 0.05,
        },
        {
            name: "25 Years",
            score: analysisState.data[1] + 0.05,
        },
        {
            name: "100 Years",
            score: analysisState.data[2] + 0.05,
        },
    ];
    
    var hazardData = [
        {
        name: "5 Years",
        score: analysisState.data[3],
        },
        {
        name: "25 Years",
        score: analysisState.data[4],
        },
        {
        name: "100 Years",
        score: analysisState.data[5],
        },
    ];
    
    var accessibilityData = [
        {
        name: "5 Years",
        score: analysisState.data[6],
        },
        {
        name: "25 Years",
        score: analysisState.data[7],
        },
        {
        name: "100 Years",
        score: analysisState.data[8],
        },
    ];

    var sustainabilityData = [
        {
        name: "5 Years",
        score: analysisState.data[26],
        },
        {
        name: "25 Years",
        score: analysisState.data[27],
        },
        {
        name: "100 Years",
        score: analysisState.data[28],
        },
    ];

    if(analysisState.data[0] === undefined) {
        return (
          <div></div>
        )
    }

  return (
    <div>
    <i>Higher is better*</i>
    <Typography variant="h6">Flood Safety Score</Typography>
    <Box 
        display="flex" 
        alignItems="center"
        justifyContent="center"
        marginLeft={-5}
        >
        <BarChart width={350} height={150} data={floodData}>
            <XAxis dataKey="name" />
            <YAxis domain={[0, 1]} allowDataOverflow={true}/>
            <Bar dataKey="score">
            {floodData.map((entry, index) => (
                <Cell fill={getFloodColor(entry.score)} />
            ))}
            </Bar>
        </BarChart>
    </Box>

    <Typography variant="h6">Hazard Safety Score</Typography>
    <Box 
        display="flex" 
        alignItems="center"
        justifyContent="center"
        marginLeft={-5}>
        <BarChart width={350} height={150} data={hazardData}>
            <XAxis dataKey="name" />
            <YAxis type="number" domain={[0, 1]}/>
            <Tooltip />
            <Bar dataKey="score">
            {hazardData.map((entry, index) => (
                <Cell fill={getHazardColor(entry.score)} />
            ))}
            </Bar>
        </BarChart>
    </Box>

    <Typography variant="h6">Area Accessibility Score</Typography>
    <Box 
        display="flex" 
        alignItems="center"
        justifyContent="center"
        marginLeft={-5}>
        <BarChart width={350} height={150} data={accessibilityData}>
            <XAxis dataKey="name" />
            <YAxis type="number" domain={[0, 1]}/>
            <Tooltip />
            <Bar dataKey="score">
            {accessibilityData.map((entry, index) => (
                <Cell fill={getAccessibilityColor(entry.score)} />
            ))}
            </Bar>
        </BarChart>
    </Box>

    <Typography variant="h6">Overall Sustainability Score</Typography>
    <Box 
        display="flex" 
        alignItems="center"
        justifyContent="center"
        marginLeft={-5}
        >
        <BarChart width={350} height={150} data={sustainabilityData}>
            <XAxis dataKey="name" />
            <YAxis domain={[0, 0.65]} allowDataOverflow={true}/>
            <Bar dataKey="score">
            {sustainabilityData.map((entry, index) => (
                <Cell fill={getSustainabilityColor(entry.score)} />
            ))}
            </Bar>
        </BarChart>
    </Box>

    <Typography variant="h6">Elevation (Above Sea Level)</Typography>
    <Typography variant="h4"><b>{analysisState.data[9]} Meters</b></Typography>
    </div>
  );
}
