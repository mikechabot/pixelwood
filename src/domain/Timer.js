import { action, computed, observable } from 'mobx';
import {
  DAYS_IN_WORLD_YEAR,
  SEASON_RANGE,
  TICK_SPEED,
  TICK_SPEED_LIST,
  TICK_SPEED_RATE,
} from './const/timer';

/**
 * A singleton class that tracks world tick
 */
class Timer {

  interval = null;

  @observable tick = 0;
  @observable day = 0;
  @observable year = 0;
  @observable isNewYear = false;
  @observable tickSpeed = TICK_SPEED.NORMAL;
  @observable isRunning = false;

  @computed get tickSpeedIndex() {
    return TICK_SPEED_LIST.indexOf(this.tickSpeed);
  }

  @computed get nextTickSpeed() {
    return TICK_SPEED_LIST[this.tickSpeedIndex + 1];
  }

  @computed get previousTickSpeed() {
    return TICK_SPEED_LIST[this.tickSpeedIndex - 1];
  }

  @computed get tickSpeedRate() {
    return TICK_SPEED_RATE[this.tickSpeed];
  }

  @computed get progressRate() {
    return this.day / DAYS_IN_WORLD_YEAR * 100;
  }

  @computed get season() {
    return Object
      .keys(SEASON_RANGE)
      .find(key =>
        this.progressRate >= SEASON_RANGE[key][0]
        && this.progressRate <= SEASON_RANGE[key][1]
      );
  }

  @action
  setTickSpeed(tickSpeed) {
    this.tickSpeed = tickSpeed;
  }

  @action.bound
  onTick() {
    this.tick += 1;
    if (this.day + 1 <= DAYS_IN_WORLD_YEAR) {
      this.isNewYear = false;
      this.day += 1;
    } else {
      this.isNewYear = true;
      this.day = 0;
      this.year += 1;
    }
  }

  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.interval = setInterval(
        this.onTick,
        this.tickSpeedRate
      );
    }
  }

  stop() {
    this.isRunning = false;
    clearInterval(this.interval);
    this.interval = null;
  }

  restart() {
    if (this.isRunning) {
      this.stop();
      this.start();
    }
  }

  increaseTickSpeed() {
    if (this.nextTickSpeed) {
      this.setTickSpeed(this.nextTickSpeed);
      this.restart();
    }
  }

  decreaseTickSpeed() {
    if (this.previousTickSpeed) {
      this.setTickSpeed(this.previousTickSpeed);
      this.restart();
    }
  }

}

export default new Timer();
