//Paper and Material UI
import { BottomNavigation } from "@mui/material"
import { BottomNavigationAction } from "@mui/material"
import { Button } from "@mui/material"
import { Card } from "@mui/material"
import { CardActions } from "@mui/material"
import { CardContent } from "@mui/material"
import { Paper } from "@mui/material"
import { Typography } from "@mui/material"

//Icons 
import WaterIcon from '@mui/icons-material/Water';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import FilterHdrIcon from '@mui/icons-material/FilterHdr';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import WarningIcon from '@mui/icons-material/Warning';
import BlockIcon from '@mui/icons-material/Block';

//Misc
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';

//Select
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

//Adjust Weights
import Slider from './Slider'
import Fade from '@mui/material/Fade';
import React from "react";
import { ReactComponent as LogoSvg } from '../assets/riesgo-logo-small.svg';
import { Box } from "@mui/system"

const Sidebar = (props) => {
    const [city, setCity] = React.useState(0);
    const [value, setValue] = React.useState(0);
    const [layer, setLayer] = React.useState(0);

    //Adjust Weights Ui
    const [open, setOpen] = React.useState(false);

    //Handle Open Land Usage (Default)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (event) => {
        setCity(event.target.value);
        props.updateCity(event.target.value);
    };

    function CityName(props) {
        const cityName = props.cityName;

        if (cityName === "l_manila") {
            return "Manila"
        } else if (cityName === "l_pasig") {
            return "Pasig"
        } else if (cityName === "l_marikina") {
            return "Marikina"
        } else {
            return "Select a City"
        }
    }

    function CityDetails(props) {
        const cityName = props.cityName;

        if (cityName === "l_manila") {
            return "Manila, the capital of the Philippines, is a densely populated bayside city on the island of Luzon, which mixes Spanish colonial architecture with modern skyscrapers. Intramuros, a walled city in colonial times, is the heart of Old Manila. It’s home to the baroque 16th-century San Agustin Church as well as Fort Santiago, a storied citadel and former military prison."
        } else if (cityName === "l_pasig") {
            return "Pasig City is a large district with a mix of offices and upscale housing, popular for mall complexes in and around the Ortigas Center area. Hip eateries serving modern Filipino fare cluster in Kapitolyo village, and parks like Greenfield District host weekend markets with local food and crafts."
        } else if (cityName === "l_marikina") {
            return "Marikina, officially the City of Marikina, is a 1st class highly urbanized city in the National Capital Region of the Philippines. According to the 2020 census, it has a population of 456,059 people."
        } else {
            return "None Selected"
        }
    }

    function LayerName(props) {
        const layerName = props.layerName;

        switch (layerName) {
            case "Flood":
                return "Flood Map";
            case "Elevation":
                return "Land Elevation";
            case "Accessibility":
                return "Area Accessibility";
            case "Hazard":
                return "Hazard Level";
            case "Land Use":
                return "Land Use";
            case "Sustainability":
                return "Sustainability";

            default:
                return ""
        }
    }

    function LayerDetails(props) {
        const layerName = props.layerName;

        switch (layerName) {
            case "Flood":
                return "5 Year flood map data of the selected city.";
            case "Elevation":
                return "This map visualizes the elevatedness of certain areas around a city.";
            case "Accessibility":
                return "Accessibility score considers how accessible an area is to vehicles or roads. Generally, the higher the accessibility score, the better people can access it.";
            case "Hazard":
                return "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
            case "Land Use":
                return "Adjust land usage values in order to prioritize certain establishments or zones over others.";
            case "Sustainability":
                return "Sustainability";
            default:
                return "Select a map to view details."
        }
    }

    function LegendDetails(props) {
        const layerName = props.layerName;

        switch (layerName) {
            case "Flood":
                return (
                    <Box>
                        <div><span style={{ backgroundColor: '#cfd3ff' }}></span>No Flood</div>
                        <div><span style={{ backgroundColor: '#727ded' }}></span>Low Flood</div>
                        <div><span style={{ backgroundColor: '#3741a1' }}></span>Medium Flood</div>
                        <div><span style={{ backgroundColor: '#06106b' }}></span>High Flood</div>
                    </Box>
                );
            case "Elevation":
                return (
                    <Box>
                        <div><span style={{ backgroundColor: '#d4fde4' }}></span>Low Elevation</div>
                        <div><span style={{ backgroundColor: '#80ce95' }}></span>Medium Elevation</div>
                        <div><span style={{ backgroundColor: '#0a8c26' }}></span>High Elevation</div>
                    </Box>
                );
            case "Accessibility":
                return (
                    <Box>
                        <div><span style={{ backgroundColor: '#FFF0F3' }}></span>Low Accessibility</div>
                        <div><span style={{ backgroundColor: '#C9184A' }}></span>Medium Accessibility</div>
                        <div><span style={{ backgroundColor: '#800F2F' }}></span>High Accessibility</div>
                    </Box>
                );
            case "Hazard":
                return (
                    <Box>
                        <div><span style={{ backgroundColor: '#ffd86e' }}></span>No Hazard</div>
                        <div><span style={{ backgroundColor: '#f6684c' }}></span>Low Hazard</div>
                        <div><span style={{ backgroundColor: '#9d1e69' }}></span>Medium Hazard</div>
                        <div><span style={{ backgroundColor: '#300061' }}></span>High Hazard</div>
                    </Box>
                );
            default:
                return "Select a map to view details."
        }
    }

    return (
        <div>

            {/* Left */}
            {/* MAIN CITY SELECT */}
            <Card sx={{ width: 340, position: "absolute", margin: 2 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        <Link to="/">
                            <LogoSvg />
                        </Link>
                    </Typography>
                    <FormControl variant="standard" sx={{ minWidth: '100%', mb: 1 }}>
                        <InputLabel id="demo-simple-select-standard-label">City Select</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={city}
                            onChange={handleChange}
                            label="City Select"
                            type="text"
                        >
                            <MenuItem value={'l_manila'}>Manila</MenuItem>
                            <MenuItem value={'l_marikina'}>Marikina</MenuItem>
                            <MenuItem value={'l_pasig'}>Pasig</MenuItem>
                        </Select>
                    </FormControl>
                    <Typography variant="h5" component="div">
                        <b>
                            <CityName cityName={city} />
                        </b>
                    </Typography>

                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        City
                    </Typography>

                    <Typography variant="body">
                        <CityDetails cityName={city} />
                        <hr />
                        <Typography variant="h6"><LayerName layerName={layer} /> Score</Typography>
                        <Typography id="pd">undefined</Typography>
                    </Typography>

                </CardContent>

                <CardActions>
                    <Button size="small">View Map Details</Button>
                </CardActions>


            </Card>

            {/* LEGEND DISPLAY */}
            <Card id="labels" sx={{ minWidth: 150, position: "absolute", margin: 2, left: 350 }}>
                <CardContent>
                    <Typography>
                        <b><LayerName layerName={layer} /> Legend</b>
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.primary" className="legend">
                        <LegendDetails layerName={layer} />
                    </Typography>
                </CardContent>
            </Card>

            {/* Bottom */}
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                >
                    <BottomNavigationAction
                        label="Flood Map"
                        icon={<WaterIcon />}

                        onClick={() => {
                            const toActivate = `${city}_flood`; //$city gets current city selected

                            setLayer('Flood'); //Front-end Display name of Layer
                            props.updateLayerType('flood'); //Back-end name of Layer
                            props.updateLayer(toActivate);  //Load the dynamic regex in the backend

                            handleClose();
                        }}
                    />
                    <BottomNavigationAction
                        label="Hazard Level"
                        icon={<WarningIcon />}

                        onClick={() => {
                            //By Default
                            const toActivate = `${city}_hazard_5yr`;

                            setLayer('Hazard');
                            props.updateLayerType('hazard');
                            props.updateLayer(toActivate);

                            handleClose();
                        }}
                    />
                    <BottomNavigationAction
                        label="Area Accessibility"
                        icon={<LocalHospitalIcon />}

                        onClick={() => {
                            const toActivate = `${city}_accessibility`;

                            setLayer('Accessibility');
                            props.updateLayerType('accessibility');
                            props.updateLayer(toActivate);

                            handleClose();
                        }}
                    />
                    <BottomNavigationAction
                        label="Land Elevation"
                        icon={<FilterHdrIcon />}

                        onClick={() => {
                            const toActivate = `${city}_elevation`;

                            setLayer('Elevation');
                            props.updateLayerType('elevation');
                            props.updateLayer(toActivate);

                            handleClose();
                        }}
                    />
                    <BottomNavigationAction
                        label="Land Usage"
                        icon={<EqualizerIcon />}
                        onClick={() => {
                            const toActivate = `${city}_landuse`;

                            setLayer('Land Use');
                            props.updateLayerType('landuse');
                            props.updateLayer(toActivate);

                            handleOpen();
                        }}
                    />
                    <BottomNavigationAction
                        label="Coverage"
                        icon={<EqualizerIcon />}
                        onClick={() => {
                            const toActivate = `${city}_coverage_score`;

                            setLayer('Coverage Score');
                            props.updateLayerType('coveragescore');
                            props.updateLayer(toActivate);

                            handleClose();
                        }}
                    />
                    <BottomNavigationAction
                        label="None"
                        icon={<BlockIcon />}

                        onClick={() => {

                            handleClose();
                        }}
                    />
                    {/* <BottomNavigationAction
                        label="Recommender"
                        icon={<FavoriteIcon />} 
                        onClick={() => {
                            const toActivate = `${city}_sustainability`;

                            setLayer('Sustainability');
                            props.updateLayerType('sustainability');
                            props.updateLayer(toActivate);

                            handleClose();
                        }}
                    /> */}
                </BottomNavigation>
            </Paper>

            {/* Right */}
            <Card sx={{ width: 340, position: "absolute", margin: 2, right: 40 }}>
                <CardContent>
                    <Typography variant="h6" component="div">
                        <LayerName layerName={layer} />
                    </Typography>

                    <Divider sx={{ marginTop: 1, marginBottom: 1 }} />

                    <Typography variant="body" align="justify">
                        <LayerDetails layerName={layer} />
                    </Typography>

                    {/* Marikina Flood Buttons */}
                    {layer === "Flood" && 
                    <Box sx={{ '& button': { m: 1 } }}>
                        <div onChange={(event, newValue) => {
                            setValue(newValue);
                        }}>
                            <Button variant="outlined" size="small"
                                onClick={() => {
                                    const toActivate = `${city}_flood_5yr`;

                                    setLayer('Flood');
                                    props.updateLayerType('flood5yr');
                                    props.updateLayer(toActivate);

                                    handleClose();
                                }}>
                                5 Years
                            </Button>
                            <Button variant="outlined" size="small"
                                onClick={() => {
                                    const toActivate = `${city}_flood_25yr`;

                                    setLayer('Flood');
                                    props.updateLayerType('flood25yr');
                                    props.updateLayer(toActivate);

                                    handleClose();
                                }}>
                                25 Years
                            </Button>
                            <Button variant="outlined" size="small"
                            onClick={() => {
                                const toActivate = `${city}_flood_100yr`;

                                setLayer('Flood');
                                props.updateLayerType('flood100yr');
                                props.updateLayer(toActivate);

                                handleClose();
                            }}>
                                100 Years
                            </Button>
                        </div>
                    </Box>}

                    {/* Marikina Hazard Buttons */}
                    {layer === "Hazard" && 
                    <Box sx={{ '& button': { m: 1 } }}>
                        <div onChange={(event, newValue) => {
                            setValue(newValue);
                        }}>
                            <Button variant="outlined" size="small"
                                onClick={() => {
                                    const toActivate = `${city}_hazard_5yr`;

                                    setLayer('Hazard');
                                    props.updateLayerType('hazard5yr');
                                    props.updateLayer(toActivate);

                                    handleClose();
                                }}>
                                5 Years
                            </Button>
                            <Button variant="outlined" size="small"
                                onClick={() => {
                                    const toActivate = `${city}_hazard_25yr`;

                                    setLayer('Hazard');
                                    props.updateLayerType('hazard25yr');
                                    props.updateLayer(toActivate);

                                    handleClose();
                                }}>
                                25 Years
                            </Button>
                            <Button variant="outlined" size="small"
                            onClick={() => {
                                const toActivate = `${city}_hazard_100yr`;

                                setLayer('Hazard');
                                props.updateLayerType('hazard100yr');
                                props.updateLayer(toActivate);

                                handleClose();
                            }}>
                                100 Years
                            </Button>
                        </div>
                    </Box>}
                </CardContent>
            </Card>


            {/* Land Usage Modal */}
            <Fade in={open}>
                <Card sx={{ width: 300, position: "absolute", margin: 2, right: 0, bottom: 250 }}>
                    <CardContent>
                        <Typography variant="h6" component="div">
                            Adjust Land Usage
                        </Typography>

                        <Divider sx={{ marginTop: 1, marginBottom: 1 }} />

                        <Slider />
                    </CardContent>
                </Card>
            </Fade>

        </div>
    )
}

export default Sidebar
