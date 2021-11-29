import React from 'react'

import { Typography } from '@mui/material'
//import { Paper } from '@mui/material'
import { Button } from '@mui/material'
import { Grid } from '@mui/material'
import { Container } from '@mui/material'

import { AppBar } from '@mui/material'
import { Box } from '@mui/material'
import { Toolbar } from '@mui/material'

//import { ThemeProvider, createTheme } from '@mui/material/styles'

import { Link } from 'react-router-dom'

//import Background from '../assets/background.jpg'
import {ReactComponent as LogoSvg} from '../assets/riesgo-logo-small.svg';

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
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '100vh' }}>
                    <Grid item xs={12} sm={12} md={12}>
                        <Typography variant="h3" component="div" style={{ fontWeight: 'bold'}}>
                            Assessment Companion for LGUs
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <Typography variant="h6" component="div" align="center">
                            A decision support tool that uses aggregated hazard data to aid local governments units for evacuation center construction evaluation.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <Button variant="contained" color="primary">
                            <Link to="map" style={{color:"white",textDecoration:"none"}}>
                                Go to Map
                            </Link>
                        </Button>
                    </Grid>
                </Grid>
            </Container>
            </div>
      );
}

export default Welcome