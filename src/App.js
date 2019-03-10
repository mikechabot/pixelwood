import React, { Component } from 'react';

import Header from './components/Header';
import PopulationList from './components/PopulationList';
import TickDetails from './components/tick/TickDisplay';
import TickControls from './components/tick/TickControls';

class App extends Component {

  render() {
    return (
      <div className="container">
        <Header/>
        <section className="section">
          <TickDetails />
          <TickControls/>
        </section>
        <section className="section">
          <PopulationList/>
        </section>
      </div>
    );
  }
}

export default App;
