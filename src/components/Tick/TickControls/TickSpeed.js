import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {TICK_SPEED_DIVISOR} from '../../../domain/const/timer';

import timer from 'domain/Timer';

@observer
class TickSpeed extends Component {
  render() {
    return (
      <button className="button is-dark">
        { TICK_SPEED_DIVISOR[timer.tickSpeed] }x
      </button>
    )
  }
}

export default TickSpeed;
