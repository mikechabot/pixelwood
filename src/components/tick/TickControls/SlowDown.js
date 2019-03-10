import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {faBackward} from '@fortawesome/free-solid-svg-icons';

import ButtonControl from './ButtonControl';

import timer from 'domain/Timer';

@observer
class SlowDown extends Component {
  render() {
    return (
      <ButtonControl
        className="is-dark"
        onClick={() => timer.decreaseTickSpeed()}
        icon={faBackward}
        disabled={!timer.previousTickSpeed}
      />
    )
  }
}

export default SlowDown;
