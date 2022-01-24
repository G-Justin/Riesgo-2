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
            bearing: 0.13,

            //Marker Coordinates
            x: 0, y: 0
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

        //Variables for hovering feature
        var hover_layer;
        console.log(hover_layer); //Warning bypasser. IDK why this exists??

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

        let hoveredStateId = null;

        //Marker & Popup Inits
        const divElement = document.createElement('div');
        const assignBtn = document.createElement('div');
        assignBtn.innerHTML = `<Button class="pBtn" style="margin: 3px; border: none; padding: 10px; width: 100px; font-family: Roboto; background-color: #3fb1ce; color: white; font-size: 12px; border-radius: 20px;"><b>ANALYZE</b></Button>`
        divElement.appendChild(assignBtn);

        const popup = new mapboxgl.Popup({ offset: 25, closeOnMove: true }).setDOMContent(divElement);

        const marker = new mapboxgl.Marker({
            draggable: true
        })
            .setLngLat([121.03693378520076, 14.587247918399061])
            .setPopup(popup)
            .addTo(this.map);
        
        // assignBtn.addEventListener('click', (e) => {
        //     alert(marker.getLngLat());
        // });

        function onDragEnd() {
            marker.togglePopup(popup);
            //const lngLat = marker.getLngLat();
            //divElement.innerHTML = `Longitude: ${lngLat.lng}<br />Latitude: ${lngLat.lat}`;
            //console.log(`Longitude: ${lngLat.lng}<br />Latitude: ${lngLat.lat}`);
        }

        function recordPos(event) {
            event = window.event || event;
            //console.log(`Mouse X: ${event.clientX}, Mouse Y: ${event.clientY}`);
            this.setState({ x: event.clientX, y: event.clientY });
            console.log(`Mouse X: ${this.state.x}, Mouse Y: ${this.state.y}`);
        }

        marker.on('dragend', onDragEnd);

        popup.on('open', recordPos.bind(this));

        //Buttons
        class PitchToggle {
            constructor({ bearing = 0, pitch = 45, minpitchzoom = null }) {
              this._bearing = bearing;
              this._pitch = pitch;
              this._minpitchzoom = minpitchzoom;
            }
          
            onAdd(map) {
              this._map = map;
              let _this = this;
          
              this._btn = document.createElement("button");
              this._btn.className = "mapboxgl-ctrl-icon mapboxgl-ctrl-pitchtoggle-3d";
              this._btn.type = "button";
              this._btn["aria-label"] = "Toggle Pitch";
              this._btn.onclick = function() {
                if (map.getPitch() === 0) {
                  let options = { pitch: _this._pitch, bearing: _this._bearing };
                  if (_this._minpitchzoom && map.getZoom() > _this._minpitchzoom) {
                    options.zoom = _this._minpitchzoom;
                  }
                  map.easeTo(options);
                  _this._btn.className =
                    "mapboxgl-ctrl-icon mapboxgl-ctrl-pitchtoggle-2d";
                } else {
                  map.easeTo({ pitch: 0, bearing: 0 });
                  _this._btn.className =
                    "mapboxgl-ctrl-icon mapboxgl-ctrl-pitchtoggle-3d";
                }
              };
          
              this._container = document.createElement("div");
              this._container.className = "mapboxgl-ctrl-group mapboxgl-ctrl";
              this._container.appendChild(this._btn);
          
              return this._container;
            }
          
            onRemove() {
              this._container.parentNode.removeChild(this._container);
              this._map = undefined;
            }
        }

        this.map.addControl(new PitchToggle({ minpitchzoom: 11 }), "top-right");
        this.map.addControl(new mapboxgl.NavigationControl(), 'top-right');

        this.map.on('style.load', () => {
            //MARIKINA ==================================================================================
            //Marikina Dataset - Land Elevation
            this.map.addSource('marikina-elevation', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckys9udle3ksy22pc4kms5tw9-7r0ki',
            });

            //Marikina Dataset - Flood
            this.map.addSource('marikina-flood-5yr', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckvwn9xfe08rj27mh6imu5voh-6d3nm',
            });

            this.map.addSource('marikina-flood-25yr', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckydvd9jo1r7j28lc3xbpf4yi-7hlgt',
            });

            this.map.addSource('marikina-flood-100yr', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckydvi6585f9l20pd9xzdf5va-7e9nx',
            });

            //Marikina Dataset - Accessibility
            this.map.addSource('marikina-accessibility-5yr', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckyr02q790s9p27mmb1r1bld8-0quh4',
            });

            this.map.addSource('marikina-accessibility-25yr', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckyr0465h38gp21nlbqethg9d-53io2',
            });

            this.map.addSource('marikina-accessibility-100yr', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckyr05lue1mb020l9krvvlkbt-4ilbw',
            });

            //Marikina Dataset - Hazard
            this.map.addSource('marikina-hazard-5yr', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckwbom3cs01no20lt2yp1pjm1-6cfhe',
            });

            this.map.addSource('marikina-hazard-25yr', {
                type: 'vector',
                url: 'mapbox://jdarvin.cky9m9rqy2ein23o8nl3wa3d4-7er72',
            });

            
            this.map.addSource('marikina-hazard-100yr', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckyd2ul0g00d821rv0uoe5ku3-8jsqf',
            });


            //Marikina Dataset - Coverage
            this.map.addSource('marikina-coverage-score', {
                type: 'vector',
                url: 'mapbox://jdarvin.cky9ka8pz08x427s1lbi28iis-7rog5',
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

            //Marikina Dataset - Complete
            this.map.addSource('marikina-complete', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckyspqham1q9u28ofs0lnpz96-6nduq',
            });

            //PASIG ==================================================================================
            //Pasig Dataset - Land Elevation
            this.map.addSource('pasig-elevation', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckysan4cs3nk629pc085m4n7p-49wf1',
            });

            //Pasig Dataset - Flood
            this.map.addSource('pasig-flood-5yr', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckyr2wzd28f5q21podjpe8xuf-4qoa8',
            });

            this.map.addSource('pasig-flood-25yr', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckyr2zqdea63f21pc7rpvrrk5-1lr4a',
            });

            this.map.addSource('pasig-flood-100yr', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckyr36n3b19cg26mxupqdsizb-3lb5u',
            });


            //Pasig Dataset - Accesibility
            this.map.addSource('pasig-accessibility-5yr', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckyr39odp1ceu2amsdcj0eap6-752wz',
            });

            this.map.addSource('pasig-accessibility-25yr', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckyr3doc73xzp22mti8qpy90v-6fecy',
            });

            this.map.addSource('pasig-accessibility-100yr', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckyr3g03e38eq20nlbqbdwfdc-10k5g',
            });

            //Pasig Dataset - Hazard
            this.map.addSource('pasig-hazard-5yr', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckyr275y5384220nlqd8yg5j4-0jr6d',
            });

            this.map.addSource('pasig-hazard-25yr', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckyr2e4hl3exi22nrzh05br0x-06pul',
            });

            this.map.addSource('pasig-hazard-100yr', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckyr2fek73c0n27nlcrw0cpv8-216ea',
            });

            //Pasig Dataset - Coverage
            this.map.addSource('pasig-coverage-score', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckysbg5dv1lmt20mxlkp7u5sw-2kqyq',
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
                // [
                //     'case',
                //     ['boolean', ['feature-state', 'hover'], false],
                //     1,
                //     0.5
                // ],
                'fill-extrusion-opacity-transition': {
                    duration: 400,
                    delay: 0,
                },
                },
            });

            this.map.addLayer({
                id: 'l_marikina_accessibility_5yr',
                type: 'fill-extrusion',
                source: 'marikina-accessibility-5yr',
                'source-layer': 'marikina_accessibility_5yr',
                layout: {
                    visibility: 'none',
                },
                paint: {
                'fill-extrusion-color': {
                    property: 'accessibility_5yr',
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
                'fill-extrusion-height': ['*', 750, ['number', ['get', 'accessibility_5yr'], 1]],
                'fill-extrusion-opacity': 0,
                'fill-extrusion-opacity-transition': {
                    duration: 400,
                    delay: 0,
                },
                },
            });

            this.map.addLayer({
                id: 'l_marikina_accessibility_25yr',
                type: 'fill-extrusion',
                source: 'marikina-accessibility-25yr',
                'source-layer': 'marikina_accessibility_25yr',
                layout: {
                    visibility: 'none',
                },
                paint: {
                'fill-extrusion-color': {
                    property: 'accessibility_25yr',
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
                'fill-extrusion-height': ['*', 750, ['number', ['get', 'accessibility_25yr'], 1]],
                'fill-extrusion-opacity': 0,
                'fill-extrusion-opacity-transition': {
                    duration: 400,
                    delay: 0,
                },
                },
            });

            this.map.addLayer({
                id: 'l_marikina_accessibility_100yr',
                type: 'fill-extrusion',
                source: 'marikina-accessibility-100yr',
                'source-layer': 'marikina_accessibility_100yr',
                layout: {
                    visibility: 'none',
                },
                paint: {
                'fill-extrusion-color': {
                    property: 'accessibility_100yr',
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
                'fill-extrusion-height': ['*', 750, ['number', ['get', 'accessibility_100yr'], 1]],
                'fill-extrusion-opacity': 0,
                'fill-extrusion-opacity-transition': {
                    duration: 400,
                    delay: 0,
                },
                },
            });

            this.map.addLayer({
                //ID CHANGED from l_marikina_flood to l_marikina_flood_5yr
                id: 'l_marikina_flood_5yr',
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
                
            //l_marikina_flood_25yr
                id: 'l_marikina_flood_25yr',
                type: 'fill-extrusion',
                source: 'marikina-flood-25yr',
                'source-layer': 'marikina_flood_25yr',
                layout: {
                    visibility: 'none',
                },
                paint: {
                'fill-extrusion-color': {
                    property: 'flood_25yr',
                    stops: [
                        [0, '#06106b'],
                        [0.33, '#3741a1'],
                        [0.66, '#727ded'],
                        [1, '#cfd3ff'],
                    ],
                },
                'fill-extrusion-height': ['*', 150, ['number', ['get', 'flood_25yr'], 1]],
                'fill-extrusion-opacity': 0,

                'fill-extrusion-opacity-transition': {
                    duration: 400,
                    delay: 0,
                },
                },
            });

            this.map.addLayer({
                //l_marikina_flood_100yr
                    id: 'l_marikina_flood_100yr',
                    type: 'fill-extrusion',
                    source: 'marikina-flood-100yr',
                    'source-layer': 'marikina_flood_100yr',
                    layout: {
                        visibility: 'none',
                    },
                    paint: {
                    'fill-extrusion-color': {
                        property: 'flood_100yr',
                        stops: [
                            [0, '#06106b'],
                            [0.33, '#3741a1'],
                            [0.66, '#727ded'],
                            [1, '#cfd3ff'],
                        ],
                    },
                    'fill-extrusion-height': ['*', 150, ['number', ['get', 'flood_100yr'], 1]],
                    'fill-extrusion-opacity': 0,
    
                    'fill-extrusion-opacity-transition': {
                        duration: 400,
                        delay: 0,
                    },
                    },
                });
    
            this.map.addLayer({
                // ID CHANGED FROM l_marikina_hazard to l_marikina_hazard_5yr
                id: 'l_marikina_hazard_5yr',
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
                 //l_marikina_hazard_25yr
                id: 'l_marikina_hazard_25yr',
                type: 'fill-extrusion',
                source: 'marikina-hazard-25yr',
                'source-layer': 'marikina_hazard_25yr',
                layout: {
                    visibility: 'none',
                },
                paint: {
                'fill-extrusion-color': {
                    property: 'hazard_25yr',
                    stops: [
                        [0, '#300061'],
                        [0.33, '#9d1e69'],
                        [0.66, '#f6684c'],
                        [1, '#fcfbab'],
                    ],
                },
                'fill-extrusion-height': ['*', 150, ['number', ['get', 'hazard_25yr'], 1]],
                'fill-extrusion-opacity': 0,

                'fill-extrusion-opacity-transition': {
                    duration: 400,
                    delay: 0,
                },
                },
            });

            this.map.addLayer({
                //l_marikina_hazard_100yr
               id: 'l_marikina_hazard_100yr',
               type: 'fill-extrusion',
               source: 'marikina-hazard-100yr',
               'source-layer': 'marikina_hazard_100yr',
               layout: {
                   visibility: 'none',
               },
               paint: {
               'fill-extrusion-color': {
                   property: 'hazard_100yr',
                   stops: [
                       [0, '#300061'],
                       [0.33, '#9d1e69'],
                       [0.66, '#f6684c'],
                       [1, '#fcfbab'],
                   ],
               },
               'fill-extrusion-height': ['*', 150, ['number', ['get', 'hazard_100yr'], 1]],
               'fill-extrusion-opacity': 0,

               'fill-extrusion-opacity-transition': {
                   duration: 400,
                   delay: 0,
               },
               },
           });

            this.map.addLayer({
                id: 'l_marikina_coverage_score',
                type: 'fill-extrusion',
                source: 'marikina-coverage-score',
                'source-layer': 'marikina_coverage_score',
                layout: {
                    visibility: 'none',
                },
                paint: {
                'fill-extrusion-color': {
                    property: 'coverage_score',
                    stops: [
                        [0, '#300061'],
                        [0.33, '#9d1e69'],
                        [0.66, '#f6684c'],
                        [1, '#fcfbab'],
                    ],
                },
                'fill-extrusion-height': ['*', 150, ['number', ['get', 'coverage_score'], 1]],
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

            this.map.addLayer({
                id: 'l_marikina_complete',
                type: 'fill',
                source: 'marikina-complete',
                'source-layer': 'marikina_complete',
                layout: {
                    visibility: 'visible',
                },
                paint: {
                    'fill-color': '#627BC1',
                    'fill-opacity': 0
                }
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
                id: 'l_pasig_accessibility_5yr',
                type: 'fill-extrusion',
                source: 'pasig-accessibility-5yr',
                'source-layer': 'pasig_accessibility_5yr',
                layout: {
                    visibility: 'none',
                },
                paint: {
                'fill-extrusion-color': {
                    property: 'accessibility_5yr',
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
                'fill-extrusion-height': ['*', 750, ['number', ['get', 'accessibility_5yr'], 1]],
                'fill-extrusion-opacity': 0,
                'fill-extrusion-opacity-transition': {
                    duration: 400,
                    delay: 0,
                },
                },
            });

            this.map.addLayer({
                id: 'l_pasig_accessibility_25yr',
                type: 'fill-extrusion',
                source: 'pasig-accessibility-25yr',
                'source-layer': 'pasig_accessibility_25yr',
                layout: {
                    visibility: 'none',
                },
                paint: {
                'fill-extrusion-color': {
                    property: 'accessibility_25yr',
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
                'fill-extrusion-height': ['*', 750, ['number', ['get', 'accessibility_25yr'], 1]],
                'fill-extrusion-opacity': 0,
                'fill-extrusion-opacity-transition': {
                    duration: 400,
                    delay: 0,
                },
                },
            });

            this.map.addLayer({
                id: 'l_pasig_accessibility_100yr',
                type: 'fill-extrusion',
                source: 'pasig-accessibility-100yr',
                'source-layer': 'pasig_accessibility_100yr',
                layout: {
                    visibility: 'none',
                },
                paint: {
                'fill-extrusion-color': {
                    property: 'accessibility_100yr',
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
                'fill-extrusion-height': ['*', 750, ['number', ['get', 'accessibility_100yr'], 1]],
                'fill-extrusion-opacity': 0,
                'fill-extrusion-opacity-transition': {
                    duration: 400,
                    delay: 0,
                },
                },
            });

            this.map.addLayer({
                // ID CHANGED FROM l_pasig_flood to l_pasig_flood_5yr
                id: 'l_pasig_flood_5yr',
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
                id: 'l_pasig_flood_25yr',
                type: 'fill-extrusion',
                source: 'pasig-flood-25yr',
                'source-layer': 'pasig_flood_25yr',
                layout: {
                    visibility: 'none',
                },
                paint: {
                'fill-extrusion-color': {
                    property: 'flood_25yr',
                    stops: [
                        [0, '#06106b'],
                        [0.33, '#3741a1'],
                        [0.66, '#727ded'],
                        [1, '#cfd3ff'],
                    ],
                },
                'fill-extrusion-height': ['*', 150, ['number', ['get', 'flood_25yr'], 1]],
                'fill-extrusion-opacity': 0,

                'fill-extrusion-opacity-transition': {
                    duration: 400,
                    delay: 0,
                },
                },
            });

            this.map.addLayer({
                id: 'l_pasig_flood_100yr',
                type: 'fill-extrusion',
                source: 'pasig-flood-100yr',
                'source-layer': 'pasig_flood_100yr',
                layout: {
                    visibility: 'none',
                },
                paint: {
                'fill-extrusion-color': {
                    property: 'flood_100yr',
                    stops: [
                        [0, '#06106b'],
                        [0.33, '#3741a1'],
                        [0.66, '#727ded'],
                        [1, '#cfd3ff'],
                    ],
                },
                'fill-extrusion-height': ['*', 150, ['number', ['get', 'flood_100yr'], 1]],
                'fill-extrusion-opacity': 0,

                'fill-extrusion-opacity-transition': {
                    duration: 400,
                    delay: 0,
                },
                },
            });

            this.map.addLayer({
                // ID CHANGED FROM l_pasig_hazard to l_pasig_hazard_5yr
                id: 'l_pasig_hazard_5yr',
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

            this.map.addLayer({
                id: 'l_pasig_hazard_25yr',
                type: 'fill-extrusion',
                source: 'pasig-hazard-25yr',
                'source-layer': 'pasig_hazard_25yr',
                layout: {
                    visibility: 'none',
                },
                paint: {
                'fill-extrusion-color': {
                    property: 'hazard_25yr',
                    stops: [
                        [0, '#300061'],
                        [0.33, '#9d1e69'],
                        [0.66, '#f6684c'],
                        [1, '#fcfbab'],
                    ],
                },
                'fill-extrusion-height': ['*', 150, ['number', ['get', 'hazard_25yr'], 1]],
                'fill-extrusion-opacity': 0,

                'fill-extrusion-opacity-transition': {
                    duration: 400,
                    delay: 0,
                },
                },
            });

            this.map.addLayer({
                id: 'l_pasig_hazard_100yr',
                type: 'fill-extrusion',
                source: 'pasig-hazard-100yr',
                'source-layer': 'pasig_hazard_100yr',
                layout: {
                    visibility: 'none',
                },
                paint: {
                'fill-extrusion-color': {
                    property: 'hazard_100yr',
                    stops: [
                        [0, '#300061'],
                        [0.33, '#9d1e69'],
                        [0.66, '#f6684c'],
                        [1, '#fcfbab'],
                    ],
                },
                'fill-extrusion-height': ['*', 150, ['number', ['get', 'hazard_100yr'], 1]],
                'fill-extrusion-opacity': 0,

                'fill-extrusion-opacity-transition': {
                    duration: 400,
                    delay: 0,
                },
                },
            });

            this.map.addLayer({
                id: 'l_pasig_coverage_score',
                type: 'fill-extrusion',
                source: 'pasig-coverage-score',
                'source-layer': 'pasig_coverage_score',
                layout: {
                    visibility: 'none',
                },
                paint: {
                'fill-extrusion-color': {
                    property: 'coverage_score',
                    stops: [
                        [0, '#300061'],
                        [0.33, '#9d1e69'],
                        [0.66, '#f6684c'],
                        [1, '#fcfbab'],
                    ],
                },
                'fill-extrusion-height': ['*', 150, ['number', ['get', 'coverage_score'], 1]],
                'fill-extrusion-opacity': 0,

                'fill-extrusion-opacity-transition': {
                    duration: 400,
                    delay: 0,
                },
                },
            });

            this.map.getCanvas().style.cursor = "default";

            //Marker Feature Getting
            assignBtn.addEventListener('click', (e) => {
                alert(marker.getLngLat());
                const features = this.map.queryRenderedFeatures([this.state.x, this.state.y]);

                const displayProperties = [
                    'type',
                    'properties',
                    'id',
                    'layer',
                    'source',
                    'sourceLayer',
                    'state'
                ];
                     
                const displayFeatures = features.map((feat) => {
                    const displayFeat = {};
                    displayProperties.forEach((prop) => {
                        displayFeat[prop] = feat[prop];
                    });
                    return displayFeat;
                });

                // FLOOD
                document.getElementById('pd-flood-5yr').innerHTML = displayFeatures.length
                        ? `<b>Flood Score (5 years):</b> ${displayFeatures[0].properties.flood_5yr}`
                        : `undefined`;
                document.getElementById('pd-flood-25yr').innerHTML = displayFeatures.length
                        ? `<b>Flood Score (25 years):</b> ${displayFeatures[0].properties.flood_25yr}`
                        : `undefined`;
                document.getElementById('pd-flood-100yr').innerHTML = displayFeatures.length
                        ? `<b>Flood Score (100 years):</b> ${displayFeatures[0].properties.flood_100yr}`
                        : `undefined`;
                // HAZARD
                document.getElementById('pd-hazard-5yr').innerHTML = displayFeatures.length
                        ? `<b>Hazard Score (5 years):</b> ${displayFeatures[0].properties.hazard_5yr}`
                        : `undefined`;
                document.getElementById('pd-hazard-25yr').innerHTML = displayFeatures.length
                        ? `<b>Hazard Score (25 years):</b> ${displayFeatures[0].properties.hazard_25yr}`
                        : `undefined`;
                document.getElementById('pd-hazard-100yr').innerHTML = displayFeatures.length
                        ? `<b>Hazard Score (100 years):</b> ${displayFeatures[0].properties.hazard_25yr}`
                        : `undefined`;
            });

            //Hover Feature Getting
            this.map.on('mousemove', (e) => {
                const features = this.map.queryRenderedFeatures(e.point);
                //console.log(e.point);
                const displayProperties = [
                    'type',
                    'properties',
                    'id',
                    'layer',
                    'source',
                    'sourceLayer',
                    'state'
                ];
                     
                const displayFeatures = features.map((feat) => {
                    const displayFeat = {};
                    displayProperties.forEach((prop) => {
                        displayFeat[prop] = feat[prop];
                    });
                    return displayFeat;
                });

                //console.log("We are doing: " + this.hover_layer);

                //Supposed to be current_layer
                if(this.hover_layer === "hazard_5yr") {
                    document.getElementById('pd').innerHTML = displayFeatures.length
                        ? `${displayFeatures[0].properties.hazard_5yr}`
                        : `undefined`;
                } else if (this.hover_layer === "hazard_25yr") {
                    document.getElementById('pd').innerHTML = displayFeatures.length
                        ? `${displayFeatures[0].properties.hazard_25yr}`
                        : `undefined`;
                } else if (this.hover_layer === "hazard_100yr") {
                    document.getElementById('pd').innerHTML = displayFeatures.length
                        ? `${displayFeatures[0].properties.hazard_100yr}`
                        : `undefined`;
                }else if (this.hover_layer === "elevation") {
                    document.getElementById('pd').innerHTML = displayFeatures.length
                        ? `${displayFeatures[0].properties.elevation}`
                        : `undefined`;
                } else if (this.hover_layer === "coverage_score") {
                    document.getElementById('pd').innerHTML = displayFeatures.length
                        ? `${displayFeatures[0].properties.coverage_score}`
                        : `undefined`;
                } else if (this.hover_layer === "flood_5yr") {
                    document.getElementById('pd').innerHTML = displayFeatures.length
                        ? `${displayFeatures[0].properties.flood_5yr}`
                        : `undefined`;
                } else if (this.hover_layer === "flood_25yr") {
                    document.getElementById('pd').innerHTML = displayFeatures.length
                        ? `${displayFeatures[0].properties.flood_25yr}`
                        : `undefined`;
                } else if (this.hover_layer === "flood_100yr") {
                    document.getElementById('pd').innerHTML = displayFeatures.length
                        ? `${displayFeatures[0].properties.flood_100yr}`
                        : `undefined`;
                } else if (this.hover_layer === "accessibility_5yr") {
                    document.getElementById('pd').innerHTML = displayFeatures.length
                        ? `${displayFeatures[0].properties.accessibility_5yr}`
                        : `undefined`;
                } else if (this.hover_layer === "accessibility_25yr") {
                    document.getElementById('pd').innerHTML = displayFeatures.length
                        ? `${displayFeatures[0].properties.accessibility_25yr}`
                        : `undefined`;
                } else if (this.hover_layer === "accessibility_100yr") {
                    document.getElementById('pd').innerHTML = displayFeatures.length
                        ? `${displayFeatures[0].properties.accessibility_100yr}`
                        : `undefined`;
                }
            });

            this.map.on('mousemove', 'l_marikina_elevation', (e) => {
                if (e.features.length > 0) {
                    if (hoveredStateId !== null) {
                        this.map.setFeatureState(
                        { source: 'marikina-elevation', id: hoveredStateId },
                        { hover: false }
                    );
                }
                
                hoveredStateId = e.features[0].id;
                    this.map.setFeatureState(
                        { source: 'marikina-elevation', id: hoveredStateId },
                        { hover: true }
                    );
                }
            });

            this.map.on('mouseleave', 'l_marikina_elevation', () => {
                if (hoveredStateId !== null) {
                    this.map.setFeatureState(
                        { source: 'marikina-elevation', id: hoveredStateId },
                        { hover: false }
                    );
                }
                hoveredStateId = null;
            });

            this.map.on('mousemove', 'l_pasig_elevation', (e) => {
                if (e.features.length > 0) {
                    if (hoveredStateId !== null) {
                        this.map.setFeatureState(
                        { source: 'pasig-elevation', id: hoveredStateId },
                        { hover: false }
                    );
                }
                
                hoveredStateId = e.features[0].id;
                    this.map.setFeatureState(
                        { source: 'pasig-elevation', id: hoveredStateId },
                        { hover: true }
                    );
                }
            });

            this.map.on('mouseleave', 'l_pasig_elevation', () => {
                if (hoveredStateId !== null) {
                    this.map.setFeatureState(
                        { source: 'pasig-elevation', id: hoveredStateId },
                        { hover: false }
                    );
                }
                hoveredStateId = null;
            });

            this.map.on('mousemove', 'l_marikina_coverage_score', (e) => {
                if (e.features.length > 0) {
                    if (hoveredStateId !== null) {
                        this.map.setFeatureState(
                        { source: 'marikina-coverage-score', id: hoveredStateId },
                        { hover: false }
                    );
                }
                
                hoveredStateId = e.features[0].id;
                    this.map.setFeatureState(
                        { source: 'marikina-coverage-score', id: hoveredStateId },
                        { hover: true }
                    );
                }
            });

            
            this.map.on('mouseleave', 'l_marikina_coverage_score', () => {
                if (hoveredStateId !== null) {
                    this.map.setFeatureState(
                        { source: 'marikina_coverage_score', id: hoveredStateId },
                        { hover: false }
                    );
                }
                hoveredStateId = null;
            });

            this.map.on('mousemove', 'l_pasig_coverage_score', (e) => {
                if (e.features.length > 0) {
                    if (hoveredStateId !== null) {
                        this.map.setFeatureState(
                        { source: 'pasig-coverage-score', id: hoveredStateId },
                        { hover: false }
                    );
                }
                
                hoveredStateId = e.features[0].id;
                    this.map.setFeatureState(
                        { source: 'pasig-coverage-score', id: hoveredStateId },
                        { hover: true }
                    );
                }
            });

            this.map.on('mouseleave', 'l_pasig_coverage_score', () => {
                if (hoveredStateId !== null) {
                    this.map.setFeatureState(
                        { source: 'marikina_pasig_score', id: hoveredStateId },
                        { hover: false }
                    );
                }
                hoveredStateId = null;
            });
        });
    }

    componentWillUpdate(nextProps) {
        const {
            layer,
            city,
            layer_type
        } = this.props;

        //Update current layer global variable        
        switch(nextProps.layer_type) {
            case "hazard5yr":
                this.hover_layer = "hazard_5yr";
                break;
            case "hazard25yr":
                this.hover_layer = "hazard_25yr";
                break;
            case "hazard100yr":
                this.hover_layer = "hazard_100yr";
                break;
            case "elevation":
                this.hover_layer = "elevation"; 
                break;
            case "coveragescore":
                this.hover_layer = "coverage_score"; 
                break;
            case "flood5yr":
                this.hover_layer = "flood_5yr";
                break;
            case "flood25yr":
                this.hover_layer = "flood_25yr";
                break;
            case "flood100yr":
                this.hover_layer = "flood_100yr";
                break;
            case "accessibility5yr":
                this.hover_layer = "accessibility_5yr";
                break;
            case "accessibility25yr":
                this.hover_layer = "accessibility_25yr";
                break;
            case "accessibility100yr":
                this.hover_layer = "accessibility_100yr";
                break;

            default:
                break;
        } 
        console.log("Hover layer is set to: " + this.hover_layer); 
        console.log("The current layer_type is " + layer_type);

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

