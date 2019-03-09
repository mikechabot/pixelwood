import React, {Component} from 'react';

import SlowDown from './SlowDown';
import SpeedUp from './SpeedUp';
import Play from './Play';
import Stop from './Stop';
import TickSpeed from './TickSpeed';

class TickControls extends Component {
  render() {
    return (
      <div className="has-text-centered">
        <SlowDown />
        <Play />
        <Stop />
        <TickSpeed />
        <SpeedUp/>
      </div>
    );
  }
}

export default TickControls;
