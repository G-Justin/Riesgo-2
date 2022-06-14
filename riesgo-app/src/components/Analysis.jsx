import { Box, Typography } from "@mui/material";
import React from "react";
import {
    BarChart,
    Bar,
    Tooltip,
    XAxis,
    YAxis,
    Cell,
    AreaChart,
    CartesianGrid,
    Area, PieChart, Pie, Legend
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
    if (p >= .55) { return "#2fe02f"; }
    if (p < .55 && p >= .4) { return "#fcd874"; }
    if (p < .4 && p >= .2) { return "#e0762f"; }
    if (p < .2) { return "#ff3d3d"; }
}

const getCoverageColor = ["#00C49F", "#ebebeb"];

export default function Analysis(props) {
    const [analysisState, setAnalysisState] = React.useState(props);
    const [scoreColorSelected, setScoreColorSelected] = React.useState(0);

    var barangay = analysisState.data[29];

    React.useEffect(() => {
        setAnalysisState(props);
    }, [props]);

    var floodData = [ // Removed floodData and Flood Safety Score Vis as per request.
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

    var floodDataAverage = ((floodData[0].score + floodData[1].score + floodData[2].score) - 0.15) / 3;
    floodDataAverage = Number(parseFloat(floodDataAverage).toFixed(2));

    function FloodClassification(props) {
        const ascore = props.score;

        if (ascore >= 0.8) {
            setScoreColorSelected("#cfd3ff");
            return "No Flood";
        }
        if (ascore < .80 && ascore >= .50) {
            setScoreColorSelected("#727ded");
            return "Low Flood";
        }
        if (ascore < .50 && ascore >= .20) {
            setScoreColorSelected("#3741a1");
            return "Medium Flood";
        }
        if (ascore < .20 && ascore >= 0) {
            setScoreColorSelected("#06106b");
            return "High Flood";
        }

        return undefined;
    }

    var hazardData = [
        {
            name: "5 Years",
            score: Number(parseFloat(analysisState.data[3]).toFixed(2))
        },
        {
            name: "25 Years",
            score: Number(parseFloat(analysisState.data[4]).toFixed(2))
        },
        {
            name: "100 Years",
            score: Number(parseFloat(analysisState.data[5]).toFixed(2))
        },
    ];

    var hazardDataAverage = ((hazardData[0].score + hazardData[1].score + hazardData[2].score)) / 3;
    hazardDataAverage = Number(parseFloat(hazardDataAverage).toFixed(2));

    function HazardClassification(props) {
        const ascore = props.score;

        if (ascore >= 0.8) {
            setScoreColorSelected("#ffd86e");
            return "No Hazard";
        }
        if (ascore < .80 && ascore >= .50) {
            setScoreColorSelected("#f6684c");
            return "Low Hazard";
        }
        if (ascore < .50 && ascore >= .20) {
            setScoreColorSelected("#9d1e69");
            return "Medium Hazard";
        }
        if (ascore < .20 && ascore >= 0) {
            setScoreColorSelected("#300061");
            return "High Hazard";
        }

        return undefined;
    }

    var accessibilityData = [
        {
            name: "5 Years",
            score: Number(parseFloat(analysisState.data[6]).toFixed(2))
        },
        {
            name: "25 Years",
            score: Number(parseFloat(analysisState.data[7]).toFixed(2))
        },
        {
            name: "100 Years",
            score: Number(parseFloat(analysisState.data[8]).toFixed(2))
        },
    ];

    var accessibilityDataAverage = ((accessibilityData[0].score + accessibilityData[1].score + accessibilityData[2].score)) / 3;
    accessibilityDataAverage = Number(parseFloat(accessibilityDataAverage).toFixed(2));

    function AccessibilityClassification(props) {
        const ascore = props.score;

        if (ascore >= 0.5) {
            setScoreColorSelected("#800f2f");
            return "High Accessibility";
        }
        if (ascore < .50 && ascore >= .20) {
            setScoreColorSelected("#c9184a");
            return "Medium Accessibility";
        }
        if (ascore < .20 && ascore >= 0) {
            setScoreColorSelected("#ff8099");
            return "Low Accessibility";
        }

        return undefined;
    }

    var sustainabilityData = [
        {
            name: "5 Years",
            score: Number(parseFloat(analysisState.data[26]).toFixed(2))
        },
        {
            name: "25 Years",
            score: Number(parseFloat(analysisState.data[27]).toFixed(2))
        },
        {
            name: "100 Years",
            score: Number(parseFloat(analysisState.data[28]).toFixed(2))
        },
    ];

    var sustainabilityDataAverage = ((sustainabilityData[0].score + sustainabilityData[1].score + sustainabilityData[2].score)) / 3;
    sustainabilityDataAverage = Number(parseFloat(sustainabilityDataAverage).toFixed(2));

    function SustainabilityClassification(props) {
        const ascore = props.score;

        if (ascore >= 0.50) {
            setScoreColorSelected("#2fe02f");
            return "Highly Suitable Area";
        }
        if (ascore < .50 && ascore >= .30) {
            setScoreColorSelected("#f5c645");
            return "Suitable Area";
        }
        if (ascore < .30 && ascore >= .15) {
            setScoreColorSelected("#e0762f");
            return "Very Low Suitability";
        }
        if (ascore < .15 && ascore >= 0) {
            setScoreColorSelected("#ff3d3d");
            return "Unsuitable";
        }

        return undefined;
    }

    var coverageData = [
        {
            name: "Coverage Score",
            score: Number(parseFloat(analysisState.data[30]).toFixed(3))
        },
        {
            name: "Remaining Score",
            score: 1 - Number(parseFloat(analysisState.data[30]).toFixed(3))
        }
    ]

    var coverageDataPercentage = coverageData[0].score * 100;
    coverageDataPercentage = Number(parseFloat(coverageDataPercentage).toFixed(3))

    if (props.selected === false || analysisState.data[9] === undefined) { // If pin is not dropped

        if (props.cityName === "l_marikina") {

            var marikinaAveFlood = [
                {
                    name: "5 Years",
                    score: 0.355,
                },
                {
                    name: "25 Years",
                    score: 0.261,
                },
                {
                    name: "100 Years",
                    score: 0.211,
                },
            ];

            var marikinaAveAccessibility = [
                {
                    name: "5 Years",
                    score: 0.2212615467,
                },
                {
                    name: "25 Years",
                    score: 0.1664931404,
                },
                {
                    name: "100 Years",
                    score: 0.1488121635,
                },
            ];

            var marikinaAveHazard = [
                {
                    name: "5 Years",
                    score: 0.2995057784,
                },
                {
                    name: "25 Years",
                    score: 0.2522065901,
                },
                {
                    name: "100 Years",
                    score: 0.2275074577,
                },
            ];

            const marikinaAveCoverage = [
                {
                    name: "0%",
                    uv: 0,
                },
                {
                    name: "25%",
                    uv: 0.3682170543,
                },
                {
                    name: "50%",
                    uv: 0.4444444444,
                },
                {
                    name: "75%",
                    uv: 0.5600775194,
                },
            ];

            const marikinaAveSustainability = [
                {
                    name: "5 Years",
                    score: 0.3251657121,
                },
                {
                    name: "25 Years",
                    score: 0.2996488135,
                },
                {
                    name: "100 Years",
                    score: 0.2890537862,
                },
            ];

            // Very Difficult 
            const COLORS = ['#ff5d5d', '#0088FE', '#FFBB28', '#00C49F'];

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

            const data = [
                { name: "Nature", value: 124.835920383 },
                { name: "Residential/Recreation", value: 89.9577758733 },
                { name: "Commercial/Industrial", value: 100.2294537 },
                { name: "Farmland", value: 93.03038848 }
            ];

            switch (props.layerName) {
                case "Flood":
                    return (
                        <div>
                            <hr />
                            <Typography variant="overline">years are represented as <b>return periods</b></Typography>
                            <Typography variant="h6">Marikina Average Flood Safety Score</Typography>
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                marginLeft={-5}
                            >
                                <BarChart width={350} height={150} data={marikinaAveFlood}>
                                    <XAxis dataKey="name" />
                                    <YAxis domain={[0, 1]} allowDataOverflow={true} />
                                    <Tooltip />
                                    <Bar dataKey="score">
                                        {marikinaAveFlood.map((entry, index) => (
                                            <Cell fill={getFloodColor(entry.score)} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </Box>
                            <Typography variant='body1'>
                                Average risk assessment of the area's flood safety score of 5, 25, and 100 years return period.
                            </Typography>
                        </div>
                    )
                case "Elevation":
                    return (<div>
                        {/* <Typography variant="h6">Average Elevation</Typography>
                        <Typography variant="h4"><b>20.47 Meters</b></Typography> */}
                    </div>)
                case "Accessibility":
                    return (
                        <div>
                            <hr />
                            <Typography variant="overline">years are represented as <b>return periods</b></Typography>
                            <Typography variant="h6">Marikina Average Accessibility Safety Score</Typography>
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                marginLeft={-5}
                            >
                                <BarChart width={350} height={150} data={marikinaAveAccessibility}>
                                    <XAxis dataKey="name" />
                                    <YAxis domain={[0, 1]} allowDataOverflow={true} />
                                    <Tooltip />
                                    <Bar dataKey="score">
                                        {marikinaAveAccessibility.map((entry, index) => (
                                            <Cell fill={getAccessibilityColor(entry.score)} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </Box>
                            <Typography variant='body1'>
                                Average assessment of the area's accessibility score within the 5, 25, and 100 years return period.
                            </Typography>
                        </div>
                    )
                case "Hazard":
                    return (
                        <div>
                            <hr />
                            <Typography variant="overline">years are represented as <b>return periods</b></Typography>
                            <Typography variant="h6">Marikina Average Hazard Safety Score</Typography>
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                marginLeft={-5}
                            >
                                <BarChart width={350} height={150} data={marikinaAveHazard}>
                                    <XAxis dataKey="name" />
                                    <YAxis domain={[0, 1]} allowDataOverflow={true} />
                                    <Tooltip />
                                    <Bar dataKey="score">
                                        {marikinaAveHazard.map((entry, index) => (
                                            <Cell fill={getHazardColor(entry.score)} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </Box>
                            <Typography variant='body1'>
                                Average risk assessment of the area's hazard safety score of 5, 25, and 100 years return period.
                            </Typography>
                        </div>
                    )
                case "Coverage Score":
                    return (<div>
                        <hr />
                        <Typography variant="h6">Coverage Score Distribution</Typography>
                        <AreaChart
                            width={320}
                            height={200}
                            data={marikinaAveCoverage}
                            margin={{
                                top: 10,
                                right: 30,
                                left: -5,
                                bottom: 0
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
                        </AreaChart>
                        <Typography variant='body1'>
                            The average score of the city's population.
                        </Typography>
                    </div>)
                case "Land Use Score":
                    return (<div>
                        <hr />
                        <Typography variant="h6">Marikina Land Availability Distribution</Typography>
                        <PieChart width={320} height={300}>
                            <Legend />
                            <Tooltip />
                            <Pie
                                data={data}
                                cx="50%"
                                cy="40%"
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
                        <hr />
                        <Typography variant='body1'><b>Marikina City</b> is rougly <b style={{ color: "#ff5d5d" }}>31% Nature,</b> <b style={{ color: "#0088fe" }}>22% Residential,</b> <b style={{ color: "#ffbb28" }}>25% Commercial</b> and <b style={{ color: "#00c49f" }}>23% Farmland</b></Typography>
                    </div>)
                case "Sustainability":
                    return (
                        <div>
                            <hr />
                            <Typography variant="overline">years are represented as <b>return periods</b></Typography>
                            <Typography variant="h6">Marikina Average Suitability Score</Typography>
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                marginLeft={-5}
                            >
                                <BarChart width={350} height={150} data={marikinaAveSustainability}>
                                    <XAxis dataKey="name" />
                                    <YAxis domain={[0, 1]} allowDataOverflow={true} />
                                    <Tooltip />
                                    <Bar dataKey="score">
                                        {marikinaAveSustainability.map((entry, index) => (
                                            <Cell fill={getSustainabilityColor(entry.score)} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </Box>
                            <Typography variant='body1'>
                                Average assessment of the area's suitability score within the 5, 25, and 100 years return period.
                            </Typography>
                        </div>
                    )
                default:
                    return (<div></div>)
            }
        } else if (props.cityName === "l_pasig") {
            var pasigAveFlood = [
                {
                    name: "5 Years",
                    score: 0.357,
                },
                {
                    name: "25 Years",
                    score: 0.277,
                },
                {
                    name: "100 Years",
                    score: 0.203,
                },
            ];

            var pasigAveAccessibility = [
                {
                    name: "5 Years",
                    score: 0.1175587994,
                },
                {
                    name: "25 Years",
                    score: 0.1018568817,
                },
                {
                    name: "100 Years",
                    score: 0.0907469560,
                },
            ];


            var pasigAveHazard = [
                {
                    name: "5 Years",
                    score: 0.2635470244,
                },
                {
                    name: "25 Years",
                    score: 0.2236609845,
                },
                {
                    name: "100 Years",
                    score: 0.1868695512,
                },
            ];

            const pasigAveCoverage = [
                {
                    name: "0%",
                    uv: 0,
                },
                {
                    name: "25%",
                    uv: 0.3682170543,
                },
                {
                    name: "50%",
                    uv: 0.4444444444,
                },
                {
                    name: "75%",
                    uv: 0.5600775194,
                },
            ];

            const pasigAveSustainability = [
                {
                    name: "5 Years",
                    score: 0.2062165431,
                },
                {
                    name: "25 Years",
                    score: 0.1923195537,
                },
                {
                    name: "100 Years",
                    score: 0.1803442139,
                },
            ];

            // Very Difficult 
            const COLORS = ['#ff5d5d', '#0088FE', '#FFBB28', '#00C49F'];

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

            const data = [
                { name: "Nature", value: 110.1842063 },
                { name: "Residential/Recreation", value: 141.4571586 },
                { name: "Commercial/Industrial", value: 113.0017227 },
                { name: "Farmland", value: 34.79628571 }
            ];

            switch (props.layerName) {
                case "Flood":
                    return (
                        <div>
                            <hr />
                            <Typography variant="overline">years are represented as <b>return periods</b></Typography>
                            <Typography variant="h6">Pasig Average Flood Safety Score</Typography>
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                marginLeft={-5}
                            >
                                <BarChart width={350} height={150} data={pasigAveFlood}>
                                    <XAxis dataKey="name" />
                                    <YAxis domain={[0, 1]} allowDataOverflow={true} />
                                    <Tooltip />
                                    <Bar dataKey="score">
                                        {pasigAveFlood.map((entry, index) => (
                                            <Cell fill={getFloodColor(entry.score)} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </Box>
                            <Typography variant='body1'>Average risk assessment of the area's flood safety score of 5, 25, and 100 years return period.</Typography>
                        </div>
                    )
                case "Elevation":
                    return (<div>
                        {/* <Typography variant="h6">Average Elevation</Typography>
                        <Typography variant="h4"><b>20.47 Meters</b></Typography> */}
                    </div>)
                case "Accessibility":
                    return (
                        <div>
                            <hr />
                            <Typography variant="overline">years are represented as <b>return periods</b></Typography>
                            <Typography variant="h6">Pasig Average Accessibility Safety Score</Typography>
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                marginLeft={-5}
                            >
                                <BarChart width={350} height={150} data={pasigAveAccessibility}>
                                    <XAxis dataKey="name" />
                                    <YAxis domain={[0, 1]} allowDataOverflow={true} />
                                    <Tooltip />
                                    <Bar dataKey="score">
                                        {pasigAveAccessibility.map((entry, index) => (
                                            <Cell fill={getAccessibilityColor(entry.score)} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </Box>
                            <Typography variant='body1'>Average assessment of the area's accessibility score within the 5, 25, and 100 years return period.</Typography>
                        </div>
                    )
                case "Hazard":
                    return (
                        <div>
                            <hr />
                            <Typography variant="overline">years are represented as <b>return periods</b></Typography>
                            <Typography variant="h6">Pasig Average Hazard Safety Score</Typography>
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                marginLeft={-5}
                            >
                                <BarChart width={350} height={150} data={pasigAveHazard}>
                                    <XAxis dataKey="name" />
                                    <YAxis domain={[0, 1]} allowDataOverflow={true} />
                                    <Tooltip />
                                    <Bar dataKey="score">
                                        {pasigAveHazard.map((entry, index) => (
                                            <Cell fill={getHazardColor(entry.score)} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </Box>
                            <Typography variant='body1'>Average risk assessment of the area's hazard safety score of 5, 25, and 100 years return period.</Typography>
                        </div>
                    )
                case "Coverage Score":
                    return (<div>
                        <hr />
                        <Typography variant="h6">Coverage Score Distribution</Typography>
                        <AreaChart
                            width={320}
                            height={200}
                            data={pasigAveCoverage}
                            margin={{
                                top: 10,
                                right: 30,
                                left: -5,
                                bottom: 0
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
                        </AreaChart>
                        <Typography variant='body1'>The average score of the city's population.</Typography>
                    </div>)
                case "Land Use Score":
                    return (<div>
                        <hr />
                        <Typography variant="h6">Pasig Land Availability Distribution</Typography>
                        <PieChart width={320} height={300}>
                            <Legend />
                            <Tooltip />
                            <Pie
                                data={data}
                                cx="50%"
                                cy="40%"
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
                        <hr />
                        <Typography variant='body1'><b>Pasig City</b> is rougly <b style={{ color: "#ff5d5d" }}>27% Nature,</b> <b style={{ color: "#0088fe" }}>35% Residential,</b> <b style={{ color: "#ffbb28" }}>28% Commercial</b> and <b style={{ color: "#00c49f" }}>8.5% Farmland</b></Typography>
                    </div>)
                case "Sustainability":
                    return (
                        <div>
                            <hr />
                            <Typography variant="overline">years are represented as <b>return periods</b></Typography>
                            <Typography variant="h6">Pasig Average Suitability Score</Typography>
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                marginLeft={-5}
                            >
                                <BarChart width={350} height={150} data={pasigAveSustainability}>
                                    <XAxis dataKey="name" />
                                    <YAxis domain={[0, 1]} allowDataOverflow={true} />
                                    <Tooltip />
                                    <Bar dataKey="score">
                                        {pasigAveSustainability.map((entry, index) => (
                                            <Cell fill={getSustainabilityColor(entry.score)} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </Box>
                            <Typography variant='body1'>Average assessment of the area's suitability score within the 5, 25, and 100 years return period.</Typography>
                        </div>
                    )
                default:
                    return (<div></div>)

            }
        } else if (props.cityName === "l_manila") {
            var manilaAveFlood = [
                {
                    name: "5 Years",
                    score: 0.458,
                },
                {
                    name: "25 Years",
                    score: 0.372,
                },
                {
                    name: "100 Years",
                    score: 0.317,
                },
            ];

            var manilaAveAccessibility = [
                {
                    name: "5 Years",
                    score: 0.2861622915,
                },
                {
                    name: "25 Years",
                    score: 0.2567129871,
                },
                {
                    name: "100 Years",
                    score: 0.2527476868,
                },
            ];


            var manilaAveHazard = [
                {
                    name: "5 Years",
                    score: 0.3514126773,
                },
                {
                    name: "25 Years",
                    score: 0.3085673506,
                },
                {
                    name: "100 Years",
                    score: 0.2812307087,
                },
            ];

            const manilaAveCoverage = [
                {
                    name: "0%",
                    uv: 0,
                },
                {
                    name: "25%",
                    uv: 0.0509957039,
                },
                {
                    name: "50%",
                    uv: 0.1032731243,
                },
                {
                    name: "75%",
                    uv: 0.1682787021,
                },
            ];

            const manilaAveSustainability = [
                {
                    name: "5 Years",
                    score: 0.2193118691,
                },
                {
                    name: "25 Years",
                    score: 0.2012382113,
                },
                {
                    name: "100 Years",
                    score: 0.1934127258,
                },
            ];

            // Very Difficult 
            const COLORS = ['#ff5d5d', '#0088FE', '#FFBB28', '#00C49F'];

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

            //Will change
            //No idea where unclassified should be. Did not include it in the computation.
            const data = [
                { name: "Nature", value: 27.99736785 },
                { name: "Residential/Recreation", value: 139.9727453 },
                { name: "Commercial/Industrial", value: 124.5065187},
                { name: "Farmland", value: 83.03560976 }
            ];

            switch (props.layerName) {
                case "Flood":
                    return (
                        <div>
                            <hr />
                            <Typography variant="overline">years are represented as <b>return periods</b></Typography>
                            <Typography variant="h6">Manila Average Flood Safety Score</Typography>
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                marginLeft={-5}
                            >
                                <BarChart width={350} height={150} data={manilaAveFlood}>
                                    <XAxis dataKey="name" />
                                    <YAxis domain={[0, 1]} allowDataOverflow={true} />
                                    <Tooltip />
                                    <Bar dataKey="score">
                                        {manilaAveFlood.map((entry, index) => (
                                            <Cell fill={getFloodColor(entry.score)} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </Box>
                            <Typography variant='body1'>Average risk assessment of the area's flood safety score of 5, 25, and 100 years return period.</Typography>
                        </div>
                    )
                case "Elevation":
                    return (<div>
                        {/* <Typography variant="h6">Average Elevation</Typography>
                        <Typography variant="h4"><b>20.47 Meters</b></Typography> */}
                    </div>)
                case "Accessibility":
                    return (
                        <div>
                            <hr />
                            <Typography variant="overline">years are represented as <b>return periods</b></Typography>
                            <Typography variant="h6">Manila Average Accessibility Safety Score</Typography>
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                marginLeft={-5}
                            >
                                <BarChart width={350} height={150} data={manilaAveAccessibility}>
                                    <XAxis dataKey="name" />
                                    <YAxis domain={[0, 1]} allowDataOverflow={true} />
                                    <Tooltip />
                                    <Bar dataKey="score">
                                        {manilaAveAccessibility.map((entry, index) => (
                                            <Cell fill={getAccessibilityColor(entry.score)} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </Box>
                            <Typography variant='body1'>Average assessment of the area's accessibility score within the 5, 25, and 100 years return period.</Typography>
                        </div>
                    )
                case "Hazard":
                    return (
                        <div>
                            <hr />
                            <Typography variant="overline">years are represented as <b>return periods</b></Typography>
                            <Typography variant="h6">Manila Average Hazard Safety Score</Typography>
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                marginLeft={-5}
                            >
                                <BarChart width={350} height={150} data={manilaAveHazard}>
                                    <XAxis dataKey="name" />
                                    <YAxis domain={[0, 1]} allowDataOverflow={true} />
                                    <Tooltip />
                                    <Bar dataKey="score">
                                        {manilaAveHazard.map((entry, index) => (
                                            <Cell fill={getHazardColor(entry.score)} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </Box>
                            <Typography variant='body1'>Average risk assessment of the area's hazard safety score of 5, 25, and 100 years return period.</Typography>
                        </div>
                    )
                case "Coverage Score":
                    return (<div>
                        <hr />
                        <Typography variant="h6">Coverage Score Distribution</Typography>
                        <AreaChart
                            width={320}
                            height={200}
                            data={manilaAveCoverage}
                            margin={{
                                top: 10,
                                right: 30,
                                left: -5,
                                bottom: 0
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
                        </AreaChart>
                        <Typography variant='body1'>The average score of the city's population.</Typography>
                    </div>)
                case "Land Use Score":
                    return (<div>
                        <hr />
                        <Typography variant="h6">Pasig Land Availability Distribution</Typography>
                        <PieChart width={320} height={300}>
                            <Legend />
                            <Tooltip />
                            <Pie
                                data={data}
                                cx="50%"
                                cy="40%"
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
                        <hr />
                        <Typography variant='body1'><b>The City of Manila</b> is rougly <b style={{ color: "#ff5d5d" }}>27% Nature,</b> <b style={{ color: "#0088fe" }}>35% Residential,</b> <b style={{ color: "#ffbb28" }}>28% Commercial</b> and <b style={{ color: "#00c49f" }}>8.5% Farmland</b></Typography>
                    </div>)
                case "Sustainability":
                    return (
                        <div>
                            <hr />
                            <Typography variant="overline">years are represented as <b>return periods</b></Typography>
                            <Typography variant="h6">Manila Average Suitability Score</Typography>
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                marginLeft={-5}
                            >
                                <BarChart width={350} height={150} data={manilaAveSustainability}>
                                    <XAxis dataKey="name" />
                                    <YAxis domain={[0, 1]} allowDataOverflow={true} />
                                    <Tooltip />
                                    <Bar dataKey="score">
                                        {manilaAveSustainability.map((entry, index) => (
                                            <Cell fill={getSustainabilityColor(entry.score)} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </Box>
                            <Typography variant='body1'>Average assessment of the area's suitability score within the 5, 25, and 100 years return period.</Typography>
                        </div>
                    )
                default:
                    return (<div></div>)

            }
        } else {
            return (<div></div>)
        }
    }
    // Analyze specific grid
    else if (props.selected === true) {
        switch (props.layerName) {
            case "Flood":
                return (
                    <div>
                        <hr />
                        <Typography variant="overline">BARANGAY <b>{barangay}</b></Typography>
                        <Typography variant="h6">Flood Safety Score</Typography>
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            marginLeft={-5}>
                            <BarChart width={350} height={150} data={floodData}>
                                <XAxis dataKey="name" />
                                <YAxis domain={[0, 1]} allowDataOverflow={true} />
                                <Bar dataKey="score">
                                    {floodData.map((entry, index) => (
                                        <Cell fill={getFloodColor(entry.score)} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </Box>
                        <hr />
                        <Typography variant='body1'>This area within <b style={{ color: scoreColorSelected }}>Barangay {barangay}</b> has an average <i>Flood Safety Score </i>
                            of <b style={{ color: scoreColorSelected }}>{floodDataAverage}</b>. This is considered
                            a <b style={{ color: scoreColorSelected }}><FloodClassification score={floodDataAverage} /></b> area.</Typography>
                    </div>
                )
            case "Hazard":
                return (
                    <div>
                        <hr />
                        <Typography variant="overline">BARANGAY <b>{barangay}</b></Typography>
                        <Typography variant="h6">Hazard Safety Score</Typography>
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            marginLeft={-5}>
                            <BarChart width={350} height={150} data={hazardData}>
                                <XAxis dataKey="name" />
                                <YAxis type="number" domain={[0, 1]} />
                                <Tooltip />
                                <Bar dataKey="score">
                                    {hazardData.map((entry, index) => (
                                        <Cell fill={getHazardColor(entry.score)} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </Box>
                        <hr />
                        <Typography variant='body1'>This area within <b style={{ color: scoreColorSelected }}>Barangay {barangay}</b> has an average <i>Hazard Safety Score </i>
                            of <b style={{ color: scoreColorSelected }}>{hazardDataAverage}</b>. This is considered
                            a <b style={{ color: scoreColorSelected }}><HazardClassification score={hazardDataAverage} /></b> area.</Typography>
                    </div>
                )
            case "Accessibility":
                return (
                    <div>
                        <hr />
                        <Typography variant="overline">BARANGAY <b>{barangay}</b></Typography>
                        <Typography variant="h6">Area Accessibility Score</Typography>
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            marginLeft={-5}>
                            <BarChart width={350} height={150} data={accessibilityData}>
                                <XAxis dataKey="name" />
                                <YAxis type="number" domain={[0, 1]} />
                                <Tooltip />
                                <Bar dataKey="score">
                                    {accessibilityData.map((entry, index) => (
                                        <Cell fill={getAccessibilityColor(entry.score)} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </Box>
                        <hr />
                        <Typography variant='body1'>This area within <b style={{ color: scoreColorSelected }}>Barangay {barangay}</b> has an average <i>Accessibility Score </i>
                            of <b style={{ color: scoreColorSelected }}>{accessibilityDataAverage}</b>. This is considered
                            a <b style={{ color: scoreColorSelected }}><AccessibilityClassification score={accessibilityDataAverage} /></b> area.</Typography>
                    </div>
                )
            case "Sustainability": // Show all
                return (
                    <div>
                        <hr />
                        <Typography variant="h6">Hazard Safety Score</Typography>
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            marginLeft={-5}>
                            <BarChart width={350} height={150} data={hazardData}>
                                <XAxis dataKey="name" />
                                <YAxis type="number" domain={[0, 1]} />
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
                                <YAxis type="number" domain={[0, 1]} />
                                <Tooltip />
                                <Bar dataKey="score">
                                    {accessibilityData.map((entry, index) => (
                                        <Cell fill={getAccessibilityColor(entry.score)} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </Box>

                        <Typography variant="h6">Overall Suitability Score</Typography>
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            marginLeft={-5}
                        >
                            <BarChart width={350} height={150} data={sustainabilityData}>
                                <XAxis dataKey="name" />
                                <YAxis domain={[0, 0.65]} allowDataOverflow={true} />
                                <Tooltip />
                                <Bar dataKey="score">
                                    {sustainabilityData.map((entry, index) => (
                                        <Cell fill={getSustainabilityColor(entry.score)} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </Box>

                        <Typography variant="h6">Coverage Score</Typography>
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            marginLeft={0}
                        >
                            <PieChart width={350} height={220}>
                                <Pie
                                    data={coverageData}
                                    labelLine={false}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="score"
                                >
                                    {coverageData.map((entry, index) => (
                                        <Cell fill={getCoverageColor[index % getCoverageColor.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </Box>

                        <Typography variant="h6">Elevation</Typography>
                        <Typography><b>{analysisState.data[9]} Meters</b> Above Sea Level</Typography>
                        <hr />
                        <Typography variant='body1'>This area within <b style={{ color: scoreColorSelected }}>Barangay {barangay}</b> has an average <i>Suitability Score </i>
                            of <b style={{ color: scoreColorSelected }}>{sustainabilityDataAverage}</b>. This is considered
                            a <b style={{ color: scoreColorSelected }}><SustainabilityClassification score={sustainabilityDataAverage} /></b> area.</Typography>
                    </div>
                );
            case "Coverage Score":
                return (<div>
                    <hr />
                    <Typography variant="overline">BARANGAY <b>{barangay}</b></Typography>
                    <Typography variant="h6">Coverage Score</Typography>
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        marginLeft={0}
                    >
                        <PieChart width={350} height={220}>
                            <Pie
                                data={coverageData}
                                labelLine={false}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="score"
                            >
                                {coverageData.map((entry, index) => (
                                    <Cell fill={getCoverageColor[index % getCoverageColor.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </Box>
                    <hr />
                    <Typography variant='body1'>The human population of this area within barangay <b>{barangay}</b> takes up <b>{coverageDataPercentage}%</b> of the area.</Typography>
                </div>
                )
            default:
                return (<div></div>); // No case
        }
    } else {
        return (<div></div>) // No case
    }
}
