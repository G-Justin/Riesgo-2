import Sidebar from './components/Sidebar'
import Map from './components/Map'
import React from 'react';

function App() {
  return (
    <div className="App">
        <React.StrictMode>
            <Sidebar />
            <Map />
        </React.StrictMode>
    </div>
  );
}

export default App;
