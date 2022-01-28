import { Box, Typography } from "@mui/material";
import React from "react";
import { PieChart, Pie, Cell } from 'recharts';


const COLORS = ['#ff5d5d', '#0088FE', '#FFBB28'];
      
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" fontWeight="bold" fontFamily="Roboto" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function AnalysisSide(props) {
    const [analysisState, setAnalysisState] = React.useState(props);
    React.useEffect(() => {
        setAnalysisState(props);
      }, [props]);
    
    const [scoreColor, setScoreColor] = React.useState(0);

    var landUseScore   = analysisState.data[10];
    var landUseDisplay = analysisState.data[11];

    const data = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 500 },
      ];

    function LandUsability(props) {
        const ascore = props.score;

        if (ascore >= 0.8)  { 
            setScoreColor("#fcba03");
            return "Recommended"; 
        }
        if (ascore < .80 && ascore >= .50) { 
            setScoreColor("#4ec050");
            return "Highly Usable"; 
        }
        if (ascore < .50 && ascore >= .20) { 
            setScoreColor("#216d7b");
            return "Slightly Usable"; 
        }
        if (ascore < .20 && ascore >= 0) { 
            setScoreColor("#340042");
            return "Unrecommended"; 
        }

        return "undefined"
    }

    function LandUseDisplay(props) {
      // This function acts as a RegEx for Justin's stupid string format
        
    }

  return (
    <div>
    <Typography variant="h6">Area Details</Typography>
    <Box display="flex" 
        alignItems="center"
        justifyContent="center"
        >
        <PieChart width={175} height={175}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
    </Box>
    <Typography variant="body">
        This area is <b style={{color: "#ff5d5d"}}>33% Residential</b>, <b style={{color: "#00C49F"}}>25% Industrial</b> and <b style={{color: "#FFBB28"}}>42% Farmland</b>. <hr /> 
        It is marked <b style={{color: scoreColor}}><LandUsability score={landUseScore}/></b> for situating flood evacuation centers.
    </Typography>
    </div>
  );
}
