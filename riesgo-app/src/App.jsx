import React from 'react';
import Sidebar from './components/Sidebar'
import Info from './components/Info'
import Map from './components/Map'

export default class App extends React.Component {
  constructor(props) {
    super(props);

    //Initialize state of entire App
    this.state = {
      city: 'c_pasig',
      layer: 'l_pasig_flood'
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

  render() {
    const {
      layer,
      city
    } = this.state;
    return (
      <div className="App">
          <React.StrictMode>
              <Sidebar
                updateLayer = {this.updateLayer}
                updateCity = {this.updateCity}
              />
              <Info />
              <Map 
                layer={layer}
                city={city}
              />
          </React.StrictMode>
      </div>
    );
  }
}
