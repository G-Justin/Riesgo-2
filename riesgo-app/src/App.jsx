import React from 'react';
import Sidebar from './components/Sidebar'
import Info from './components/Info'
import Map from './components/Map'

export default class App extends React.Component {
  constructor(props) {
    super(props);

    //Initialize state of entire App
    this.state = {
      //city: 'marikina',
      layer: 'l_pasig_flood'
    };

    this.updateLayer = this.updateLayer.bind(this);
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
      layer, //city
    } = this.state;
    return (
      <div className="App">
          <React.StrictMode>
              <Sidebar
                updateLayer = {this.updateLayer}
              />
              <Info />
              <Map 
                layer={layer}
              />
          </React.StrictMode>
      </div>
    );
  }
}
