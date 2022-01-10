import React from 'react'

import { Typography } from '@mui/material'
import { Grid } from '@mui/material'
import { Container } from '@mui/material'

//Accordion
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
    
function FAQ(){
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };
    return(
        <div>
            <Container>
                <Grid container
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    style={{marginTop: '88px', marginBottom: '72px'}}>
                    <Grid item xs={12} sm={12} md={12}>
                        <Typography
                            variant="h4"
                            align="center"
                            style={{fontWeight: 'bold'}}>
                            Questions? Look here.
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            align="center">
                            Can't find an answer? Contact us at placeholder@gmail.com!
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        <Container>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary
                expandIcon={expanded === 'panel1'?<RemoveCircleOutlineIcon />:<AddCircleOutlineIcon/>}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
            >
            <Typography
                style={{fontWeight:'bold'}}>
                What did you use to develop the website?</Typography>
            </AccordionSummary>
        <AccordionDetails>
          <Typography>
            The website application was built using Python and utilized libraries such as ReactJS and Material.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
                expandIcon={expanded === 'panel2'?<RemoveCircleOutlineIcon />:<AddCircleOutlineIcon/>}
                aria-controls="panel2bh-content"
                id="panel2bh-header"
        >
          <Typography
            style={{fontWeight:'bold'}}>
                Sample Question?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Sample Answer
          </Typography>
        </AccordionDetails>
      </Accordion>
      </Container>
        </div>
    );
}

export default FAQ