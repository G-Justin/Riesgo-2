import mapboxgl from 'mapbox-gl';
import React, { Component } from 'react'
import PropTypes from 'prop-types'

mapboxgl.accessToken = 'pk.eyJ1IjoiamRhcnZpbiIsImEiOiJja3Y5a3lhN3EyZmIyMnVubnk0cXF3MWF2In0.oIcZ8fwDPMESBa-3qhx07w';

export default class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lat: 14.577,
            lng: 121,
            zoom: 11.16,
            pitch: 60,
            bearing: 0.13,
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
          pitch: 60,
          bearing: 0.13
        });

        this.map.addControl(new mapboxgl.NavigationControl(), 'top-right');

        this.map.on('style.load', () => {
            //Layers Visualization
            // const layers = [
            //     'No Risk',
            //     'Low Risk',
            //     'Medium Risk',
            //     'High Risk',
            //   ];
            //   const colors = [
            //     '#fcfbab',
            //     '#f6684c',
            //     '#9d1e69',
            //     '#300061',
            //   ];

            // const legend = document.getElementById('legend');

            // layers.forEach((layer, i) => {
            //     const color = colors[i];
            //     const item = document.createElement('div');
            //     const key = document.createElement('span');
            //     key.className = 'legend-key';
            //     key.style.backgroundColor = color;
              
            //     const value = document.createElement('span');
            //     value.innerHTML = `${layer}`;
            //     item.appendChild(key);
            //     item.appendChild(value);
            //     legend.appendChild(item);
            // });

            //MARIKINA

            //Marikina Dataset - Flooding
            this.map.addSource('marikina-data', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckvqcdvn412hf28qnodby4baw-29fzo',
            });

            this.map.addLayer({
                id: 'marikina',
                type: 'fill-extrusion',
                source: 'marikina-data',
                'source-layer': 'marikina_data_test',
                layout: {
                    visibility: 'none'
                },
                paint: {
                'fill-extrusion-color': {
                    property: 'flood_5yr',
                    stops: [
                        [0, '#300061'],
                        [0.33, '#9d1e69'],
                        [0.66, '#f6684c'],
                        [1, '#fcfbab'],
                    ],
                },
                'fill-extrusion-height': ['*', 500, ['number', ['get', 'flood_5yr'], 1]],
                'fill-extrusion-opacity': 0.75,
                'fill-extrusion-opacity-transition': {
                    duration: 800,
                    delay: 0,
                },
                },
            });

            //PASIG

            //Pasig Dataset - Land Elevation
            this.map.addSource('pasig-elevation', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckvukhftv2sy420l4byfi5pem-9hq3c',
            });

            //Pasig Dataset - Flood
            this.map.addSource('pasig-flood-5yr', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckvukj51q1rtv28p63zxroh1q-841yj',
            });

            //Pasig Layer Inits
            this.map.addLayer({
                id: 'l_pasig_elev',
                type: 'fill-extrusion',
                source: 'pasig-elevation',
                'source-layer': 'pasig_elevation',
                layout: {
                    visibility: 'none',
                },
                paint: {
                'fill-extrusion-color': {
                    property: 'elevation',
                    stops: [
                        [0, '#d4fde4'],
                        [0.125, '#aae6bc'],
                        [0.250, '#80ce95'],
                        [0.375, '#69c180'],
                        [0.5, '#50b469'],
                        [0.625, '#35a54f'],
                        [0.750, '#279d41'],
                        [0.875, '#1c9637'],
                        [1, '#0a8c26'],
                    ],
                },
                'fill-extrusion-height': ['*', 750, ['number', ['get', 'elevation'], 1]],
                'fill-extrusion-opacity': 0,
                'fill-extrusion-opacity-transition': {
                    duration: 400,
                    delay: 0,
                },
                },
            });

            this.map.addLayer({
                id: 'l_pasig_flood',
                type: 'fill-extrusion',
                source: 'pasig-flood-5yr',
                'source-layer': 'pasig_flood_5yr',
                layout: {
                    visibility: 'visible',
                },
                paint: {
                'fill-extrusion-color': {
                    property: 'flood_5yr',
                    stops: [
                        [0, '#300061'],
                        [0.33, '#9d1e69'],
                        [0.66, '#f6684c'],
                        [1, '#fcfbab'],
                    ],
                },
                'fill-extrusion-height': ['*', 150, ['number', ['get', 'flood_5yr'], 1]],
                'fill-extrusion-opacity': 0.75,

                'fill-extrusion-opacity-transition': {
                    duration: 400,
                    delay: 0,
                },
                },
            });
        });
    }

    componentWillUpdate(nextProps) {
        const {
            layer
        } = this.props;

        //If layer change detected
        if(nextProps.layer !== layer) {
            this.map.setLayoutProperty(
                layer,
                'visibility',
                'none'
            );
            console.log("Disabled " + layer);

            this.map.setLayoutProperty(
                nextProps.layer,
                'visibility',
                'visible'
            );
            console.log("Enabled " + nextProps.layer);
            
            this.map.setPaintProperty(layer, 'fill-extrusion-opacity', 0);
            this.map.setPaintProperty(nextProps.layer, 'fill-extrusion-opacity', 0.75);
        }

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

Map.propTypes = {
    layer: PropTypes.string.isRequired
}

