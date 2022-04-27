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
            markerProp: [],

            currentCity: "l_marikina"
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
            style: 'mapbox://styles/jdarvin/cl1ip8zsc001o15pgesbovpmf',
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
            .setLngLat([121.1057787616575, 14.649200220934569])
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
                this._btn.onclick = function () {
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

        this.map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
        this.map.addControl(new PitchToggle({ minpitchzoom: 11 }), "bottom-right"); // Make this bottom right

        this.map.on('style.load', () => {
            //Manila ==================================================================================
            //Manila Dataset - Land Elevation
            this.map.addSource('manila-elevation', {
                type: 'vector',
                url: 'mapbox://jdarvin.cl1lt36qj078t21oegpdy0q48-08l4s',
            });

            //Manila Dataset - Flood
            this.map.addSource('manila-flood-5yr', {
                type: 'vector',
                url: 'mapbox://jdarvin.cl1lsljsf06tj20mfwu9xe339-03ltu',
            });

            this.map.addSource('manila-flood-25yr', {
                type: 'vector',
                url: 'mapbox://jdarvin.cl1lsp78v0b1a27mfdeo8f1g5-2jlw1',
            });

            this.map.addSource('manila-flood-100yr', {
                type: 'vector',
                url: 'mapbox://jdarvin.cl1lsqmez4br92eo9zp88q2bx-6xbs4',
            });

            //Manila Dataset - Accessibility
            this.map.addSource('manila-accessibility-5yr', {
                type: 'vector',
                url: 'mapbox://jdarvin.cl2fzpjmw0d5d20o6nm915pum-6wmuq',
            });

            this.map.addSource('manila-accessibility-25yr', {
                type: 'vector',
                url: 'mapbox://jdarvin.cl2g0gfbm017g2esavk48lvfh-372wu',
            });

            this.map.addSource('manila-accessibility-100yr', {
                type: 'vector',
                url: 'mapbox://jdarvin.cl2fzsx8w00ji20p6u4fjmlqw-182uz',
            });

            //Marikina Dataset - Hazard
            this.map.addSource('manila-hazard-5yr', {
                type: 'vector',
                url: 'mapbox://jdarvin.cl1lt589m4bvj2eo96hndszft-5rbzg',
            });

            this.map.addSource('manila-hazard-25yr', {
                type: 'vector',
                url: 'mapbox://jdarvin.cl1lt6gwt09ze21mf99dwmi7d-72ydy',
            });


            this.map.addSource('manila-hazard-100yr', {
                type: 'vector',
                url: 'mapbox://jdarvin.cl1lt81kx081c21k9ahx088v8-9a76b',
            });


            //Manila Dataset - Coverage
            this.map.addSource('manila-coverage-score', {
                type: 'vector',
                url: 'mapbox://jdarvin.cl1lt1p7c3fmo21og81tcu453-4dg41',
            });

            //Manila Dataset - Land Use Score
            this.map.addSource('manila-land-use-score', {
                type: 'vector',
                url: 'mapbox://jdarvin.cl1lt98r407ai28mfodf1keqn-6z5ir',
            });


            //Manila Dataset - Sustainability 
            this.map.addSource('manila-sustainability-5yr', {
                type: 'vector',
                url: 'mapbox://',
            });

            this.map.addSource('manila-sustainability-25yr', {
                type: 'vector',
                url: 'mapbox://',
            });

            this.map.addSource('manila-sustainability-100yr', {
                type: 'vector',
                url: 'mapbox://',
            });

            //Manila Dataset - Complete 
            this.map.addSource('manila-complete', {
                type: 'vector',
                url: 'mapbox://jdarvin.cl1ltazmi082b21k97j65zvc1-0d67v',
            });

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

            //Marikina Dataset - Land Use 
            this.map.addSource('marikina-land-use', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckywuovru0ae827mgxmzdjr6o-3uk99',
            });

            //Marikina Dataset - Land Use Score
            this.map.addSource('marikina-land-use-score', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckyzyutp30qo120nvalbm6j1s-5xfb1',
            });


            //Marikina Dataset - Sustainability 
            this.map.addSource('marikina-sustainability-5yr', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckz0ygzyu0xba20lls3ndp7xo-9u482',
            });

            this.map.addSource('marikina-sustainability-25yr', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckz0yhwt50gtm24pfrv7hq0z6-7qhuv',
            });

            this.map.addSource('marikina-sustainability-100yr', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckz0yk63n0xc320lldp6whzg8-2vaz1',
            });

            //Marikina Dataset - Complete 
            this.map.addSource('marikina-complete', {
                type: 'vector',
                //url: 'mapbox://jdarvin.ckyzsf1tw0yy120qp3n22yn03-0kndf',
                url: 'mapbox://jdarvin.ckzgbu1b92lho21oftr0rn8ty-5earz'
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
                url: 'mapbox://jdarvin.ckz2cua2m091229mne9hrkoag-9i41e',
            });

            this.map.addSource('pasig-flood-25yr', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckz2cws0h20uq28ny6dyf3qa8-689jl',
            });

            this.map.addSource('pasig-flood-100yr', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckz2cxxq218ky27nmx2jvlh5q-314de',
            });


            //Pasig Dataset - Accessibility
            this.map.addSource('pasig-accessibility-5yr', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckz2d77d621ky20nyj3ketf8o-9ilec',
            });

            this.map.addSource('pasig-accessibility-25yr', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckz2d89xc09j527s6kku5w07v-06ndb',
            });

            this.map.addSource('pasig-accessibility-100yr', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckz2da3hk0wm029rt2xnf0ou8-25gbu',
            });

            //Pasig Dataset - Hazard
            this.map.addSource('pasig-hazard-5yr', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckz2cz6hr21zk21nyj7ahl1t5-0bgqd',
            });

            this.map.addSource('pasig-hazard-25yr', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckz2d05m40ymp20qf4cufrxop-4gewj',
            });

            this.map.addSource('pasig-hazard-100yr', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckz2d3f4a08qc20pl2nw2pvdf-2efh8',
            });

            //Pasig Dataset - Coverage
            this.map.addSource('pasig-coverage-score', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckz2d4wjs9a0w22o04q7f33ep-09gu3',
            });

            //Pasig Dataset - Land Use 
            this.map.addSource('pasig-land-use', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckz2dy4px1azc21nvnqx9ivvw-91erc',
            });

            //Pasig Dataset - Land Use Score
            this.map.addSource('pasig-land-use-score', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckz2e1y3x004q2aric1v60frz-2pnui',
            });

            //Pasig Dataset - Sustainability 
            this.map.addSource('pasig-sustainability-5yr', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckz1i2aof133v20s1onsvi9qc-745hx',
            });

            this.map.addSource('pasig-sustainability-25yr', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckz1ix3am039o21mzlbcb1ktl-8rtk8',
            });

            this.map.addSource('pasig-sustainability-100yr', {
                type: 'vector',
                url: 'mapbox://jdarvin.ckz1j2poi0phe29rt5a0fbm96-6kfya',
            });



            //Pasig Dataset - Complete
            this.map.addSource('pasig-complete', {
                type: 'vector',
                //url: 'mapbox://jdarvin.ckyzx8yn50prh21lllu3m25j8-2d3yn',
                url: 'mapbox://jdarvin.ckzgjgut71c1o2bppmocyqmxy-9hnjj',
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
                    'fill-extrusion-height': ['*', 150, ['number', ['get', 'accessibility_5yr'], 1]],
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
                    'fill-extrusion-height': ['*', 150, ['number', ['get', 'accessibility_25yr'], 1]],
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
                    'fill-extrusion-height': ['*', 150, ['number', ['get', 'accessibility_100yr'], 1]],
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
                id: 'l_marikina_sustainability_5yr',
                type: 'fill-extrusion',
                source: 'marikina-sustainability-5yr',
                'source-layer': 'marikina_sustainability_5yr',
                layout: {
                    visibility: 'none',
                },
                paint: {
                    'fill-extrusion-color': {
                        property: 'SUSTAINABILITY_5yr',
                        stops: [
                            [0, '#ff3d3d'],
                            [0.21, '#e0762f'],
                            [0.41, '#d4e02f'],
                            [0.61, '#2fe02f'],
                            [0.81, '#88e02f'],
                        ],
                    },
                    'fill-extrusion-height': ['*', 150, ['number', ['get', 'SUSTAINABILITY_5yr'], 1]],
                    'fill-extrusion-opacity': 0,

                    'fill-extrusion-opacity-transition': {
                        duration: 400,
                        delay: 0,
                    },
                },
            });

            this.map.addLayer({
                id: 'l_marikina_sustainability_25yr',
                type: 'fill-extrusion',
                source: 'marikina-sustainability-25yr',
                'source-layer': 'marikina_sustainability_25yr',
                layout: {
                    visibility: 'none',
                },
                paint: {
                    'fill-extrusion-color': {
                        property: 'SUSTAINABILITY_25yr',
                        stops: [
                            [0, '#ff3d3d'],
                            [0.21, '#e0762f'],
                            [0.41, '#d4e02f'],
                            [0.61, '#2fe02f'],
                            [0.81, '#88e02f'],
                        ],
                    },
                    'fill-extrusion-height': ['*', 150, ['number', ['get', 'SUSTAINABILITY_25yr'], 1]],
                    'fill-extrusion-opacity': 0,

                    'fill-extrusion-opacity-transition': {
                        duration: 400,
                        delay: 0,
                    },
                },
            });

            this.map.addLayer({
                id: 'l_marikina_sustainability_100yr',
                type: 'fill-extrusion',
                source: 'marikina-sustainability-100yr',
                'source-layer': 'marikina_sustainability_100yr',
                layout: {
                    visibility: 'none',
                },
                paint: {
                    'fill-extrusion-color': {
                        property: 'SUSTAINABILITY_100yr',
                        stops: [
                            [0, '#ff3d3d'],
                            [0.21, '#e0762f'],
                            [0.41, '#d4e02f'],
                            [0.61, '#2fe02f'],
                            [0.81, '#88e02f'],
                        ],
                    },
                    'fill-extrusion-height': ['*', 150, ['number', ['get', 'SUSTAINABILITY_100yr'], 1]],
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

            // MANILA INITS ================================================================================
            //Manila Layer Inits
            this.map.addLayer({
                id: 'l_manila_elevation',
                type: 'fill-extrusion',
                source: 'manila-elevation',
                'source-layer': 'manila_elevation',
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
                    'fill-extrusion-height': ['*', 10, ['number', ['get', 'elevation'], 1]],
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
                id: 'l_manila_accessibility_5yr',
                type: 'fill-extrusion',
                source: 'manila-accessibility-5yr',
                'source-layer': 'manila_accessibility_5yr',
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
                    'fill-extrusion-height': ['*', 150, ['number', ['get', 'accessibility_5yr'], 1]],
                    'fill-extrusion-opacity': 0,
                    'fill-extrusion-opacity-transition': {
                        duration: 400,
                        delay: 0,
                    },
                },
            });

            this.map.addLayer({
                id: 'l_manila_accessibility_25yr',
                type: 'fill-extrusion',
                source: 'manila-accessibility-25yr',
                'source-layer': 'manila_accessibility_25yr',
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
                    'fill-extrusion-height': ['*', 150, ['number', ['get', 'accessibility_25yr'], 1]],
                    'fill-extrusion-opacity': 0,
                    'fill-extrusion-opacity-transition': {
                        duration: 400,
                        delay: 0,
                    },
                },
            });

            this.map.addLayer({
                id: 'l_manila_accessibility_100yr',
                type: 'fill-extrusion',
                source: 'manila-accessibility-100yr',
                'source-layer': 'manila_accessibility_100yr',
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
                    'fill-extrusion-height': ['*', 150, ['number', ['get', 'accessibility_100yr'], 1]],
                    'fill-extrusion-opacity': 0,
                    'fill-extrusion-opacity-transition': {
                        duration: 400,
                        delay: 0,
                    },
                },
            });

            this.map.addLayer({
                //ID CHANGED from l_marikina_flood to l_marikina_flood_5yr
                id: 'l_manila_flood_5yr',
                type: 'fill-extrusion',
                source: 'manila-flood-5yr',
                'source-layer': 'manila_flood_5yr',
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
                id: 'l_manila_flood_25yr',
                type: 'fill-extrusion',
                source: 'manila-flood-25yr',
                'source-layer': 'manila_flood_25yr',
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
                id: 'l_manila_flood_100yr',
                type: 'fill-extrusion',
                source: 'manila-flood-100yr',
                'source-layer': 'manila_flood_100yr',
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
                id: 'l_manila_hazard_5yr',
                type: 'fill-extrusion',
                source: 'manila-hazard-5yr',
                'source-layer': 'manila_hazard_5yr',
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
                id: 'l_manila_hazard_25yr',
                type: 'fill-extrusion',
                source: 'manila-hazard-25yr',
                'source-layer': 'manila_hazard_25yr',
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
                id: 'l_manila_hazard_100yr',
                type: 'fill-extrusion',
                source: 'manila-hazard-100yr',
                'source-layer': 'manila_hazard_100yr',
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
                id: 'l_manila_coverage_score',
                type: 'fill-extrusion',
                source: 'manila-coverage-score',
                'source-layer': 'manila_coverage_score',
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
                id: 'l_manila_land_use_score',
                type: 'fill-extrusion',
                source: 'manila-land-use-score',
                'source-layer': 'manila_land_use_score',
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
                id: 'l_manila_sustainability_5yr',
                type: 'fill-extrusion',
                source: 'manila-sustainability-5yr',
                'source-layer': 'manila_sustainability_5yr',
                layout: {
                    visibility: 'none',
                },
                paint: {
                    'fill-extrusion-color': {
                        property: 'SUSTAINABILITY_5yr',
                        stops: [
                            [0, '#ff3d3d'],
                            [0.21, '#e0762f'],
                            [0.41, '#d4e02f'],
                            [0.61, '#2fe02f'],
                            [0.81, '#88e02f'],
                        ],
                    },
                    'fill-extrusion-height': ['*', 150, ['number', ['get', 'SUSTAINABILITY_5yr'], 1]],
                    'fill-extrusion-opacity': 0,

                    'fill-extrusion-opacity-transition': {
                        duration: 400,
                        delay: 0,
                    },
                },
            });

            this.map.addLayer({
                id: 'l_manila_sustainability_25yr',
                type: 'fill-extrusion',
                source: 'manila-sustainability-25yr',
                'source-layer': 'manila_sustainability_25yr',
                layout: {
                    visibility: 'none',
                },
                paint: {
                    'fill-extrusion-color': {
                        property: 'SUSTAINABILITY_25yr',
                        stops: [
                            [0, '#ff3d3d'],
                            [0.21, '#e0762f'],
                            [0.41, '#d4e02f'],
                            [0.61, '#2fe02f'],
                            [0.81, '#88e02f'],
                        ],
                    },
                    'fill-extrusion-height': ['*', 150, ['number', ['get', 'SUSTAINABILITY_25yr'], 1]],
                    'fill-extrusion-opacity': 0,

                    'fill-extrusion-opacity-transition': {
                        duration: 400,
                        delay: 0,
                    },
                },
            });

            this.map.addLayer({
                id: 'l_manila_sustainability_100yr',
                type: 'fill-extrusion',
                source: 'manila-sustainability-100yr',
                'source-layer': 'manila_sustainability_100yr',
                layout: {
                    visibility: 'none',
                },
                paint: {
                    'fill-extrusion-color': {
                        property: 'SUSTAINABILITY_100yr',
                        stops: [
                            [0, '#ff3d3d'],
                            [0.21, '#e0762f'],
                            [0.41, '#d4e02f'],
                            [0.61, '#2fe02f'],
                            [0.81, '#88e02f'],
                        ],
                    },
                    'fill-extrusion-height': ['*', 150, ['number', ['get', 'SUSTAINABILITY_100yr'], 1]],
                    'fill-extrusion-opacity': 0,

                    'fill-extrusion-opacity-transition': {
                        duration: 400,
                        delay: 0,
                    },
                },
            });

            this.map.addLayer({
                id: 'l_manila_complete',
                type: 'fill',
                source: 'manila-complete',
                'source-layer': 'manila_complete',
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
                    'fill-extrusion-height': ['*', 150, ['number', ['get', 'accessibility_5yr'], 1]],
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
                    'fill-extrusion-height': ['*', 150, ['number', ['get', 'accessibility_25yr'], 1]],
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
                    'fill-extrusion-height': ['*', 150, ['number', ['get', 'accessibility_100yr'], 1]],
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
                id: 'l_pasig_sustainability_5yr',
                type: 'fill-extrusion',
                source: 'pasig-sustainability-5yr',
                'source-layer': 'pasig_sustainability_5yr',
                layout: {
                    visibility: 'none',
                },
                paint: {
                    'fill-extrusion-color': {
                        property: 'SUSTAINABILITY_5yr',
                        stops: [
                            [0, '#ff3d3d'],
                            [0.21, '#e0762f'],
                            [0.41, '#d4e02f'],
                            [0.61, '#2fe02f'],
                            [0.81, '#88e02f'],
                        ],
                    },
                    'fill-extrusion-height': ['*', 150, ['number', ['get', 'SUSTAINABILITY_5yr'], 1]],
                    'fill-extrusion-opacity': 0,

                    'fill-extrusion-opacity-transition': {
                        duration: 400,
                        delay: 0,
                    },
                },
            });

            this.map.addLayer({
                id: 'l_pasig_sustainability_25yr',
                type: 'fill-extrusion',
                source: 'pasig-sustainability-25yr',
                'source-layer': 'pasig_sustainability_25yr',
                layout: {
                    visibility: 'none',
                },
                paint: {
                    'fill-extrusion-color': {
                        property: 'SUSTAINABILITY_25yr',
                        stops: [
                            [0, '#ff3d3d'],
                            [0.21, '#e0762f'],
                            [0.41, '#d4e02f'],
                            [0.61, '#2fe02f'],
                            [0.81, '#88e02f'],
                        ],
                    },
                    'fill-extrusion-height': ['*', 150, ['number', ['get', 'SUSTAINABILITY_25yr'], 1]],
                    'fill-extrusion-opacity': 0,

                    'fill-extrusion-opacity-transition': {
                        duration: 400,
                        delay: 0,
                    },
                },
            });

            this.map.addLayer({
                id: 'l_pasig_sustainability_100yr',
                type: 'fill-extrusion',
                source: 'pasig-sustainability-100yr',
                'source-layer': 'pasig_sustainability_100yr',
                layout: {
                    visibility: 'none',
                },
                paint: {
                    'fill-extrusion-color': {
                        property: 'SUSTAINABILITY_100yr',
                        stops: [
                            [0, '#ff3d3d'],
                            [0.21, '#e0762f'],
                            [0.41, '#d4e02f'],
                            [0.61, '#2fe02f'],
                            [0.81, '#88e02f'],
                        ],
                    },
                    'fill-extrusion-height': ['*', 150, ['number', ['get', 'SUSTAINABILITY_100yr'], 1]],
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

                // Hook data to array
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

                //Vector Layer Data
                console.log("We are on " + this.state.currentCity);

                //if(this.state.currentCity === "l_marikina") {
                //Marikina Goes First
                tempMarkerArray[11] = displayFeatures[0].properties.cemetery;
                tempMarkerArray[12] = displayFeatures[0].properties.commercial;
                tempMarkerArray[13] = displayFeatures[0].properties.farmland;
                tempMarkerArray[14] = displayFeatures[0].properties.forest;
                tempMarkerArray[15] = displayFeatures[0].properties.grass;
                tempMarkerArray[16] = displayFeatures[0].properties.heath;
                tempMarkerArray[17] = displayFeatures[0].properties.industrial;
                tempMarkerArray[18] = displayFeatures[0].properties.meadow;
                tempMarkerArray[19] = displayFeatures[0].properties.park;
                tempMarkerArray[20] = displayFeatures[0].properties.recreation_ground;
                tempMarkerArray[21] = displayFeatures[0].properties.residential;

                tempMarkerArray[22] = displayFeatures[0].properties.retail;
                tempMarkerArray[23] = displayFeatures[0].properties.scrub;
                tempMarkerArray[24] = displayFeatures[0].properties.unclassified;

                //Pasig Next (only military)
                tempMarkerArray[25] = displayFeatures[0].properties.military;
                //}

                //Sustainability
                tempMarkerArray[26] = displayFeatures[0].properties.SUSTAINABILITY_5yr;
                tempMarkerArray[27] = displayFeatures[0].properties.SUSTAINABILITY_25yr;
                tempMarkerArray[28] = displayFeatures[0].properties.SUSTAINABILITY_100yr;

                //Barangay
                tempMarkerArray[29] = displayFeatures[0].properties.barangay;

                this.setState({ markerProp: tempMarkerArray });
                this.props.updateMarkerProp(tempMarkerArray);

                console.log("Sending... " + tempMarkerArray);
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
                if (this.hover_layer === "hazard_5yr") {
                    document.getElementById('pd').innerHTML = displayFeatures.length
                        ? `${Number(parseFloat(displayFeatures[0].properties.hazard_5yr).toFixed(3))}`
                        : `undefined`;
                } else if (this.hover_layer === "hazard_25yr") {
                    document.getElementById('pd').innerHTML = displayFeatures.length
                        ? `${Number(parseFloat(displayFeatures[0].properties.hazard_25yr).toFixed(3))}`
                        : `undefined`;
                } else if (this.hover_layer === "hazard_100yr") {
                    document.getElementById('pd').innerHTML = displayFeatures.length
                        ? `${Number(parseFloat(displayFeatures[0].properties.hazard_100yr).toFixed(3))}`
                        : `undefined`;
                } else if (this.hover_layer === "flood_5yr") {
                    document.getElementById('pd').innerHTML = displayFeatures.length
                        ? `${Number(parseFloat(displayFeatures[0].properties.flood_5yr).toFixed(3))}`
                        : `undefined`;
                } else if (this.hover_layer === "flood_25yr") {
                    document.getElementById('pd').innerHTML = displayFeatures.length
                        ? `${Number(parseFloat(displayFeatures[0].properties.flood_25yr).toFixed(3))}`
                        : `undefined`;
                } else if (this.hover_layer === "flood_100yr") {
                    document.getElementById('pd').innerHTML = displayFeatures.length
                        ? `${Number(parseFloat(displayFeatures[0].properties.flood_100yr).toFixed(3))}`
                        : `undefined`;
                } else if (this.hover_layer === "accessibility_5yr") {
                    document.getElementById('pd').innerHTML = displayFeatures.length
                        ? `${Number(parseFloat(displayFeatures[0].properties.accessibility_5yr).toFixed(3))}`
                        : `undefined`;
                } else if (this.hover_layer === "accessibility_25yr") {
                    document.getElementById('pd').innerHTML = displayFeatures.length
                        ? `${Number(parseFloat(displayFeatures[0].properties.accessibility_25yr).toFixed(3))}`
                        : `undefined`;
                } else if (this.hover_layer === "accessibility_100yr") {
                    document.getElementById('pd').innerHTML = displayFeatures.length
                        ? `${Number(parseFloat(displayFeatures[0].properties.accessibility_100yr).toFixed(3))}`
                        : `undefined`;
                } else if (this.hover_layer === "SUSTAINABILITY_5yr") {
                    document.getElementById('pd').innerHTML = displayFeatures.length
                        ? `${Number(parseFloat(displayFeatures[0].properties.SUSTAINABILITY_5yr).toFixed(3))}`
                        : `undefined`;
                } else if (this.hover_layer === "SUSTAINABILITY_25yr") {
                    document.getElementById('pd').innerHTML = displayFeatures.length
                        ? `${Number(parseFloat(displayFeatures[0].properties.SUSTAINABILITY_25yr).toFixed(3))}`
                        : `undefined`;
                } else if (this.hover_layer === "SUSTAINABILITY_100yr") {
                    document.getElementById('pd').innerHTML = displayFeatures.length
                        ? `${Number(parseFloat(displayFeatures[0].properties.SUSTAINABILITY_100yr).toFixed(3))}`
                        : `undefined`;
                } else if (this.hover_layer === "elevation") {
                    document.getElementById('pd').innerHTML = displayFeatures.length
                        ? `${Number(parseFloat(displayFeatures[0].properties.elevation).toFixed(3))}`
                        : `undefined`;
                } else if (this.hover_layer === "land_use_score") {
                    document.getElementById('pd').innerHTML = displayFeatures.length
                        ? `${Number(parseFloat(displayFeatures[0].properties.land_use_score).toFixed(3))}`
                        : `undefined`;
                } else if (this.hover_layer === "coverage_score") {
                    document.getElementById('pd').innerHTML = displayFeatures.length
                        ? `${Number(parseFloat(displayFeatures[0].properties.coverage_score).toFixed(3))}`
                        : `undefined`;
                }
            });

            this.map.setLayoutProperty(
                `l_marikina_land_use_score`,
                'visibility',
                'visible'
            );
            this.setState({ currentCity: `l_marikina` });

            this.props.updateLayer(`l_marikina_land_use_score`);
            this.map.setPaintProperty(`l_marikina_land_use_score`, 'fill-extrusion-opacity', 0.75);

            console.log('done!');

            this.map.flyTo({
                center: [
                    121.10238652504856, 14.646201753613344
                ],
                zoom: 13.25,
                essential: true
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
        switch (nextProps.layer_type) {
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
            case "SUSTAINABILITY_5yr":
                this.hover_layer = "SUSTAINABILITY_5yr";
                break;
            case "SUSTAINABILITY_25yr":
                this.hover_layer = "SUSTAINABILITY_25yr";
                break;
            case "SUSTAINABILITY_100yr":
                this.hover_layer = "SUSTAINABILITY_100yr";
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
        if (nextProps.layer !== layer) {
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
        if (nextProps.city !== city) {
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
            this.setState({ currentCity: nextProps.city });

            this.props.updateLayer(`${nextProps.city}_${layer_type}`);

            this.map.setPaintProperty(layer, 'fill-extrusion-opacity', 0);
            this.map.setPaintProperty(`${nextProps.city}_${layer_type}`, 'fill-extrusion-opacity', 0.75);

            // Zoom into other city
            if (nextProps.city === 'l_marikina') {
                this.map.flyTo({
                    center: [
                        121.10238652504856, 14.646201753613344
                    ],
                    zoom: 13.25,
                    essential: true
                });
            } else if (nextProps.city === 'l_pasig') {
                this.map.flyTo({
                    center: [
                        121.08477661251118, 14.58074966702777
                    ],
                    zoom: 12.75,
                    essential: true
                });
            } else {
                this.map.flyTo({
                    center: [
                        120.98342857168913, 14.595154190112392
                    ],
                    zoom: 12.75,
                    essential: true
                });
            }

        }
    }

    render() {
        const mapStyle = {
            position: 'fixed',
            width: '100%',
            top: 0,
            bottom: 0,
            zIndex: -1
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

