import mapboxgl from 'mapbox-gl';
import React, { Component } from 'react'

mapboxgl.accessToken = 'pk.eyJ1IjoiamRhcnZpbiIsImEiOiJja3Y5a3lhN3EyZmIyMnVubnk0cXF3MWF2In0.oIcZ8fwDPMESBa-3qhx07w';

export default class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lat: 14.577,
            lng: 121,
            zoom: 11.16,
        };
    }

    componentDidMount() {
        const {
          lng, lat, zoom
        } = this.state;
    
        this.tooltipContainer = document.createElement('div'); // eslint-disable-line
    
        this.map = new mapboxgl.Map({
          container: this.mapContainer,
          style: 'mapbox://styles/jdarvin/ckv9lbninanro15pap69jm3rz',
          center: [lng, lat],
          zoom,
          minZoom: 11,
          maxZoom: 15,
        });
    }

    render() {
        const mapStyle = {
            position: 'fixed',
            width: '100%',
            top: 0,
            bottom: 0,
            zIndex:-1
        };

        return (
            <div>
                <div style={mapStyle} ref={(el) => { this.mapContainer = el; }} />
            </div>
        )
    }
}

