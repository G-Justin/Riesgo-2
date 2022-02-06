//Paper and Material UI
import { BottomNavigation } from "@mui/material"
import { BottomNavigationAction } from "@mui/material"
import { Button } from "@mui/material"
import { Card } from "@mui/material"
//import { CardActions } from "@mui/material"
import { CardContent } from "@mui/material"
import { Paper } from "@mui/material"
import { Typography } from "@mui/material"

//Icons 
import WaterIcon from '@mui/icons-material/Water';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import FilterHdrIcon from '@mui/icons-material/FilterHdr';
import WarningIcon from '@mui/icons-material/Warning';
import BlockIcon from '@mui/icons-material/Block';
import HouseIcon from '@mui/icons-material/House';
import PeopleIcon from '@mui/icons-material/People';
import DownloadIcon from '@mui/icons-material/Download';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

//Misc
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';

//Select
//import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

//Adjust Weights
import Slider from './Slider';
import Fade from '@mui/material/Fade';
import React from "react";
import { Box } from "@mui/system";

//Table Data
import DataTable from './DataTable';

//Analysis Data
import Analysis from "./Analysis";
import AnalysisSide from "./AnalysisSide";

//Year Buttons
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const Sidebar = (props) => {
    const [city, setCity] = React.useState('l_marikina');
    const [layer, setLayer] = React.useState(0);
    const [value, setValue] = React.useState(0);

    //Update Analysis Props
    const [analysisState, setAnalysisState] = React.useState(props);
    React.useEffect(() => {
        setAnalysisState(props);
    }, [props]);

    //React.useEffect(() => console.log('Value Changed!'));

    //Year Buttons
    const [alignment, setAlignment] = React.useState('5yr_flood');
    const handleYearButtonChange = (event, newAlignment) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment);
        }
    };


    //Adjust Weights Ui
    const [open, setOpen] = React.useState(false);

    //Handle Open Land Usage (Default)
    // const handleOpen = () => setOpen(true);
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
            return ""
            //return "Manila, the capital of the Philippines, is a densely populated bayside city on the island of Luzon, which mixes Spanish colonial architecture with modern skyscrapers. Intramuros, a walled city in colonial times, is the heart of Old Manila. It’s home to the baroque 16th-century San Agustin Church as well as Fort Santiago, a storied citadel and former military prison."
        } else if (cityName === "l_pasig") {
            return ""
            //return "Pasig City is a large district with a mix of offices and upscale housing, popular for mall complexes in and around the Ortigas Center area. Hip eateries serving modern Filipino fare cluster in Kapitolyo village, and parks like Greenfield District host weekend markets with local food and crafts."
        } else if (cityName === "l_marikina") {
            return ""
            //return "Marikina, officially the City of Marikina, is a 1st class highly urbanized city in the National Capital Region of the Philippines. According to the 2020 census, it has a population of 456,059 people."            
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
            case "Coverage Score":
                return "Coverage";
            case "Land Use Score":
                return "Land Usability";
            case "Sustainability":
                return "Sustainability";
            default:
                return "No Layer Selected"
        }
    }

    function LayerDetails(props) {
        const layerName = props.layerName;

        switch (layerName) {
            case "Flood":
                return "Flood maps describes how susceptible sections within an area towards flooding. It also utilizes return periods where it presents the probability of a flood occuring in a specific period of time.";
            case "Elevation":
                return "This map visualizes the elevatedness of certain areas around a city.";
            case "Accessibility":
                return "Accessibility score considers how accessible an area is to vehicles or roads. Generally, the higher the accessibility score, the better people can access it.";
            case "Hazard":
                return "This map provides visualization on the impact of flood towards human activity and property.";
            case "Coverage Score":
                return "Coverage score takes into account the population of a cell and its neighbors within a 2 km radius."
            case "Land Use Score":
                return "The land usability score represents which areas in this grid are most suitable for situating new evacuation centers.";
            case "Sustainability":
                return "Sustainability";
            default:
                return "You are currently not selecting a map. Select a layer map below to view its details."
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
            case "Coverage Score":
                return (
                    <Box>
                        <div><span style={{ backgroundColor: '#300061' }}></span>Rural</div>
                        <div><span style={{ backgroundColor: '#9d1e69' }}></span>Suburban</div>
                        <div><span style={{ backgroundColor: '#f6684c' }}></span>Urban</div>
                        <div><span style={{ backgroundColor: '#fcfbab' }}></span>Dense Urban</div>
                    </Box>
                );
            case "Land Use Score":
                return (
                    <Box>
                        <div><span style={{ backgroundColor: '#340042' }}></span>Unrecommended Area</div>
                        <div><span style={{ backgroundColor: '#216d7b' }}></span>Slight Usability</div>
                        <div><span style={{ backgroundColor: '#4ec050' }}></span>High Usability</div>
                        <div><span style={{ backgroundColor: '#fcba03' }}></span>Recommended Area</div>
                    </Box>
                );
            case "Sustainability":
                return (
                    <Box>
                        <div><span style={{ backgroundColor: '#ff3d3d' }}></span>Unsuitable</div>
                        <div><span style={{ backgroundColor: '#e0762f' }}></span>Slightly Suitable</div>
                        <div><span style={{ backgroundColor: '#fcd874' }}></span>Highly Suitable</div>
                        <div><span style={{ backgroundColor: '#2fe02f' }}></span>Recommended Area</div>
                    </Box>
                );
            default:
                return "You are currently not selecting a map. Select a layer map below to view its details."
        }
    }

    return (
        <div>

            {/* Left */}
            {/* MAIN CITY SELECT */}
            <Card sx={{ width: 380, position: "absolute", margin: 2 }}>
                <CardContent>
                    <Box>
                        <Link to="/" >
                            <img src="/riesgo-logo-small.svg" alt="React Logo" width={"120px"} />
                        </Link>
                    </Box>

                    <FormControl variant="standard" sx={{ minWidth: '100%', mb: 1 }}>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={city}
                            onChange={handleChange}
                            type="text"
                            sx={{ fontSize: '2.25em' }}
                        >
                            <MenuItem value={'l_manila'}><b>Manila</b></MenuItem>
                            <MenuItem value={'l_marikina'}><b>Marikina</b></MenuItem>
                            <MenuItem value={'l_pasig'}><b>Pasig</b></MenuItem>
                        </Select>
                    </FormControl>

                    {/* <Typography variant="h5" component="div">
                        <b>
                            <CityName cityName={city} />
                        </b>
                    </Typography> */}

                    {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        City
                    </Typography> */}

                    <Typography variant="body">
                        <CityDetails cityName={city} />
                    </Typography>

                    <DataTable
                        cityName={city}
                    />

                    <hr />
                    <Button size="small">Download <CityName cityName={city} /> Dataset <DownloadIcon fontSize="small" /></Button>
                </CardContent>
            </Card>

            {/* LEGEND DISPLAY */}
            <Card id="labels" sx={{ width: 200, height: 160, position: "absolute", margin: 2, right: 370 }}>
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
            <Paper sx={{ position: 'fixed', bottom: 0, left: "15%", right: "15%"}} elevation={3}>
                <BottomNavigation
                    showLabels
                    value={value}
                    sx={{borderRadius: 16}}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                >
                    <BottomNavigationAction
                        label="Flood Map"
                        icon={<WaterIcon />}

                        onClick={() => {
                            const toActivate = `${city}_flood_5yr`; //$city gets current city selected

                            setLayer('Flood'); //Front-end Display name of Layer
                            props.updateLayerType('flood_5yr'); //Back-end name of Layer
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
                            props.updateLayerType('hazard_5yr');
                            props.updateLayer(toActivate);

                            handleClose();
                        }}
                    />
                    <BottomNavigationAction
                        label="Area Accessibility"
                        icon={<LocalHospitalIcon />}

                        onClick={() => {
                            const toActivate = `${city}_accessibility_5yr`;

                            setLayer('Accessibility');
                            props.updateLayerType('accessibility_5yr');
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
                        icon={<HouseIcon />}
                        onClick={() => {
                            const toActivate = `${city}_land_use_score`;

                            setLayer('Land Use Score');
                            props.updateLayerType('land_use_score');
                            props.updateLayer(toActivate);

                            //handleOpen();
                        }}
                    />
                    <BottomNavigationAction
                        label="Coverage"
                        icon={<PeopleIcon />}
                        onClick={() => {
                            const toActivate = `${city}_coverage_score`;

                            setLayer('Coverage Score');
                            props.updateLayerType('coverage_score');
                            props.updateLayer(toActivate);

                            handleClose();
                        }}
                    />
                    <BottomNavigationAction
                        label="Sustainability"
                        icon={<LightbulbIcon />}
                        onClick={() => {
                            const toActivate = `${city}_sustainability_5yr`;

                            setLayer('Sustainability');
                            props.updateLayerType('SUSTAINABILITY_5yr');
                            props.updateLayer(toActivate);

                            handleClose();
                        }}
                    />
                    <BottomNavigationAction
                        label="None"
                        icon={<BlockIcon />}

                        onClick={() => {

                            const toActivate = `none`;

                            setLayer('None');
                            props.updateLayerType('none');
                            props.updateLayer(toActivate);
                        }}
                    />
                </BottomNavigation>
            </Paper>

            {/* Right */}
            <Card id="style-1" sx={{ overflowX: "hidden", width: 360, maxHeight: 780, overflow: 'auto', position: "absolute", margin: 2, right: 0 }}>
                <CardContent sx={{ overflowX: "hidden" }}>
                    <Typography variant="h6" component="div">
                        <LayerName layerName={layer} />
                    </Typography>

                    <Divider sx={{ marginTop: 1, marginBottom: 1 }} />

                    <Typography variant="body" align="justify">
                        <LayerDetails layerName={layer} />
                    </Typography>

                    {/* Flood Buttons */}
                    {layer === "Flood" &&
                        <Box display="flex"
                            alignItems="center"
                            justifyContent="center"
                            paddingTop="0.5em">
                            <div onChange={(event, newValue) => {
                                setValue(newValue);
                            }}>
                                <ToggleButtonGroup
                                    color="primary"
                                    value={alignment}
                                    exclusive
                                    onChange={handleYearButtonChange}
                                >

                                    <ToggleButton
                                        value="5yr_flood"
                                        onClick={() => {
                                            const toActivate = `${city}_flood_5yr`;

                                            setLayer('Flood');
                                            props.updateLayerType('flood_5yr');
                                            props.updateLayer(toActivate);

                                            handleClose();
                                        }}>
                                        5 Years
                                    </ToggleButton>
                                    <ToggleButton
                                        value="25yr_flood"
                                        onClick={() => {
                                            const toActivate = `${city}_flood_25yr`;

                                            setLayer('Flood');
                                            props.updateLayerType('flood_25yr');
                                            props.updateLayer(toActivate);

                                            handleClose();
                                        }}>
                                        25 Years
                                    </ToggleButton>
                                    <ToggleButton
                                        value="100yr_flood"
                                        onClick={() => {
                                            const toActivate = `${city}_flood_100yr`;

                                            setLayer('Flood');
                                            props.updateLayerType('flood_100yr');
                                            props.updateLayer(toActivate);

                                            handleClose();
                                        }}>
                                        100 Years
                                    </ToggleButton>

                                </ToggleButtonGroup>
                            </div>
                        </Box>}

                    {/* Hazard Buttons */}
                    {layer === "Hazard" &&
                        <Box display="flex"
                            alignItems="center"
                            justifyContent="center"
                            paddingTop="0.5em">
                            <div onChange={(event, newValue) => {
                                setValue(newValue);
                            }}>
                                <ToggleButtonGroup
                                    color="primary"
                                    value={alignment}
                                    exclusive
                                    onChange={handleYearButtonChange}
                                >
                                    <ToggleButton
                                        value="5yr_flood"
                                        onClick={() => {
                                            const toActivate = `${city}_hazard_5yr`;

                                            setLayer('Hazard');
                                            props.updateLayerType('hazard_5yr');
                                            props.updateLayer(toActivate);

                                            handleClose();
                                        }}>
                                        5 Years
                                    </ToggleButton>
                                    <ToggleButton
                                        value="25yr_hazard"
                                        onClick={() => {
                                            const toActivate = `${city}_hazard_25yr`;

                                            setLayer('Hazard');
                                            props.updateLayerType('hazard_25yr');
                                            props.updateLayer(toActivate);

                                            handleClose();
                                        }}>
                                        25 Years
                                    </ToggleButton>
                                    <ToggleButton
                                        value="100yr_hazard"
                                        onClick={() => {
                                            const toActivate = `${city}_hazard_100yr`;

                                            setLayer('Hazard');
                                            props.updateLayerType('hazard_100yr');
                                            props.updateLayer(toActivate);

                                            handleClose();
                                        }}>
                                        100 Years
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </div>
                        </Box>}
                    {/* Accessibility Buttons */}
                    {layer === "Accessibility" &&
                        <Box display="flex"
                            alignItems="center"
                            justifyContent="center"
                            paddingTop="0.5em">
                            <div onChange={(event, newValue) => {
                                setValue(newValue);
                            }}>
                                <ToggleButtonGroup
                                    color="primary"
                                    value={alignment}
                                    exclusive
                                    onChange={handleYearButtonChange}
                                >
                                    <ToggleButton
                                        value="5yr_flood"
                                        onClick={() => {
                                            const toActivate = `${city}_accessibility_5yr`;

                                            setLayer('Accessibility');
                                            props.updateLayerType('accessibility_5yr');
                                            props.updateLayer(toActivate);

                                            handleClose();
                                        }}>
                                        5 Years
                                    </ToggleButton>
                                    <ToggleButton
                                        value="25yr_accessibility"
                                        onClick={() => {
                                            const toActivate = `${city}_accessibility_25yr`;

                                            setLayer('Accessibility');
                                            props.updateLayerType('accessibility_25yr');
                                            props.updateLayer(toActivate);

                                            handleClose();
                                        }}>
                                        25 Years
                                    </ToggleButton>
                                    <ToggleButton
                                        value="100yr_accessibility"
                                        onClick={() => {
                                            const toActivate = `${city}_accessibility_100yr`;

                                            setLayer('Accessibility');
                                            props.updateLayerType('accessibility_100yr');
                                            props.updateLayer(toActivate);

                                            handleClose();
                                        }}>
                                        100 Years
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </div>
                        </Box>}

                    {/* Sustainability Buttons */}
                    {layer === "Sustainability" &&
                        <Box display="flex"
                            alignItems="center"
                            justifyContent="center"
                            paddingTop="0.5em">
                            <div onChange={(event, newValue) => {
                                setValue(newValue);
                            }}>
                                <ToggleButtonGroup
                                    color="primary"
                                    value={alignment}
                                    exclusive
                                    onChange={handleYearButtonChange}
                                >
                                    <ToggleButton
                                        value="5yr_sustainability"
                                        onClick={() => {
                                            const toActivate = `${city}_sustainability_5yr`;

                                            setLayer('Sustainability');
                                            props.updateLayerType('SUSTAINABILITY_5yr');
                                            props.updateLayer(toActivate);

                                            handleClose();
                                        }}>
                                        5 Years
                                    </ToggleButton>
                                    <ToggleButton
                                        value="25yr_sustainability"
                                        onClick={() => {
                                            const toActivate = `${city}_sustainability_25yr`;

                                            setLayer('Sustainability');
                                            props.updateLayerType('SUSTAINABILITY_25yr');
                                            props.updateLayer(toActivate);

                                            handleClose();
                                        }}>
                                        25 Years
                                    </ToggleButton>
                                    <ToggleButton
                                        value="100yr_sustainability"
                                        onClick={() => {
                                            const toActivate = `${city}_sustainability_100yr`;

                                            setLayer('Sustainability');
                                            props.updateLayerType('SUSTAINABILITY_100yr');
                                            props.updateLayer(toActivate);

                                            handleClose();
                                        }}>
                                        100 Years
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </div>
                        </Box>}
                    <hr />
                    <Typography variant="h6"><LayerName layerName={layer} /> Hover Score</Typography>
                    <Typography id="pd">undefined</Typography>
                    
                    <AnalysisSide data={analysisState.marker_prop}/>
                    <Analysis data={analysisState.marker_prop} cityName={city} layerName={layer}/>
                    {/* <Typography variant="h6"><b>Marker Details</b></Typography>  
                        <Typography variant="body" id="pd-flood-5yr"></Typography> <br />
                        <Typography variant="body" id="pd-flood-25yr"></Typography> <br />
                        <Typography variant="body" id="pd-flood-100yr"></Typography>
                    <hr />
                        <Typography variant="body" id="pd-hazard-5yr"></Typography> <br />
                        <Typography variant="body" id="pd-hazard-25yr"></Typography> <br />
                        <Typography variant="body" id="pd-hazard-100yr"></Typography>
                    <hr />
                        <Typography variant="body" id="pd-accessibility-5yr"></Typography> <br />
                        <Typography variant="body" id="pd-accessibility-25yr"></Typography> <br />
                        <Typography variant="body" id="pd-accessibility-100yr"></Typography>
                    <hr />
                        <Typography variant="body" id="pd-elevation"></Typography>                         */}
                </CardContent>
            </Card>

            {/* Pie Chart ORIGINALLY: width: 200, maxHeight: 600 right: 410, top: 160 */}
            {/* <Card id="style-1" sx={{ overflowX: "hidden", width: 380, maxHeight: 500, overflow: 'auto', position: "absolute", margin: 2, left: 0, top: 430 }}>
                <CardContent sx={{ overflowX: "hidden" }}>
                    <AnalysisSide data={analysisState.marker_prop} />
                </CardContent>
            </Card> */}

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
