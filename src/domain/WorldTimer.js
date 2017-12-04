import {
  DAYS_IN_WORLD_YEAR,
  SPEED_LIST,
  DEFAULT_SPEED,
  SEASON_RANGES,
  VERBOSE_SEASON_RANGES
} from "../common/app-const";

function WorldTimer(onTick) {
  this.onTick = onTick;
  this.interval = null;
  this.gameOver = false;
  this.data = {
    day: 0,
    year: 0,
    tickSpeed: DEFAULT_SPEED
  };
}

WorldTimer.prototype.start = function() {
  if (!this.isRunning()) {
    this.interval = setInterval(this.tick.bind(this), this.data.tickSpeed);
    this.onTick(this.getState());
  }
};

WorldTimer.prototype.stop = function() {
  if (this.isRunning()) {
    clearInterval(this.interval);
    this.interval = null;
    this.onTick(this.getState());
  }
};

WorldTimer.prototype.isRunning = function() {
  return !!this.interval;
};

WorldTimer.prototype.restart = function() {
  this.stop();
  this.start();
};

WorldTimer.prototype.isGameOver = function() {
  return this.gameOver;
};

WorldTimer.prototype.setGameOver = function(gameOver) {
  this.gameOver = gameOver;
};

WorldTimer.prototype.getYear = function() {
  return this.data.year;
};

WorldTimer.prototype.getDay = function() {
  return this.data.day;
};

WorldTimer.prototype.getTickSpeed = function() {
  return this.data.tickSpeed;
};

WorldTimer.prototype.getSeason = function() {
  const progress = this.getProgressRate();
  return Object.keys(SEASON_RANGES).find(key => {
    const range = SEASON_RANGES[key];
    return progress >= range[0] && progress <= range[1];
  });
};

WorldTimer.prototype.getVerboseSeason = function() {
  const progress = this.getProgressRate();
  return Object.keys(VERBOSE_SEASON_RANGES).find(key => {
    const range = VERBOSE_SEASON_RANGES[key];
    return progress >= range[0] && progress <= range[1];
  });
};

WorldTimer.prototype.getProgressRate = function() {
  return this.getDay() / DAYS_IN_WORLD_YEAR * 100;
};

WorldTimer.prototype.increaseSpeed = function() {
  if (this.getSpeedIndex() !== SPEED_LIST.length - 1) {
    this.__setTickSpeed(SPEED_LIST[this.getSpeedIndex() + 1]);
  }
  this.__flush();
};

WorldTimer.prototype.decreaseSpeed = function() {
  if (this.getSpeedIndex() > 0) {
    this.__setTickSpeed(SPEED_LIST[this.getSpeedIndex() - 1]);
  }
  this.__flush();
};

WorldTimer.prototype.__setTickSpeed = function(tickSpeed) {
  this.data.tickSpeed = tickSpeed;
};

WorldTimer.prototype.__flush = function() {
  if (this.isRunning()) {
    this.restart();
  }
  this.onTick(this.getState());
};

WorldTimer.prototype.getSpeedIndex = function() {
  return SPEED_LIST.indexOf(this.getTickSpeed());
};

WorldTimer.prototype.getState = function() {
  return {
    year: this.getYear(),
    day: this.getDay(),
    season: this.getSeason(),
    verboseSeason: this.getVerboseSeason(),
    tickSpeed: this.getTickSpeed()
  };
};

WorldTimer.prototype.tick = function() {
  const nextDay = this.data.day + 1;
  if (nextDay <= 365) {
    this.data.day = nextDay;
  } else {
    this.data.day = 0;
    this.data.year++;
  }
  this.onTick(this.getState());
};

export default WorldTimer;
