import { Box, Typography } from '@mui/material';
import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    // Tooltip,
    Legend
} from "recharts";

export default function AnalysisCity(props) {
    if (props.cityName === 'l_marikina') {
        const data = [
            {
                name: "0.0",
                five_yr: 10,
                twentyfive_yr: 10,
                hundred_yr: 10,
                amt: 2400
            },
            {
                name: "0.1",
                five_yr: 50,
                twentyfive_yr: 110,
                hundred_yr: 100,
                amt: 2210
            },
            {
                name: "0.2",
                five_yr: 250,
                twentyfive_yr: 375,
                hundred_yr: 400,
                amt: 2290
            },
            {
                name: "0.3",
                five_yr: 400,
                twentyfive_yr: 425,
                hundred_yr: 575,
                amt: 2000
            },
            {
                name: "0.4",
                five_yr: 480,
                twentyfive_yr: 250,
                hundred_yr: 300,
                amt: 2181
            },
            {
                name: "0.5",
                five_yr: 200,
                twentyfive_yr: 110,
                hundred_yr: 180,
                amt: 2500
            },
            {
                name: "0.6",
                five_yr: 10,
                twentyfive_yr: 10,
                hundred_yr: 5,
                amt: 2100
            }
        ];

        return (
            <div>
                <Typography variant='h6'>Marikina Sustainability Distribution</Typography>
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    marginLeft={-2}
                >
                    <LineChart
                        width={340}
                        height={250}
                        data={data}
                        margin={{
                            top: 10,
                            bottom: 5
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        {/* <Tooltip /> */}
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="twentyfive_yr"
                            stroke="#8884d8"
                        />
                        <Line type="monotone" dataKey="five_yr" stroke="#82ca9d" />
                        <Line type="monotone" dataKey="hundred_yr" stroke="#ca8282" />
                    </LineChart>
                </Box>
            </div>
        );
    } else if (props.cityName === 'l_pasig') {
        const data = [
            {
                name: "0.0",
                five_yr: 55,
                twentyfive_yr: 100,
                hundred_yr: 110,
                amt: 2400
            },
            {
                name: "0.1",
                five_yr: 350,
                twentyfive_yr: 500,
                hundred_yr: 600,
                amt: 2210
            },
            {
                name: "0.2",
                five_yr: 770,
                twentyfive_yr: 750,
                hundred_yr: 790,
                amt: 2290
            },
            {
                name: "0.3",
                five_yr: 500,
                twentyfive_yr: 450,
                hundred_yr: 400,
                amt: 2000
            },
            {
                name: "0.4",
                five_yr: 150,
                twentyfive_yr: 125,
                hundred_yr: 150,
                amt: 2181
            },
            {
                name: "0.5",
                five_yr: 50,
                twentyfive_yr: 80,
                hundred_yr: 50,
                amt: 2500
            },
            {
                name: "0.6",
                five_yr: 10,
                twentyfive_yr: 10,
                hundred_yr: 5,
                amt: 2100
            }
        ];

        return (
            <div>
                <Typography variant='h6'>Pasig Sustainability Distribution</Typography>
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    marginLeft={-2}
                >
                    <LineChart
                        width={340}
                        height={250}
                        data={data}
                        margin={{
                            top: 10,
                            bottom: 5
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        {/* <Tooltip /> */}
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="twentyfive_yr"
                            stroke="#8884d8"
                        />
                        <Line type="monotone" dataKey="five_yr" stroke="#82ca9d" />
                        <Line type="monotone" dataKey="hundred_yr" stroke="#ca8282" />
                    </LineChart>
                </Box>
            </div>
        );
    } else {
        return (<div></div>)
    }
}