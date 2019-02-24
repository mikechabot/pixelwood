import React, { Component } from 'react';
import TimerControl from 'components/TimerControl';
import PopulationList from './components/PopulationList';
import Header from './components/Header';

class App extends Component {

  render() {
    return (
      <div className="container">
        <Header/>
        <TimerControl/>
        <PopulationList/>
      </div>
    );
  }
}

export default App;
