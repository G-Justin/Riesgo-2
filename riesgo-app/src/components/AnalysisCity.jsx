import { Box, Typography } from '@mui/material';
import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import {
    XAxis,
    YAxis,
    CartesianGrid,
    BarChart,
    Bar,
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
            },
            {
                name: "0.7",
                five_yr: 0,
                twentyfive_yr: 0,
                hundred_yr: 0,
                amt: 2100
            },
            {
                name: "0.8",
                five_yr: 0,
                twentyfive_yr: 0,
                hundred_yr: 0,
                amt: 2100
            },
            {
                name: "0.9",
                five_yr: 0,
                twentyfive_yr: 0,
                hundred_yr: 0,
                amt: 2100
            },
            {
                name: "1",
                five_yr: 0,
                twentyfive_yr: 0,
                hundred_yr: 0,
                amt: 2100
            },
        ];

        return (
            <div>
                <Typography variant='h6'>Mean Suitability Score: 0.3</Typography>
                <Typography variant='overline'>(Applies for all return periods)</Typography>
                <hr />
                <Typography variant='h6'>City Suitability Distribution</Typography>
                <Typography variant='overline'>for each dataset return period</Typography>
                <div>
                    <Accordion defaultExpanded="true">
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>5 Year Return Period</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                marginLeft={-2}
                            >
                                <BarChart
                                    width={300}
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
                                    <Bar dataKey="five_yr" fill="#fb5c5b" />
                                </BarChart>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography>25 Year Return Period</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                marginLeft={-2}
                            >
                                <BarChart
                                    width={300}
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
                                    <Bar dataKey="twentyfive_yr" fill="#f1b660" />
                                </BarChart>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography>100 Year Return Period</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                marginLeft={-2}
                            >
                                <BarChart
                                    width={300}
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
                                    <Bar dataKey="hundred_yr" fill="#49c0e8" />
                                </BarChart>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                </div>
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
            },
            {
                name: "0.7",
                five_yr: 0,
                twentyfive_yr: 0,
                hundred_yr: 0,
                amt: 2100
            },
            {
                name: "0.8",
                five_yr: 0,
                twentyfive_yr: 0,
                hundred_yr: 0,
                amt: 2100
            },
            {
                name: "0.9",
                five_yr: 0,
                twentyfive_yr: 0,
                hundred_yr: 0,
                amt: 2100
            },
            {
                name: "1",
                five_yr: 0,
                twentyfive_yr: 0,
                hundred_yr: 0,
                amt: 2100
            },
        ];

        return (
            <div>
                <Typography variant='h6'>City Suitability Distribution</Typography>
                <Typography variant='overline'>for each dataset return period</Typography>
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    marginLeft={-2}
                >
                    <BarChart
                        width={380}
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
                        <Bar dataKey="five_yr" fill="#fb5c5b" />
                    </BarChart>
                </Box>
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    marginLeft={-2}
                >
                    <BarChart
                        width={380}
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
                        <Bar dataKey="twentyfive_yr" fill="#f1b660" />
                    </BarChart>
                </Box>
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    marginLeft={-2}
                >
                    <BarChart
                        width={380}
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
                        <Bar dataKey="hundred_yr" fill="#49c0e8" />
                    </BarChart>
                </Box>
                <hr />
                <Typography variant='h6'>Mean Suitability Score: 0.19</Typography>
                <Typography variant='overline'>(Applies for all return periods)</Typography>
            </div>
        );
    } else {
        return (<div></div>)
    }
}