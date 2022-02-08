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

export default function Analysis(props) {
    const [analysisState, setAnalysisState] = React.useState(props);

    React.useEffect(() => {
        setAnalysisState(props);
    }, [props]);

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
                            <Typography variant='body1'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                                standard dummy text ever since the 1500s</Typography>
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
                            <Typography variant='body1'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                                standard dummy text ever since the 1500s</Typography>
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
                            <Typography variant='body1'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                                standard dummy text ever since the 1500s</Typography>
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
                        <Typography variant='body1'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                            standard dummy text ever since the 1500s</Typography>
                    </div>)
                case "Land Use Score":
                    return (<div>
                        <hr />
                        <Typography variant="h6">Marikina Land Usage Distribution</Typography>
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
                            <Typography variant="h6">Marikina Average Sustainability Score</Typography>
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
                            <Typography variant='body1'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                                standard dummy text ever since the 1500s</Typography>
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
                            <Typography variant='body1'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                                standard dummy text ever since the 1500s</Typography>
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
                            <Typography variant='body1'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                                standard dummy text ever since the 1500s</Typography>
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
                            <Typography variant='body1'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                                standard dummy text ever since the 1500s</Typography>
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
                        <Typography variant='body1'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                            standard dummy text ever since the 1500s</Typography>
                    </div>)
                case "Land Use Score":
                    return (<div>
                        <hr />
                        <Typography variant="h6">Pasig Land Usage Distribution</Typography>
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
                            <Typography variant="h6">Pasig Average Sustainability Score</Typography>
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
                            <Typography variant='body1'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                                standard dummy text ever since the 1500s</Typography>
                        </div>
                    )
                default:
                    return (<div></div>)

            }
        } else {
            return (<div></div>)
        }
    }

    else if (props.selected === true) {
        return (
            <div>
                <i>Higher is better *</i> <br />
                <Typography variant="overline">years are represented as <b>return periods</b></Typography>
                <Typography variant="h6">Flood Safety Score</Typography>
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    marginLeft={-5}
                >
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

                <Typography variant="h6">Overall Sustainability Score</Typography>
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

                <Typography variant="h6">Elevation (Above Sea Level)</Typography>
                <Typography variant="h4"><b>{analysisState.data[9]} Meters</b></Typography>
            </div>
        );
    } else {
        return (<div></div>)
    }

}
