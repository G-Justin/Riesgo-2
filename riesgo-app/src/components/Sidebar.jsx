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

//Misc
import Divider from '@mui/material/Divider';


//Select
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

import Select from '@mui/material/Select';

import React from "react";
import {ReactComponent as LogoSvg} from '../assets/riesgo-logo-small.svg';

const Sidebar = (props) => {
    const [city, setCity] = React.useState(0);
    const [value, setValue] = React.useState(0);
    const [layer, setLayer] = React.useState(0);

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

        if(layerName === "Flood") {
            return "Flood Map"
        } else if (layerName === "Elevation") {
            return "Land Elevation"
        } else if (layerName === "Accessibility") {
            return "Area Accessibility"
        } else {
            return "Welcome to RIESGO!"
        }
    }

    function LayerDetails(props) {
        const layerName = props.layerName;

        if(layerName === "Flood") {
            return "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,"
        } else if (layerName === "Elevation") {
            return "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids"
        } else if (layerName === "Accessibility") {
            return "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum"
        }

        return "Select a map to view details."
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
                            const toActivate = `${city}_flood`;

                            setLayer('Flood');
                            props.updateLayerType('flood');
                            props.updateLayer(toActivate);
                        }}
                    />
                    <BottomNavigationAction label="Evacuation" icon={<FavoriteIcon />} />
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
                        }}
                    />
                    <BottomNavigationAction label="Land Use" icon={<HouseSidingIcon />} />
                    <BottomNavigationAction label="Population" icon={<PeopleIcon />} />
                    <BottomNavigationAction label="Adjust Weights" icon={<EqualizerIcon />} />
                    <BottomNavigationAction label="Recommender" icon={<BuildIcon />} />
                </BottomNavigation>
            </Paper>
        </Card>

        <Card sx={{ width: 340, position: "absolute", margin: 2, right: 40 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    <LayerName layerName={layer} />
                </Typography>
                <Divider sx={{marginTop: 1, marginBottom: 1}}/>
                <Typography variant="body2">
                    <LayerDetails  layerName={layer} />
                </Typography>
                
                
            </CardContent>
        </Card>
        </div>
    )
}

export default Sidebar
