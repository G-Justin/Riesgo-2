import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

//Icons

export default function DiscreteSlider() {
  return (
    <Box style={{maxHeight: '200px', overflow: 'auto'}}>

    <Typography gutterBottom>
    <b>Retail</b>
    </Typography>

    <Grid container spacing={2} alignItems="center">
        <Grid item>
          0
        </Grid>

        <Grid item xs>
            <Slider 
                defaultValue={0.5} 
                aria-label="Default" 
                valueLabelDisplay="auto" 
                step={0.05}
                min={0}
                max={1}
                />
        </Grid>

        <Grid item>
            1
        </Grid>
    </Grid>

    <Typography gutterBottom>
    <b>Park</b>
    </Typography>

    <Grid container spacing={2} alignItems="center">
        <Grid item>
          0
        </Grid>

        <Grid item xs>
            <Slider 
                defaultValue={0.5} 
                aria-label="Default" 
                valueLabelDisplay="auto" 
                step={0.05}
                min={0}
                max={1}
                />
        </Grid>

        <Grid item>
            1
        </Grid>
    </Grid>

    <Typography gutterBottom>
    <b>Grass</b>
    </Typography>

    <Grid container spacing={2} alignItems="center">
        <Grid item>
          0
        </Grid>

        <Grid item xs>
            <Slider 
                defaultValue={0.5} 
                aria-label="Default" 
                valueLabelDisplay="auto" 
                step={0.05}
                min={0}
                max={1}
                />
        </Grid>

        <Grid item>
            1
        </Grid>
    </Grid>

    <Typography gutterBottom>
    <b>Cemetery</b>
    </Typography>

    <Grid container spacing={2} alignItems="center">
        <Grid item>
          0
        </Grid>

        <Grid item xs>
            <Slider 
                defaultValue={0.5} 
                aria-label="Default" 
                valueLabelDisplay="auto" 
                step={0.05}
                min={0}
                max={1}
                />
        </Grid>

        <Grid item>
            1
        </Grid>
    </Grid>

    <Typography gutterBottom>
    <b>Industrial</b>
    </Typography>

    <Grid container spacing={2} alignItems="center">
        <Grid item>
          0
        </Grid>

        <Grid item xs>
            <Slider 
                defaultValue={0.5} 
                aria-label="Default" 
                valueLabelDisplay="auto" 
                step={0.05}
                min={0}
                max={1}
                />
        </Grid>

        <Grid item>
            1
        </Grid>
    </Grid>

    <Typography gutterBottom>
    <b>Commercial</b>
    </Typography>

    <Grid container spacing={2} alignItems="center">
        <Grid item>
          0
        </Grid>

        <Grid item xs>
            <Slider 
                defaultValue={0.5} 
                aria-label="Default" 
                valueLabelDisplay="auto" 
                step={0.05}
                min={0}
                max={1}
                />
        </Grid>

        <Grid item>
            1
        </Grid>
    </Grid>

    <Typography gutterBottom>
    <b>Residential</b>
    </Typography>

    <Grid container spacing={2} alignItems="center">
        <Grid item>
          0
        </Grid>

        <Grid item xs>
            <Slider 
                defaultValue={0.5} 
                aria-label="Default" 
                valueLabelDisplay="auto" 
                step={0.05}
                min={0}
                max={1}
                />
        </Grid>

        <Grid item>
            1
        </Grid>
    </Grid>

    <Button variant="contained" sx={{width: "100%"}} >Apply Weights</Button>

    </Box>
  );
}