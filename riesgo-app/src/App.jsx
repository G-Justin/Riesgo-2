import React from 'react';
import Sidebar from './components/Sidebar'
import Info from './components/Info'
import Map from './components/Map'

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      layer: 'marikina'
    };

    this.updateVis = this.updateVis.bind(this);
  }

  updateVis = () => {
    let {layer} = this.state;

    //testing purposes
    layer = 'marikina';

    this.setState({
      layer
    });
  }

  render() {
    const {
      layer
    } = this.state;
    return (
      <div className="App">
          <React.StrictMode>
              <Sidebar />
              <Info />
              <Map 
                layer={layer}
              />
          </React.StrictMode>
      </div>
    );
  }
}
