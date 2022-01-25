import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Sidebar from './components/Sidebar'
//import Info from './components/Info'
import Map from './components/Map'
import Welcome from './components/Welcome'
import FAQ from './components/FAQ'

export default class App extends React.Component {
  constructor(props) {
    super(props);

    //Initialize state of entire App
    this.state = {
      city: '',
      layer: '',
      layer_type: 'flood',
      marker_prop: []
    };

    this.updateLayer = this.updateLayer.bind(this);
    this.updateMarkerProp = this.updateMarkerProp.bind(this);
    this.updateCity = this.updateCity.bind(this);
  }

  updateCity = (cityName) => {
    let {city} = this.state;
    city = cityName;

    this.setState({
      city
    });
  }

  updateLayer = (layerName) => {
    let {layer} = this.state;
    layer = layerName;

    this.setState({
      layer
    });
  }

  updateLayerType = (layerType) => {
    let {layer_type} = this.state;
    layer_type = layerType;

    this.setState({
      layer_type
    });
  }

  updateMarkerProp = (markerProp) => {
    let {marker_prop} = this.state;
    marker_prop = markerProp;

    this.setState({
      marker_prop
    });
  }

  render() {
    const {
      layer,
      city,
      layer_type,
      marker_prop
    } = this.state;

    return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Welcome/>}/>
          <Route path="/FAQ" element={<FAQ/>}/>
          <Route path="/map" element={<>
                <Sidebar 
                  updateLayer = {this.updateLayer}
                  updateCity = {this.updateCity}
                  updateLayerType = {this.updateLayerType}
                  
                  marker_prop = {marker_prop}
                  />
                <Map 
                  layer={layer}
                  city={city}
                  layer_type = {layer_type}

                  updateLayer = {this.updateLayer}
                  updateMarkerProp = {this.updateMarkerProp}
                  />
                </>}/>
        </Routes>
      </div>
    );
  }
}
