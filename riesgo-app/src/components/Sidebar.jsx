import { BottomNavigation } from "@mui/material"
import { BottomNavigationAction } from "@mui/material"
import { Button } from "@mui/material"
import { Card } from "@mui/material"
import { CardActions } from "@mui/material"
import { CardContent } from "@mui/material"
import { Paper } from "@mui/material"
import { Typography } from "@mui/material"

import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Sidebar = () => {
    return (
        <div>
        <Card sx={{ maxWidth: 340, position: "absolute", margin: 2 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Currently Viewing
                </Typography>
                <Typography variant="h5" component="div">
                Marikina
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

            <Paper sx={{ position: 'relative', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation
                    showLabels
                    // value={value}
                    // onChange={(event, newValue) => {
                    //     setValue(newValue);
                    // }}
                    >
                    <BottomNavigationAction label="Flood" icon={<RestoreIcon />} />
                    <BottomNavigationAction label="Evacuation" icon={<FavoriteIcon />} />
                    <BottomNavigationAction label="Hazard Level" icon={<LocationOnIcon />} />
                </BottomNavigation>
            </Paper>
        </Card>
        </div>
    )
}

export default Sidebar
