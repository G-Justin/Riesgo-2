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
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
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

    const handleChange = (event) => {
        setCity(event.target.value);
        props.updateCity(event.target.value);
    };

    const [value, setValue] = React.useState(0);

    return (
        <div>
        <Card sx={{ maxWidth: 340, position: "absolute", margin: 2 }}>
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
                    <MenuItem value={'c_manila'}>Manila</MenuItem>
                    <MenuItem value={'c_marikina'}>Marikina</MenuItem>
                    <MenuItem value={'c_pasig'}>Pasig</MenuItem>
                    </Select>
                </FormControl>
                <Typography variant="h5" component="div">
                <b>{city}</b>
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                City
                </Typography>
                <Typography variant="body2">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
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
                            if(city === "c_pasig") {
                                toActivate = 'l_pasig_flood';
                            } else if (city === "c_manila") {
                                toActivate = 'l_manila_flood';
                            } else if (city === "c_marikina") {
                                toActivate = 'l_marikina_flood';
                            }
                            console.log("Im on " + city)
                            props.updateLayer(toActivate);
                        }}
                    />
                    <BottomNavigationAction label="Evacuation" icon={<FavoriteIcon />} />
                    <BottomNavigationAction label="Hazard Level" icon={<WarningAmberIcon />} />
                    <BottomNavigationAction 
                        label="Land Elevation" 
                        icon={<FilterHdrIcon />} 

                        onClick={() => {
                            var toActivate = '';
                            if(city === "c_pasig") {
                                toActivate = 'l_pasig_elev';
                            } else if (city === "c_manila") {
                                toActivate = 'l_manila_elev';
                            } else if (city === "c_marikina") {
                                toActivate = 'l_marikina_elev';
                            }
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
