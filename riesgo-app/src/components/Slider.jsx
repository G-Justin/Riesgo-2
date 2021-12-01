import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

//Icons

export default function DiscreteSlider() {
  return (
    <Box>

    <Typography gutterBottom>
    Forest
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
    Cementary
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