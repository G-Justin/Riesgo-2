import mapboxgl from 'mapbox-gl';
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import 'mapbox-gl/dist/mapbox-gl.css';

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;
mapboxgl.accessToken = 'pk.eyJ1IjoiamRhcnZpbiIsImEiOiJja3l6bHN6MXowdmkzMm9tdm1sbWlxdmpiIn0.lN3lfmSjh3KPZX1SwzTXVA';

export default class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lat: 14.577,
            lng: 121,
            zoom: 11.16,
            bearing: 0.13,

            //Marker Coordinates
            x: 0, y: 0,

            //Marker Properties
            markerProp: []
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

        // let hoveredStateId = null;
        let tempMarkerArray = [];

        //Marker & Popup Inits
        const divElement = document.createElement('div');
        const assignBtn = document.createElement('div');
        assignBtn.innerHTML = `<center><Button class="pBtn" style="margin: 3px; border: none; padding: 10px; width: 100%; font-family: Roboto; background-color: #3fb1ce; color: white; font-size: 12px; border-radius: 20px;"><b>ANALYZE</b></Button></center>`
        divElement.appendChild(assignBtn);

        const popup = new mapboxgl.Popup({ offset: 25, closeOnMove: true }).setDOMContent(divElement);

        const marker = new mapboxgl.Marker({
            draggable: true
        })
            .setLngLat([121.03693378520076, 14.587247918399061])
            .setPopup(popup)
            .addTo(this.map);

        function onDragEnd() {
            marker.togglePopup(popup);
            const lngLat = marker.getLngLat();
            divElement.innerHTML = `Longitude: ${lngLat.lng}<br />Latitude: ${lngLat.lat}`;
            divElement.appendChild(assignBtn);
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
                url: 'mapbox://jdarvin.ckywuimih03mp29ogcfl1l5k3-1amre',
            });

            //Marikina Dataset - Flood
            this.map.addSource('marikina-flood-5yr', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckywucljr4l8s20nlr43bbhaa-9mni5',
            });

            this.map.addSource('marikina-flood-25yr', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckywue3f880bu29o06wuapmxl-08ysj',
            });

            this.map.addSource('marikina-flood-100yr', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckywuf6sf5adl22mti7i8ej4w-33r8q',
            });

            //Marikina Dataset - Accessibility
            this.map.addSource('marikina-accessibility-5yr', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckywukmxs80dr29o0gtnwpae1-8tnce',
            });

            this.map.addSource('marikina-accessibility-25yr', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckywulov90cxt22oy9qxdt38v-3p8pk',
            });

            this.map.addSource('marikina-accessibility-100yr', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckywumw7z0r8w29n5c0t9imby-2j96f',
            });

            //Marikina Dataset - Hazard
            this.map.addSource('marikina-hazard-5yr', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckywug1km0dyj25oygyd8itut-2mru7',
            });

            this.map.addSource('marikina-hazard-25yr', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckywugvng03a828nxlrsbhd4g-4n9m9',
            });

            
            this.map.addSource('marikina-hazard-100yr', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckywuhprl0r7h29n55ghzo2uy-2ih6f',
            });


            //Marikina Dataset - Coverage
            this.map.addSource('marikina-coverage-score', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckywujtfe03l827pk2ss4csbp-0vd71',
            });

            //Marikina Dataset - Land Use (FAKE)
            this.map.addSource('fake-marikina-land-use', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckwqdmyyy0ql924pfweq7ptc6-2a6zr',
            });

            //Marikina Dataset - Land Use 
            this.map.addSource('marikina-land-use', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckywuovru0ae827mgxmzdjr6o-3uk99',
            });

            //Marikina Dataset - Land Use Score
            this.map.addSource('marikina-land-use-score', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckywunz7z0hux23ornzsk2hgv-0636f',
            });


            //Marikina Dataset - Sustainability (FAKE)
            this.map.addSource('fake-marikina-sustainability-5yr', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckwqdjusr0tvs28s10h3pbotb-2z5rw',
            });

            //Marikina Dataset - Complete 
            this.map.addSource('marikina-complete', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckyzlg5vl08us29ll5igfakzt-4rfg2',
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

            //Pasig Dataset - Land Use 
            this.map.addSource('pasig-land-use', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckyxzswrf0ril2eny8lgf3u5m-1i0xd',
            });

            //Pasig Dataset - Land Use Score
            this.map.addSource('pasig-land-use-score', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckyxzv6ao02cc27ndgti2q724-2c015',
            });

            //Pasig Dataset - Complete
            this.map.addSource('pasig-complete', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckyswpdpg1r0m20mx4zsbas59-2nd82',
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
                id: 'l_marikina_land_use_score',
                type: 'fill-extrusion',
                source: 'marikina-land-use-score',
                'source-layer': 'marikina_land_use_score',
                layout: {
                    visibility: 'none',
                },
                paint: {
                'fill-extrusion-color': {
                    property: 'land_use_score',
                    stops: [
                        [0, '#340045'],
                        [0.125, '#371865'],
                        [0.250, '#2e3c78'],
                        [0.375, '#26557b'],
                        [0.5, '#1e7f7a'],
                        [0.625, '#249f6f'],
                        [0.750, '#51c34e'],
                        [0.875, '#b4dc1d'],
                        [1, '#fce51e'],
                    ],
                },
                'fill-extrusion-height': ['*', 250, ['number', ['get', 'land_use_score'], 1]],
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

            this.map.addLayer({
                id: 'l_pasig_land_use_score',
                type: 'fill-extrusion',
                source: 'pasig-land-use-score',
                'source-layer': 'pasig_land_use_score',
                layout: {
                    visibility: 'none',
                },
                paint: {
                'fill-extrusion-color': {
                    property: 'land_use_score',
                    stops: [
                        [0, '#340045'],
                        [0.125, '#371865'],
                        [0.250, '#2e3c78'],
                        [0.375, '#26557b'],
                        [0.5, '#1e7f7a'],
                        [0.625, '#249f6f'],
                        [0.750, '#51c34e'],
                        [0.875, '#b4dc1d'],
                        [1, '#fce51e'],
                    ],
                },
                'fill-extrusion-height': ['*', 250, ['number', ['get', 'land_use_score'], 1]],
                'fill-extrusion-opacity': 0,

                'fill-extrusion-opacity-transition': {
                    duration: 400,
                    delay: 0,
                },
                },
            });

            this.map.addLayer({
                id: 'l_pasig_complete',
                type: 'fill',
                source: 'pasig-complete',
                'source-layer': 'pasig_complete',
                layout: {
                    visibility: 'visible',
                },
                paint: {
                    'fill-color': '#627BC1',
                    'fill-opacity': 0
                }
            });

            // END OF LAYER INITIALIZATIONS

            this.map.getCanvas().style.cursor = "default";

            //Marker Feature Getting
            assignBtn.addEventListener('click', (e) => {
                //alert(marker.getLngLat());
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

                // FLOOD YOU ARE HERE
                tempMarkerArray[0] = displayFeatures[0].properties.flood_5yr;
                tempMarkerArray[1] = displayFeatures[0].properties.flood_25yr;
                tempMarkerArray[2] = displayFeatures[0].properties.flood_100yr;
                tempMarkerArray[3] = displayFeatures[0].properties.hazard_5yr;
                tempMarkerArray[4] = displayFeatures[0].properties.hazard_25yr;
                tempMarkerArray[5] = displayFeatures[0].properties.hazard_100yr;
                tempMarkerArray[6] = displayFeatures[0].properties.accessibility_5yr;
                tempMarkerArray[7] = displayFeatures[0].properties.accessibility_25yr;
                tempMarkerArray[8] = displayFeatures[0].properties.accessibility_100yr;
                tempMarkerArray[9] = displayFeatures[0].properties.elevation;
                tempMarkerArray[10] = displayFeatures[0].properties.land_use_score;     // Gridmap
                tempMarkerArray[11] = displayFeatures[0].properties.land_use;           // Data Visualization 

                this.setState({ markerProp: tempMarkerArray });

                this.props.updateMarkerProp(tempMarkerArray);
                console.log("Sending... " + tempMarkerArray);

                // document.getElementById('pd-flood-5yr').innerHTML = displayFeatures.length
                //         ? `<b>Flood Score (5 years):</b> ${displayFeatures[0].properties.flood_5yr}`
                //         : `undefined`;
                // document.getElementById('pd-flood-25yr').innerHTML = displayFeatures.length
                //         ? `<b>Flood Score (25 years):</b> ${displayFeatures[0].properties.flood_25yr}`
                //         : `undefined`;
                // document.getElementById('pd-flood-100yr').innerHTML = displayFeatures.length
                //         ? `<b>Flood Score (100 years):</b> ${displayFeatures[0].properties.flood_100yr}`
                //         : `undefined`;

                // // HAZARD
                // document.getElementById('pd-hazard-5yr').innerHTML = displayFeatures.length
                //         ? `<b>Hazard Score (5 years):</b> ${displayFeatures[0].properties.hazard_5yr}`
                //         : `undefined`;
                // document.getElementById('pd-hazard-25yr').innerHTML = displayFeatures.length
                //         ? `<b>Hazard Score (25 years):</b> ${displayFeatures[0].properties.hazard_25yr}`
                //         : `undefined`;
                // document.getElementById('pd-hazard-100yr').innerHTML = displayFeatures.length
                //         ? `<b>Hazard Score (100 years):</b> ${displayFeatures[0].properties.hazard_25yr}`
                //         : `undefined`;

                // // ACCESSIBILITY
                // document.getElementById('pd-accessibility-5yr').innerHTML = displayFeatures.length
                //         ? `<b>Accessibility Score (5 years):</b> ${displayFeatures[0].properties.accessibility_5yr}`
                //         : `undefined`;
                // document.getElementById('pd-accessibility-25yr').innerHTML = displayFeatures.length
                //         ? `<b>Accessibility Score (25 years):</b> ${displayFeatures[0].properties.accessibility_25yr}`
                //         : `undefined`;
                // document.getElementById('pd-accessibility-100yr').innerHTML = displayFeatures.length
                //         ? `<b>Accessibility Score (100 years):</b> ${displayFeatures[0].properties.accessibility_25yr}`
                //         : `undefined`;
                        
                // // ELEVATION
                // document.getElementById('pd-elevation').innerHTML = displayFeatures.length
                // ? `<b>Elevation: </b> ${displayFeatures[0].properties.elevation}`
                // : `undefined`;
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

                console.log("We are doing: " + this.hover_layer);

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
                } else if (this.hover_layer === "elevation") {
                    document.getElementById('pd').innerHTML = displayFeatures.length
                        ? `${displayFeatures[0].properties.elevation}`
                        : `undefined`;
                } else if (this.hover_layer === "land_use_score") {
                    document.getElementById('pd').innerHTML = displayFeatures.length
                        ? `${displayFeatures[0].properties.land_use_score}`
                        : `undefined`;
                } else if (this.hover_layer === "coverage_score") {
                    document.getElementById('pd').innerHTML = displayFeatures.length
                        ? `${displayFeatures[0].properties.coverage_score}`
                        : `undefined`;
                } 
            });

            // this.map.on('mousemove', 'l_marikina_elevation', (e) => {
            //     if (e.features.length > 0) {
            //         if (hoveredStateId !== null) {
            //             this.map.setFeatureState(
            //             { source: 'marikina-elevation', id: hoveredStateId },
            //             { hover: false }
            //         );
            //     }
                
            //     hoveredStateId = e.features[0].id;
            //         this.map.setFeatureState(
            //             { source: 'marikina-elevation', id: hoveredStateId },
            //             { hover: true }
            //         );
            //     }
            // });

            // this.map.on('mouseleave', 'l_marikina_elevation', () => {
            //     if (hoveredStateId !== null) {
            //         this.map.setFeatureState(
            //             { source: 'marikina-elevation', id: hoveredStateId },
            //             { hover: false }
            //         );
            //     }
            //     hoveredStateId = null;
            // });

            // this.map.on('mousemove', 'l_pasig_elevation', (e) => {
            //     if (e.features.length > 0) {
            //         if (hoveredStateId !== null) {
            //             this.map.setFeatureState(
            //             { source: 'pasig-elevation', id: hoveredStateId },
            //             { hover: false }
            //         );
            //     }
                
            //     hoveredStateId = e.features[0].id;
            //         this.map.setFeatureState(
            //             { source: 'pasig-elevation', id: hoveredStateId },
            //             { hover: true }
            //         );
            //     }
            // });

            // this.map.on('mouseleave', 'l_pasig_elevation', () => {
            //     if (hoveredStateId !== null) {
            //         this.map.setFeatureState(
            //             { source: 'pasig-elevation', id: hoveredStateId },
            //             { hover: false }
            //         );
            //     }
            //     hoveredStateId = null;
            // });

            // this.map.on('mousemove', 'l_marikina_coverage_score', (e) => {
            //     if (e.features.length > 0) {
            //         if (hoveredStateId !== null) {
            //             this.map.setFeatureState(
            //             { source: 'marikina-coverage-score', id: hoveredStateId },
            //             { hover: false }
            //         );
            //     }
                
            //     hoveredStateId = e.features[0].id;
            //         this.map.setFeatureState(
            //             { source: 'marikina-coverage-score', id: hoveredStateId },
            //             { hover: true }
            //         );
            //     }
            // });

            
            // this.map.on('mouseleave', 'l_marikina_coverage_score', () => {
            //     if (hoveredStateId !== null) {
            //         this.map.setFeatureState(
            //             { source: 'marikina_coverage_score', id: hoveredStateId },
            //             { hover: false }
            //         );
            //     }
            //     hoveredStateId = null;
            // });

            // this.map.on('mousemove', 'l_pasig_coverage_score', (e) => {
            //     if (e.features.length > 0) {
            //         if (hoveredStateId !== null) {
            //             this.map.setFeatureState(
            //             { source: 'pasig-coverage-score', id: hoveredStateId },
            //             { hover: false }
            //         );
            //     }
                
            //     hoveredStateId = e.features[0].id;
            //         this.map.setFeatureState(
            //             { source: 'pasig-coverage-score', id: hoveredStateId },
            //             { hover: true }
            //         );
            //     }
            // });

            // this.map.on('mouseleave', 'l_pasig_coverage_score', () => {
            //     if (hoveredStateId !== null) {
            //         this.map.setFeatureState(
            //             { source: 'marikina_pasig_score', id: hoveredStateId },
            //             { hover: false }
            //         );
            //     }
            //     hoveredStateId = null;
            // });

            // this.map.on('mousemove', 'l_marikina_land_use_score', (e) => {
            //     if (e.features.length > 0) {
            //         if (hoveredStateId !== null) {
            //             this.map.setFeatureState(
            //             { source: 'marikina-land-use-score', id: hoveredStateId },
            //             { hover: false }
            //         );
            //     }
                
            //     hoveredStateId = e.features[0].id;
            //         this.map.setFeatureState(
            //             { source: 'marikina-land-use-score', id: hoveredStateId },
            //             { hover: true }
            //         );
            //     }
            // });

            // this.map.on('mouseleave', 'l_marikina_land_use_score', () => {
            //     if (hoveredStateId !== null) {
            //         this.map.setFeatureState(
            //             { source: 'marikina-land-use-score', id: hoveredStateId },
            //             { hover: false }
            //         );
            //     }
            //     hoveredStateId = null;
            // });
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
            case "hazard_5yr":
                this.hover_layer = "hazard_5yr";
                break;
            case "hazard_25yr":
                this.hover_layer = "hazard_25yr";
                break;
            case "hazard_100yr":
                this.hover_layer = "hazard_100yr";
                break;
            case "flood_5yr":
                this.hover_layer = "flood_5yr";
                break;
            case "flood_25yr":
                this.hover_layer = "flood_25yr";
                break;
            case "flood_100yr":
                this.hover_layer = "flood_100yr";
                break;
            case "accessibility_5yr":
                this.hover_layer = "accessibility_5yr";
                break;
            case "accessibility_25yr":
                this.hover_layer = "accessibility_25yr";
                break;
            case "accessibility_100yr":
                this.hover_layer = "accessibility_100yr";
                break;
            case "elevation":
                this.hover_layer = "elevation"; 
                break;
            case "coverage_score":
                this.hover_layer = "coverage_score"; 
                break;
            case "land_use_score":
                this.hover_layer = "land_use_score"; 
                break;
            default:
                break;
        } 
        //console.log("Hover layer is set to: " + this.hover_layer); 
        //console.log("The current layer_type is " + layer_type);

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

            //console.log(nextProps.layer_type)
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

