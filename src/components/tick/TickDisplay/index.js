import React, {Component} from 'react';
import { observer } from 'mobx-react';

import timer from 'domain/Timer';

@observer
class TickDetails extends Component {
  render() {
    return (
      <nav className="level box">
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">Ticks</p>
            <p className="title">{timer.tick}</p>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">Speed</p>
            <p className="title">{timer.tickSpeed} ({timer.tickSpeedRate}ms)</p>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">Day/Year</p>
            <p className="title">{timer.day} / {timer.year}</p>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">Season</p>
            <p className="title">{timer.season}</p>
          </div>
        </div>
      </nav>
    );
  }
}

export default TickDetails;
