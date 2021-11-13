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

//Select
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

import Select from '@mui/material/Select';

import React from "react";
import {ReactComponent as LogoSvg} from '../assets/riesgo-logo-small.svg';

const Sidebar = (props) => {
    const [city, setCity] = React.useState('');
    const [value, setValue] = React.useState(0);

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

    return (
        <div>
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
                            var toActivate = '';
                            if(city === "l_pasig") {
                                toActivate = 'l_pasig_flood';
                            } else if (city === "l_manila") {
                                toActivate = 'l_manila_flood';
                            } else if (city === "l_marikina") {
                                toActivate = 'l_marikina_flood';
                            }
                            props.updateLayerType('flood');
                            props.updateLayer(toActivate);
                        }}
                    />
                    <BottomNavigationAction label="Evacuation" icon={<FavoriteIcon />} />
                    <BottomNavigationAction 
                        label="Accessibility" 
                        icon={<LocalHospitalIcon />} 

                        onClick={() => {
                            const toActivate = `${city}_accessibility`;
                            props.updateLayerType('accessibility');
                            props.updateLayer(toActivate);
                        }}
                    />
                    <BottomNavigationAction 
                        label="Land Elevation" 
                        icon={<FilterHdrIcon />} 

                        onClick={() => {
                            var toActivate = '';
                            if(city === "l_pasig") {
                                toActivate = 'l_pasig_elevation';
                            } else if (city === "l_manila") {
                                toActivate = 'l_manila_elevation';
                            } else if (city === "l_marikina") {
                                toActivate = 'l_marikina_elevation';
                            }
                            props.updateLayerType('elevation');
                            props.updateLayer(toActivate);
                        }}
                    />
                    <BottomNavigationAction label="Land Use" icon={<HouseSidingIcon />} />
                    <BottomNavigationAction label="Population" icon={<PeopleIcon />} />
                    <BottomNavigationAction label="Adjust Weights" icon={<EqualizerIcon />} />
                    <BottomNavigationAction label="Recommender" icon={<BuildIcon />} />
                </BottomNavigation>
            </Paper>
        </Card>
        </div>
    )
}

export default Sidebar
