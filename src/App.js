import React, { Component } from 'react';

import Header from './components/Header';
import PopulationList from './components/PopulationList';
import TickDetails from './components/Tick/TickDisplay';
import TickControls from './components/Tick/TickControls';

class App extends Component {

  render() {
    return (
      <div className="container">
        <Header/>
        <section className="section">
          <TickDetails />
          <TickControls/>
        </section>
        <PopulationList/>
      </div>
    );
  }
}

export default App;
