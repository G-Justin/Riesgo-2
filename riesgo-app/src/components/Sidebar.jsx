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
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import FilterHdrIcon from '@mui/icons-material/FilterHdr';
import HouseSidingIcon from '@mui/icons-material/HouseSiding';
import PeopleIcon from '@mui/icons-material/People';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import BuildIcon from '@mui/icons-material/Build';
import WarningIcon from '@mui/icons-material/Warning';

//Misc
import Divider from '@mui/material/Divider';

//Select
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

//Adjust Weights
import Slider from './Slider'
import Fade from '@mui/material/Fade';
import React from "react";
import {ReactComponent as LogoSvg} from '../assets/riesgo-logo-small.svg';

const Sidebar = (props) => {
    const [city, setCity] = React.useState(0);
    const [value, setValue] = React.useState(0);
    const [layer, setLayer] = React.useState(0);

    //Adjust Weights Ui
    const [open, setOpen] = React.useState(false);

    //Handle Open Land Usage (Default)
    const handleOpen =  () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (event) => {
        setCity(event.target.value);
        props.updateCity(event.target.value);
    };

    function CityName(props) {
        const cityName = props.cityName;

        if(cityName === "l_manila") {
            return "Manila" 
        } else if(cityName === "l_pasig") {
            return "Pasig"
        } else if(cityName === "l_marikina") {
            return "Marikina"
        } else {
            return "Select a City"
        }
    }

    function CityDetails(props) {
        const cityName = props.cityName;

        if(cityName === "l_manila") {
            return "Manila, the capital of the Philippines, is a densely populated bayside city on the island of Luzon, which mixes Spanish colonial architecture with modern skyscrapers. Intramuros, a walled city in colonial times, is the heart of Old Manila. It’s home to the baroque 16th-century San Agustin Church as well as Fort Santiago, a storied citadel and former military prison." 
        } else if(cityName === "l_pasig") {
            return "Pasig City is a large district with a mix of offices and upscale housing, popular for mall complexes in and around the Ortigas Center area. Hip eateries serving modern Filipino fare cluster in Kapitolyo village, and parks like Greenfield District host weekend markets with local food and crafts."
        } else if(cityName === "l_marikina") {
            return "Marikina, officially the City of Marikina, is a 1st class highly urbanized city in the National Capital Region of the Philippines. According to the 2020 census, it has a population of 456,059 people."
        } else {
            return "None Selected"
        }
    }

    function LayerName(props) {
        const layerName = props.layerName;

        switch(layerName) {
            case "Flood":
                return "Flood Map";
            case "Elevation":
                return "Land Elevation";
            case "Accessibility":
                return "Area Accessibility";
            case "Hazard":
                return "Hazard Levels";
            default:
                return "Welcome to RIESGO!"
        }
    }

    function LayerDetails(props) {
        const layerName = props.layerName;

        switch(layerName) {
            case "Flood":
                return "Flood details";
            case "Elevation":
                return "Elevation details";
            case "Accessibility":
                return "Accessibility details";
            case "Hazard":
                return "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
            default:
                return "Select a map to view details."
        }
    }

    // function LegendRow() {

    // }

    // function LegendHandling(props) {
    //     for(var i = 0; i < )
    // }

    return (
        <div>
        
        {/* Left */}
        <Card sx={{ width: 340, position: "absolute", margin: 2 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                <LogoSvg />
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
                    <CityName  cityName={city} />
                </b>
                </Typography>

                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    City
                </Typography>

                <Typography variant="body2">
                    <CityDetails  cityName={city} />
                </Typography>
            </CardContent>
            
            <CardActions>
                <Button size="small">View Details</Button>
            </CardActions>
        </Card>

        <Card id="labels" sx={{ minWidth: 150, position: "absolute", margin:2, left: 350}}>
            <CardContent>
                <Typography>
                    <b>Flood Risk Legend</b>
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.primary" className="legend">
                    <div><span style={{backgroundColor: '#ffd86e'}}></span>No Risk</div>
                    <div><span style={{backgroundColor: '#f6684c'}}></span>Low Risk</div>
                    <div><span style={{backgroundColor: '#9d1e69'}}></span>Medium Risk</div>
                    <div><span style={{backgroundColor: '#300061'}}></span>High Risk</div>
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
                            const toActivate = `${city}_flood`;

                            setLayer('Flood');
                            props.updateLayerType('flood');
                            props.updateLayer(toActivate);
                        }}
                    />
                    <BottomNavigationAction 
                        label="Hazard Levels" 
                        icon={<WarningIcon />} 
                        
                        onClick={() => {
                            const toActivate = `${city}_hazard`;

                            setLayer('Hazard');
                            props.updateLayerType('hazard');
                            props.updateLayer(toActivate);
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

                            handleClose()
                        }}
                    />
                    <BottomNavigationAction 
                        label="Evacuation"
                        icon={<FavoriteIcon/>}
                        onClick={handleClose}
                    />
                    <BottomNavigationAction label="Land Use" icon={<HouseSidingIcon />} />
                    <BottomNavigationAction label="Population" icon={<PeopleIcon />} />
                    <BottomNavigationAction 
                        label="Land Usage"
                        icon={<EqualizerIcon />} 
                        onClick={handleOpen}
                    />
                    <BottomNavigationAction label="Recommender" icon={<BuildIcon />} />
                </BottomNavigation>
        </Paper>

        {/* Right */}
        <Card sx={{ width: 340, position: "absolute", margin: 2, right: 40}}>
            <CardContent>
                <Typography variant="h6" component="div">
                    <LayerName layerName={layer} />
                </Typography>

                <Divider sx={{marginTop: 1, marginBottom: 1}}/>

                <Typography variant="body2" align="justify">
                    <LayerDetails  layerName={layer} />
                </Typography>
            </CardContent>
        </Card>

        <Fade in={open}>
            <Card sx={{ width: 300, position: "absolute", margin: 2, right: 0, bottom: 250 }}>
                <CardContent>
                    <Typography variant="h6" component="div">
                        Adjust Land Usage
                    </Typography>

                    <Divider sx={{marginTop: 1, marginBottom: 1}}/>
                    <Slider />
                    
                </CardContent>
            </Card>
        </Fade>

        </div>
    )
}

export default Sidebar
