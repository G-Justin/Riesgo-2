import React from 'react'

import { Typography } from '@mui/material'
//import { Paper } from '@mui/material'
import { Button, CardActionArea } from '@mui/material';
import { Grid } from '@mui/material'
import { Container } from '@mui/material'

import { AppBar } from '@mui/material'
import { Box } from '@mui/material'
import { Toolbar } from '@mui/material'

//Card
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

//import { ThemeProvider, createTheme } from '@mui/material/styles'

import { Link } from 'react-router-dom'

//import Background from '../assets/background.jpg'
import {ReactComponent as LogoSvg} from '../assets/riesgo-logo-small.svg';
import ExploreImage from "../assets/explore.PNG"
import ModelImage   from "../assets/model.PNG"
import FaqImage     from "../assets/faq.PNG"

// const styles = {
//     paperContainer: {
//         backgroundImage: `url(${Background})`,
//         backgroundPosition: 'center',
//         backgroundRepeat: "no-repeat",
//         backgroundSize: 'cover'
//     }
// };



function Welcome(){
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar>
                    <Toolbar>
                        <LogoSvg />
                    </Toolbar>
                </AppBar>
            </Box>

            <Container>
                <Grid container
                spacing={3}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '66vh'}}>
                    <Grid item xs={12} sm={12} md={12}>
                        <Typography variant="h2" component="div" align="center" style={{ fontWeight: 'bold'}}>
                            A Metro Manila Interactive Map<br/> for Urban Planning
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <Typography variant="h5" component="div" align="center">
                            An analytical decision support tool for the better <br/> placement and urban planning of evacuation centers.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <Button variant="contained" color="primary">
                            <Link to="map" style={{color:"white",textDecoration:"none", padding:5}}>
                                <Typography variant="h6">Start RIESGO</Typography>
                            </Link>
                        </Button>
                    </Grid>
                </Grid>

                <Grid container alignItems="center" justifyContent="center" display="flex">
                
                <Grid item xs={4} >
                    <Card sx={{width: 350, height: 275}}>
                        <CardActionArea>
                            <CardMedia
                            component="img"
                            height="140"
                            image={ExploreImage}
                            alt="explore"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="div" textAlign="center">
                                <b>Explore Data</b>
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                species, ranging across all continents except Antarctica
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>

                <Grid item xs={4} >
                    <Card sx={{width: 350, height: 275}}>
                        <CardActionArea>
                            <CardMedia
                            component="img"
                            height="140"
                            image={FaqImage}
                            alt="green iguana"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="div" textAlign="center">
                                <b>FAQ</b>
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                species, ranging across all continents except Antarctica
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>

                <Grid item xs={4} >
                    <Card sx={{width: 350, height: 275}}>
                        <CardActionArea>
                            <CardMedia
                            component="img"
                            height="140"
                            image={ModelImage}
                            alt="green iguana"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="div" textAlign="center">
                                <b>Model</b>
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                species, ranging across all continents except Antarctica
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>

                </Grid>
            </Container>
        </div>
      );
}

export default Welcome