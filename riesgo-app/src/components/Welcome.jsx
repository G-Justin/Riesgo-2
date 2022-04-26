import { Typography } from '@mui/material';
import React from 'react'

import { Link } from 'react-router-dom'

import { ReactComponent as LogoSvg } from '../assets/riesgo-logo-small.svg';

function Welcome() {
    return (
        <div>
            <header>
                <div className="logo">
                    <LogoSvg />
                </div>
                {/* <div className="btn-faq">
                    <button>
                        FAQ
                    </button>
                </div> */}
            </header>
            <section className="body-section">
                <div className="container-body">
                    <div className="content-body">
                        <div className="left-side">
                            <h2>RIESGO is...</h2>
                            <h1>
                                An Evacuation Center Suitability Tool 🌧️<hr />
                            </h1>
                            <p>
                                <b>RIESGO</b> is an interactive Metro Manila Map for flood visualization and urban planning created as a
                                companion web application for urban planners, local government units, architects, and engineers.
                                <br></br>
                            </p>
                            <div>
                                <Link to="map" style={{ color: "white", textDecoration: "none" }}>
                                    <button className="btn-grad">
                                        Start RIESGO
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <div className="right-side">
                            <img src='right.png' alt='' width='90%' />
                        </div>
                    </div>
                </div>
                <footer>
                    <div className="footer">
                        <div>
                            <Typography variant='overline'>
                                RIESGO was Developed by Darvin, Galura & Gelvoleo under Dr. Briane Paul Samson
                            </Typography>
                        </div>
                    </div>
                </footer>
            </section>
        </div>
    );
}

export default Welcome