import React, {Component} from 'react';
import { observer } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faForward } from '@fortawesome/free-solid-svg-icons'
import { faBackward } from '@fortawesome/free-solid-svg-icons'
import { faPause } from '@fortawesome/free-solid-svg-icons'
import { faPlay } from '@fortawesome/free-solid-svg-icons'

import timer from 'domain/Timer';
import { TICK_SPEED_DIVISOR } from '../domain/const/timer';

@observer
class TimerControl extends Component {

  render() {
    return (
      <section className="section">
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
        <div className="has-text-centered">
          <button className="button is-dark" disabled={!timer.previousTickSpeed} onClick={() => timer.decreaseTickSpeed()}>
            <FontAwesomeIcon icon={faBackward} />
          </button>
          <button className="button is-success" disabled={timer.isRunning} onClick={() => timer.start()}>
            <FontAwesomeIcon icon={faPlay} />
          </button>
          <button className="button is-danger" disabled={!timer.isRunning} onClick={() => timer.stop()}>
            <FontAwesomeIcon icon={faPause} />
          </button>
          <button className="button is-dark">
            { TICK_SPEED_DIVISOR[timer.tickSpeed] }x
          </button>
          <button className="button is-dark" disabled={!timer.nextTickSpeed} onClick={() => timer.increaseTickSpeed()}>
            <FontAwesomeIcon icon={faForward} />
          </button>
        </div>
      </section>
    );
  }
}

export default TimerControl;
