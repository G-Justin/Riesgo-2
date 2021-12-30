import mapboxgl from 'mapbox-gl';
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import 'mapbox-gl/dist/mapbox-gl.css';

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

mapboxgl.accessToken = 'pk.eyJ1IjoiamRhcnZpbiIsImEiOiJja3Y5a3lhN3EyZmIyMnVubnk0cXF3MWF2In0.oIcZ8fwDPMESBa-3qhx07w';

export default class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lat: 14.577,
            lng: 121,
            zoom: 11.16,
            //pitch: 60,
            bearing: 0.13,
        };
    }

    componentDidMount() {
        const {
          lng, lat, zoom
        } = this.state;
    
        this.tooltipContainer = document.createElement('div'); // eslint-disable-line
    
        const bounds = [
            [120.83910868840256, 14.417858756589494], // Southwest coordinates
            [121.23000694767939, 14.772673954833158] // Northeast coordinates
        ];

        this.map = new mapboxgl.Map({
          container: this.mapContainer,
          style: 'mapbox://styles/jdarvin/ckv9lbninanro15pap69jm3rz',
          center: [lng, lat],
          zoom,
          maxBounds: bounds,

          maxZoom: 15,
          
          //pitch: 60,
          maxPitch: 60,
          
          bearing: 0.13
        });

        this.map.addControl(new mapboxgl.NavigationControl(), 'top-right');
        
        this.map.on('style.load', () => {
            //MARIKINA ==================================================================================
            //Marikina Dataset - Land Elevation
            this.map.addSource('marikina-elevation', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckvwn7fnz0vr920mtehdcswos-5mog7',
            });

            //Marikina Dataset - Flood
            this.map.addSource('marikina-flood-5yr', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckvwn9xfe08rj27mh6imu5voh-6d3nm',
            });

            //Marikina Dataset - Accesibility
            this.map.addSource('marikina-accessibility', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckvx9noo000cm27msl6bx6kmf-3zf7c',
            });

            //Marikina Dataset - Hazard
            this.map.addSource('marikina-hazard-5yr', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckwbom3cs01no20lt2yp1pjm1-6cfhe',
            });

            //Marikina Dataset - Land Use (FAKE)
            this.map.addSource('fake-marikina-land-use', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckwqdmyyy0ql924pfweq7ptc6-2a6zr',
            });

            //Marikina Dataset - Sustainability (FAKE)
            this.map.addSource('fake-marikina-sustainability-5yr', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckwqdjusr0tvs28s10h3pbotb-2z5rw',
            });


            //PASIG ==================================================================================
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

            //Pasig Dataset - Accesibility
            this.map.addSource('pasig-accessibility', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckvx9pskx3fui28l4rq0jpdpl-09kki',
            });

            //Pasig Dataset - Hazard
            this.map.addSource('pasig-hazard-5yr', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckwbomoug0lw728mxgl81joqf-5cf3u',
            });

            // MARIKINA INITS ==================================================================================

            //Marikina Layer Inits
            this.map.addLayer({
                id: 'l_marikina_elevation',
                type: 'fill-extrusion',
                source: 'marikina-elevation',
                'source-layer': 'marikina_elevation',
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
                id: 'l_marikina_accessibility',
                type: 'fill-extrusion',
                source: 'marikina-accessibility',
                'source-layer': 'marikina_accessibility',
                layout: {
                    visibility: 'none',
                },
                paint: {
                'fill-extrusion-color': {
                    property: 'accessibility',
                    stops: [
                        [0, '#FFF0F3'],
                        [0.125, '#FFCCD5'],
                        [0.250, '#FF8FA3'],
                        [0.375, '#FF4D6D'],
                        [0.5, '#C9184A'],
                        [0.625, '#A4133C'],
                        [0.750, '#800F2F'],
                        [0.875, '#590D22'],
                        [1, '#800F2F'],
                    ],
                },
                'fill-extrusion-height': ['*', 750, ['number', ['get', 'accessibility'], 1]],
                'fill-extrusion-opacity': 0,
                'fill-extrusion-opacity-transition': {
                    duration: 400,
                    delay: 0,
                },
                },
            });

            this.map.addLayer({
                id: 'l_marikina_flood',
                type: 'fill-extrusion',
                source: 'marikina-flood-5yr',
                'source-layer': 'marikina_flood_5yr',
                layout: {
                    visibility: 'none',
                },
                paint: {
                'fill-extrusion-color': {
                    property: 'flood_5yr',
                    stops: [
                        [0, '#06106b'],
                        [0.33, '#3741a1'],
                        [0.66, '#727ded'],
                        [1, '#cfd3ff'],
                    ],
                },
                'fill-extrusion-height': ['*', 150, ['number', ['get', 'flood_5yr'], 1]],
                'fill-extrusion-opacity': 0,

                'fill-extrusion-opacity-transition': {
                    duration: 400,
                    delay: 0,
                },
                },
            });

            this.map.addLayer({
                id: 'l_marikina_hazard',
                type: 'fill-extrusion',
                source: 'marikina-hazard-5yr',
                'source-layer': 'marikina_hazard_5yr',
                layout: {
                    visibility: 'none',
                },
                paint: {
                'fill-extrusion-color': {
                    property: 'hazard_5yr',
                    stops: [
                        [0, '#300061'],
                        [0.33, '#9d1e69'],
                        [0.66, '#f6684c'],
                        [1, '#fcfbab'],
                    ],
                },
                'fill-extrusion-height': ['*', 150, ['number', ['get', 'hazard_5yr'], 1]],
                'fill-extrusion-opacity': 0,

                'fill-extrusion-opacity-transition': {
                    duration: 400,
                    delay: 0,
                },
                },
            });

            this.map.addLayer({
                id: 'l_marikina_landuse',
                type: 'fill-extrusion',
                source: 'fake-marikina-land-use',
                'source-layer': 'fake_marikina_land_use',
                layout: {
                    visibility: 'none',
                },
                paint: {
                'fill-extrusion-color': {
                    property: 'land_use',
                    stops: [
                        [0, '#fff9d9'],
                        [0.33, '#fff3b3'],
                        [0.66, '#ffe973'],
                        [1, '#ffdd26'],
                    ],
                },
                'fill-extrusion-height': ['*', 150, ['number', ['get', 'land_use'], 1]],
                'fill-extrusion-opacity': 0,

                'fill-extrusion-opacity-transition': {
                    duration: 400,
                    delay: 0,
                },
                },
            });

            this.map.addLayer({
                id: 'l_marikina_sustainability',
                type: 'fill-extrusion',
                source: 'fake-marikina-sustainability-5yr',
                'source-layer': 'fake_marikina_sustainability_5yr',
                layout: {
                    visibility: 'none',
                },
                paint: {
                'fill-extrusion-color': {
                    property: 'sustainability_5yr',
                    stops: [
                        [0, '#ff3d3d'],
                        [0.33, '#e0762f'],
                        [0.66, '#d4e02f'],
                        [1, '#2fe02f'],
                    ],
                },
                'fill-extrusion-height': ['*', 150, ['number', ['get', 'sustainability_5yr'], 1]],
                'fill-extrusion-opacity': 0,

                'fill-extrusion-opacity-transition': {
                    duration: 400,
                    delay: 0,
                },
                },
            });

            // PASIG INITS ==================================================================================

            //Pasig Layer Inits
            this.map.addLayer({
                id: 'l_pasig_elevation',
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
                id: 'l_pasig_accessibility',
                type: 'fill-extrusion',
                source: 'pasig-accessibility',
                'source-layer': 'pasig_accessibility',
                layout: {
                    visibility: 'none',
                },
                paint: {
                'fill-extrusion-color': {
                    property: 'accessibility',
                    stops: [
                        [0, '#FFF0F3'],
                        [0.125, '#FFCCD5'],
                        [0.250, '#FF8FA3'],
                        [0.375, '#FF4D6D'],
                        [0.5, '#C9184A'],
                        [0.625, '#A4133C'],
                        [0.750, '#800F2F'],
                        [0.875, '#590D22'],
                        [1, '#800F2F'],
                    ],
                },
                'fill-extrusion-height': ['*', 750, ['number', ['get', 'accessibility'], 1]],
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
                    visibility: 'none',
                },
                paint: {
                'fill-extrusion-color': {
                    property: 'flood_5yr',
                    stops: [
                        [0, '#06106b'],
                        [0.33, '#3741a1'],
                        [0.66, '#727ded'],
                        [1, '#cfd3ff'],
                    ],
                },
                'fill-extrusion-height': ['*', 150, ['number', ['get', 'flood_5yr'], 1]],
                'fill-extrusion-opacity': 0,

                'fill-extrusion-opacity-transition': {
                    duration: 400,
                    delay: 0,
                },
                },
            });

            this.map.addLayer({
                id: 'l_pasig_hazard',
                type: 'fill-extrusion',
                source: 'pasig-hazard-5yr',
                'source-layer': 'pasig_hazard_5yr',
                layout: {
                    visibility: 'none',
                },
                paint: {
                'fill-extrusion-color': {
                    property: 'hazard_5yr',
                    stops: [
                        [0, '#300061'],
                        [0.33, '#9d1e69'],
                        [0.66, '#f6684c'],
                        [1, '#fcfbab'],
                    ],
                },
                'fill-extrusion-height': ['*', 150, ['number', ['get', 'hazard_5yr'], 1]],
                'fill-extrusion-opacity': 0,

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
            layer,
            city,
            layer_type
        } = this.props;

        //If layer change detected
        if(nextProps.layer !== layer) {
            this.map.setLayoutProperty(
                layer,
                'visibility',
                'none'
            );
            //console.log("Disabled " + layer);

            this.map.setLayoutProperty(
                nextProps.layer,
                'visibility',
                'visible'
            );
            //console.log("Enabled " + nextProps.layer);
            
            this.map.setPaintProperty(layer, 'fill-extrusion-opacity', 0);
            this.map.setPaintProperty(nextProps.layer, 'fill-extrusion-opacity', 0.75);

            console.log(nextProps.layer_type)
        }
        //Refresh layer if city changed
        if(nextProps.city !== city) {
            this.map.setLayoutProperty(
                layer,
                'visibility',
                'none'
            );
            console.log("Disabled " + layer);

            this.map.setLayoutProperty(
                `${nextProps.city}_${layer_type}`,
                'visibility',
                'visible'
            );
            console.log(`Enabled ${nextProps.city}_${layer_type}`);
            
            this.props.updateLayer(`${nextProps.city}_${layer_type}`);

            this.map.setPaintProperty(layer, 'fill-extrusion-opacity', 0);
            this.map.setPaintProperty(`${nextProps.city}_${layer_type}`, 'fill-extrusion-opacity', 0.75);
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

