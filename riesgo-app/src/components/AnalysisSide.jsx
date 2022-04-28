import { Box, Typography } from "@mui/material";
import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';


const COLORS = ['#ff5d5d', '#0088FE', '#FFBB28', '#8bff5d', '#0088FE', '#5dffd1', '#5dabff', '#865dff', '#ef5dff', '#ff5d5d', '#0088FE', '#FFBB28', '#ff5d5d', '#0088FE', '#FFBB28'];

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
  const [scoreColor, setScoreColor] = React.useState(0);

  React.useEffect(() => {
    setAnalysisState(props);
  }, [props]);


  var landUseScore = Number(parseFloat(analysisState.data[10]).toFixed(3));

  //TODO: Pasig / Manila Validation and Loadout

  // Marikina Loadout
  // This implementation is retarded
  var marikinaLoadout = [
    analysisState.data[11], // 1
    analysisState.data[12],
    analysisState.data[13],
    analysisState.data[14],
    analysisState.data[15],
    analysisState.data[16],
    analysisState.data[17],
    analysisState.data[18],
    analysisState.data[19],
    analysisState.data[20],
    analysisState.data[21],
    analysisState.data[22],
    analysisState.data[23],
    analysisState.data[24],
    analysisState.data[25]
  ]

  var barangay = analysisState.data[29]

  function LandUsability(props) {
    const ascore = props.score;

    if (ascore >= 0.8) {
      setScoreColor("#fcba03");
      return "Available";
    }
    if (ascore < .80 && ascore >= .50) {
      setScoreColor("#4ec050");
      return "Slightly Available";
    }
    if (ascore < .50 && ascore >= .20) {
      setScoreColor("#216d7b");
      return "Barely Available";
    }
    if (ascore < .20 && ascore >= 0) {
      setScoreColor("#340042");
      return "Unavailable";
    }

    return "undefined"
  }

  var data = [
  ];

  var tempDataState = [];
  const loadoutArray = marikinaLoadout;
  for (let i = 0; i < loadoutArray.length; i++) {
    if (loadoutArray[i] > 0) {

      var setName = ""

      switch (i) {
        case 0:
          setName = "Cemetery"
          break;
        case 1:
          setName = "Commercial"
          break;
        case 2:
          setName = "Farmland"
          break;
        case 3:
          setName = "Forest"
          break;
        case 4:
          setName = "Grass"
          break;
        case 5:
          setName = "Heath"
          break;
        case 6:
          setName = "Industrial"
          break;
        case 7:
          setName = "Meadow"
          break;
        case 8:
          setName = "Park"
          break;
        case 9:
          setName = "RecreationGrounds"
          break;
        case 10:
          setName = "Residential"
          break;
        case 11:
          setName = "Retail"
          break;
        case 12:
          setName = "Scrub"
          break;
        case 13:
          setName = "Unclassified"
          break;
        case 14:
          setName = "Military"
          break;

        default:
          break;
      }

      var a = { name: setName, value: loadoutArray[i] }
      tempDataState.push(a)
    }
  }

  data = tempDataState;
  console.log(tempDataState);

  function WriteUp(props) {
    const tofilter = props.data;
    var statisticArray = [];
    var pos = 0;

    for (let i = 0; i < tofilter.length; i++) {
      switch (tofilter[i].name) {
        case "Cemetery":
          statisticArray[pos] = `${tofilter[i].value}% Cemetery`;
          break;
        case "Commercial":
          statisticArray[pos] = `${tofilter[i].value}% Commercial`;
          break;
        case "Farmland":
          statisticArray[pos] = `${tofilter[i].value}% Farmland`;
          break;
        case "Forest":
          statisticArray[pos] = `${tofilter[i].value}% Forest`;
          break;
        case "Grass":
          statisticArray[pos] = `${tofilter[i].value}% Grass`;
          break;
        case "Heath":
          statisticArray[pos] = `${tofilter[i].value}% Heath`;
          break;
        case "Industrial":
          statisticArray[pos] = `${tofilter[i].value}% Industrial`;
          break;
        case "Meadow":
          statisticArray[pos] = `${tofilter[i].value}% Meadow`;
          break;
        case "Park":
          statisticArray[pos] = `${tofilter[i].value}% Park`;
          break;
        case "RecreationGrounds":
          statisticArray[pos] = `${tofilter[i].value}% Recreation Grounds`;
          break;
        case "Residential":
          statisticArray[pos] = `${tofilter[i].value}% Residential`;
          break;
        case "Retail":
          statisticArray[pos] = `${tofilter[i].value}% Retail`;
          break;
        case "Scrub":
          statisticArray[pos] = `${tofilter[i].value}% Scrub`;
          break;
        case "Unclassified":
          statisticArray[pos] = `${tofilter[i].value}% Unclassified`;
          break;
        case "Military":
          statisticArray[pos] = `${tofilter[i].value}% Military`;
          break;

        default:
          break;
      }
      pos += 1;
    }

    switch (statisticArray.length) {
      case 0:
        return `This area is undefined`
      case 1:
        return `This area is ${statisticArray[0]}`
      case 2:
        return `This area is ${statisticArray[0]} and ${statisticArray[1]}`
      case 3:
        return `This area is ${statisticArray[0]}, ${statisticArray[1]} and ${statisticArray[2]}`
      case 4:
        return `This area is ${statisticArray[0]}, ${statisticArray[1]}, ${statisticArray[2]} and ${statisticArray[3]}`
      case 5:
        return `This area is ${statisticArray[0]}, ${statisticArray[1]}, ${statisticArray[2]}, ${statisticArray[3]} and ${statisticArray[4]}`
      case 6:
        return `This area is ${statisticArray[0]}, ${statisticArray[1]}, ${statisticArray[2]}, ${statisticArray[3]}, ${statisticArray[4]} and ${statisticArray[5]}`
      default:
        return null
    }
  }

  if (!landUseScore) {
    return (
      <div></div>
    )
  }

  if (props.selected === true) {
    return (
      <div>
        <hr />
        <Typography variant="h6">{barangay} Land Use Distribution</Typography>
        <Box display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <PieChart width={370} height={250}>
            <Legend />
            <Tooltip />
            <Pie
              data={data}
              cx="50%"
              cy="43%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={100}
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
          <i><WriteUp data={data} /></i> <hr />
          {/* This area is <b style={{color: "#ff5d5d"}}>33% Residential</b>, <b style={{color: "#00C49F"}}>25% Industrial</b> and <b style={{color: "#FFBB28"}}>42% Farmland</b>. <hr />  */}
          With an approximate <i>land usability</i> score of <b style={{ color: scoreColor }}>{landUseScore}</b>, This area is marked <b style={{ color: scoreColor }}><LandUsability score={landUseScore} /></b> for situating flood evacuation centers.
        </Typography>
      </div>
    );
  } else return (<div></div>)
}
