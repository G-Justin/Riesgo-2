import React from 'react'

// import { Typography } from '@mui/material'
// //import { Paper } from '@mui/material'
// import { Button, CardActionArea } from '@mui/material';
// import { Grid } from '@mui/material'
// import { Container } from '@mui/material'

// import { AppBar } from '@mui/material'
// import { Box } from '@mui/material'
// import { Toolbar } from '@mui/material'

// //Card
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';

//import { ThemeProvider, createTheme } from '@mui/material/styles'

import { Link } from 'react-router-dom'

//import Background from '../assets/background.jpg'
import {ReactComponent as LogoSvg} from '../assets/riesgo-logo-small.svg';
// import ExploreImage from "../assets/explore.PNG"
// import ModelImage   from "../assets/model.PNG"
// import FaqImage     from "../assets/faq.PNG"

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
        <header>
            <div className="logo">
                <LogoSvg />
            </div>
            <div className="btn-faq">
                <button>
                    FAQ
                </button>
            </div>
        </header>
        <section className="body-section">
            <div className="container-body">
                <div className="content-body">
                    <div className="left-side">
                        <h1>
                            An Evacuation Center Suitability Tool <hr />
                        </h1> 
                        <p>
                            An interactive Metro Manila Map for flood visualization and urban planning created as a 
                            companion web application for urban planners, local government units, architects, and engineers.
                            <br></br>
                        </p>
                        <div> 
                        <button className="btn-grad">
                            <Link to="map" style={{color:"white",textDecoration:"none"}}>
                                Start RIESGO
                            </Link>
                        </button>
                        </div>
                    </div>
                    <div className="right-side">
                        <img src='right.png' alt='' width='90%'/>
                    </div>
                </div>
            </div>
        </section>
        <footer>
            <div className="footer">
                <div>
                <h5>
                    RIESGO v0.8 by Darvin, Galura & Gelvoleo
                </h5>
                </div>
            </div>
        </footer>
        </div>
        // <div>
        //     <Box sx={{ flexGrow: 1 }}>
        //         <AppBar elevation={0} style={{ background: 'transparent' }}>
        //             <Toolbar>
        //                 <LogoSvg />
        //             </Toolbar>
        //                                  <div>
        //                     FAQ
        //                 </div>
        //         </AppBar>
        //     </Box>

        //     <Container>
        //         <Grid container
        //         spacing={3}
        //         direction="column"
        //         alignItems="center"
        //         justifyContent="center"
        //         style={{ minHeight: '60vh', paddingTop: '80px'}}>
        //             <Grid item xs={12} sm={12} md={12}>
        //                 <Typography variant="h2" component="div" align="center" style={{ fontWeight: 'bold'}}>
        //                     An Interactive Metro Manila Map<br/> for Flood Visualization and Urban Planning
        //                 </Typography>
        //             </Grid>
        //             <Grid item xs={12} sm={12} md={12}>
        //                 <Typography variant="h5" component="div" align="center">
        //                     An analytical decision support tool for the better <br/> placement and urban planning of evacuation centers.
        //                 </Typography>
        //             </Grid>
        //             <Grid item xs={12} sm={12} md={12}>
        //                 <Button 
        //                 style={{
        //                     background: 'linear-gradient(to right, #36D1DC 0%, #5B86E5  51%, #36D1DC  100%)',
        //                     margin: '10px',
        //                     padding: '10px 45px',
        //                     textAlign: 'center',
        //                     textTransform: 'uppercase',
        //                     transition: '0.5s',
        //                     backgroundSize: '200% auto',
        //                     color: 'white',            
        //                     boxShadow: '0 0 20px #eee',
        //                     borderRadius: '40px',
        //                 }}>
        //                     <Link to="map" style={{color:"white",textDecoration:"none", padding:5}}>
        //                         <Typography variant="h6">Start RIESGO</Typography>
        //                     </Link>
        //                 </Button>
        //             </Grid>
        //         </Grid>
        //         <Grid 
        //         container 
        //         alignItems="center" 
        //         justifyContent="center" 
        //         display="flex" 
        //         style={{paddingTop: '16px', marginBottom: '32px'}}>
                
        //         <Grid item xs={4} >
        //             <Card sx={{width: 350, height: 288}}>
        //                 <CardActionArea>
        //                     <CardMedia
        //                     component="img"
        //                     height="140"
        //                     image={ExploreImage}
        //                     alt="explore"
        //                     />
        //                     <CardContent>
        //                     <Typography gutterBottom variant="h5" component="div" textAlign="center">
        //                         <b>Explore Data</b>
        //                     </Typography>
        //                     <Typography variant="body2" color="text.secondary">
        //                         Check out the current data sets used to analyze the suitability of any locations 
        //                         within Metro Manila.
        //                     </Typography>
        //                     </CardContent>
        //                 </CardActionArea>
        //             </Card>
        //         </Grid>

                
        //         <Grid item xs={4} >
        //         <Link to="/FAQ" style={{ textDecoration: 'none' }}>
        //             <Card sx={{width: 350, height: 320}}>
        //                 <CardActionArea>
        //                     <CardMedia
        //                     component="img"
        //                     height="140"
        //                     image={FaqImage}
        //                     alt="green iguana"
        //                     />
        //                     <CardContent>
        //                     <Typography gutterBottom variant="h5" component="div" textAlign="center">
        //                         <b>FAQ</b>
        //                     </Typography>
        //                     <Typography variant="body2" color="text.secondary">
        //                         Need some help understanding our website? Browse through our FAQ page to find answers on commonly asked questions
        //                         on how RIESGO was developed and how you can utilize it to aid your urban planning decisions.
        //                     </Typography>
        //                     </CardContent>
        //                 </CardActionArea>
        //             </Card>
        //         </Link>
        //         </Grid>
                

        //         <Grid item xs={4} >
        //             <Card sx={{width: 350, height: 288}}>
        //                 <CardActionArea>
        //                     <CardMedia
        //                     component="img"
        //                     height="140"
        //                     image={ModelImage}
        //                     alt="green iguana"
        //                     />
        //                     <CardContent>
        //                     <Typography gutterBottom variant="h5" component="div" textAlign="center">
        //                         <b>Model</b>
        //                     </Typography>
        //                     <Typography variant="body2" color="text.secondary">
        //                         Presenting the equations the developers use to arrive on the suitability score of
        //                         an area. These equations are integral to aid urban planners on their decision making process.
        //                     </Typography>
        //                     </CardContent>
        //                 </CardActionArea>
        //             </Card>
        //         </Grid>
        //         </Grid>

        //         <Typography variant="body2"><b>RIESGO</b> v0.8 by Darvin, Galura & Gelvoleo</Typography>
        //     </Container>
        // </div>
      );
}

export default Welcome