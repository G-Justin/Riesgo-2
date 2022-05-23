import { Typography } from '@mui/material';
import React from 'react'

import { Link } from 'react-router-dom'

import { ReactComponent as LogoSvg } from '../assets/riesgo-logo-small.svg';

function Welcome() {
    return (
        <div>
            <section className="body-section" >
                <div className="container-body">
                    <div className="content-body">
                        <div className="left-side">
                            <LogoSvg />
                            <Typography variant='h1'>
                                An Evacuation Center Suitability Tool.
                            </Typography>
                            <Typography variant='body2'>
                                We're working on building an <b>interactive Metro Manila Map for flood visualization and urban planning</b>.
                                See our paper about it <a href="#">here</a>.
                            </Typography>
                            <br />
                            <div>
                                <Link to="map" style={{ color: "white", textDecoration: "none" }}>
                                    <button className="btn-grad">
                                        BEGIN RIESGO
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <div className="right-side">
                            <img src='right2.png' alt='' style={{width:'40em'}} />
                        </div>
                    </div>
                </div>
                <footer>
                    <div className="footer">
                        <div>
                            <Typography variant='overline'>
                                RIESGO, Developed by Darvin, Galura & Gelvoleo under Dr. Briane Paul Samson | Comet DLSU
                            </Typography>
                        </div>
                    </div>
                </footer>
            </section>
        </div>
    );
}

export default Welcome