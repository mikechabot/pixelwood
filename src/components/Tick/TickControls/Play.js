import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {faPlay} from '@fortawesome/free-solid-svg-icons';

import ButtonControl from './ButtonControl';

import timer from 'domain/Timer';

@observer
class Play extends Component {
  render() {
    return (
      <ButtonControl
        className="is-success"
        onClick={() => timer.start()}
        icon={faPlay}
        disabled={timer.isRunning}
      />
    )
  }
}

export default Play;
