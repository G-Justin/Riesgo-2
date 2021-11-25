import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Sidebar from './components/Sidebar'
//import Info from './components/Info'
import Map from './components/Map'
import Welcome from './components/Welcome'

export default class App extends React.Component {
  constructor(props) {
    super(props);

    //Initialize state of entire App
    this.state = {
      city: '',
      layer: '',
      layer_type: 'flood'
    };

    this.updateLayer = this.updateLayer.bind(this);
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

  render() {
    const {
      layer,
      city,
      layer_type
    } = this.state;
    return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Welcome/>}/>
          <Route path="/map" element={<>
                <Sidebar 
                  updateLayer = {this.updateLayer}
                  updateCity = {this.updateCity}
                  updateLayerType = {this.updateLayerType}/>
                <Map 
                  layer={layer}
                  city={city}
                  layer_type = {layer_type}
                  updateLayer = {this.updateLayer}/>
                </>}/>
        </Routes>
          {/* <React.StrictMode>
              <Sidebar
                updateLayer = {this.updateLayer}
                updateCity = {this.updateCity}
                updateLayerType = {this.updateLayerType}
              />
              
              <Map 
                layer={layer}
                city={city}
                layer_type = {layer_type}
                updateLayer = {this.updateLayer}
              />
          </React.StrictMode> */}
      </div>
    );
  }
}
