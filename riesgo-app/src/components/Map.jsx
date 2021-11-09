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
            const layers = [
                'No Risk',
                'Low Risk',
                'Medium Risk',
                'High Risk',
              ];
              const colors = [
                '#fcfbab',
                '#f6684c',
                '#9d1e69',
                '#300061',
              ];

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

            //Marikina Dataset
            this.map.addSource('landelevation', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckvqcdvn412hf28qnodby4baw-29fzo',
            });

            this.map.addLayer({
                id: 'landelevation3d',
                type: 'fill-extrusion',
                source: 'landelevation',
                'source-layer': 'marikina_data_test',
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
        });
    }

    componentWillReceiveProps(nextProps) {
        const {
            layer
        } = this.props;

        if(this.map.isStyleLoaded()) {
            if(nextProps.layer) {
                if(nextProps.layer !== layer) {
                    const current = this.map.getLayer(layer);
                    const newlayer = this.map.getLayer(nextProps.layer);

                    if(current !== undefined) {
                        const layerType = current.type;
                        this.map.setPaintProperty(layer, `${layerType}-opacity`, 0);
                    }

                    if(current !== undefined) {
                        const layerType = newlayer.type;
                        this.map.setPaintProperty(nextProps.layer, `${layerType}-opacity`, 0.7);
                    }
                }
            }
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

