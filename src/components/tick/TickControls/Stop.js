import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {faPause} from '@fortawesome/free-solid-svg-icons';

import ButtonControl from './ButtonControl';

import timer from 'domain/Timer';

@observer
class Stop extends Component {
  render() {
    return (
      <ButtonControl
        className="is-danger"
        onClick={() => timer.stop()}
        icon={faPause}
        disabled={!timer.isRunning}
      />
    )
  }
}

export default Stop;
