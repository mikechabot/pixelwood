import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {faForward} from '@fortawesome/free-solid-svg-icons';

import ButtonControl from './ButtonControl';

import timer from 'domain/Timer';

@observer
class SpeedUp extends Component {
  render() {
    return (
      <ButtonControl
        className="is-dark"
        onClick={() => timer.increaseTickSpeed()}
        icon={faForward}
        disabled={!timer.nextTickSpeed}
      />
    )
  }
}

export default SpeedUp;
