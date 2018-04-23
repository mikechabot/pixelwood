import { DAYS_IN_WORLD_YEAR, SPEED_LIST, DEFAULT_SPEED } from '../common/app-const';

function IncrementFromValueToValue(min = 0, max = -1) {
    this.value = min;
    this.min = min;
    this.max = max;
}

IncrementFromValueToValue.prototype = {
    increment() {
        const temp = this.value + 1;
        this.value = this.max === -1 || temp <= this.max ? temp : this.min;
    },
    getValue() {
        return this.value;
    }
};

function WorldTimer(onTick) {
    this.onTick = onTick;

    this.day = new IncrementFromValueToValue(1, DAYS_IN_WORLD_YEAR);
    this.year = new IncrementFromValueToValue(0);

    this.tickSpeed = DEFAULT_SPEED;
    this.interval = null;
}
WorldTimer.prototype.isRunning = function() {
    return !!this.interval;
};

WorldTimer.prototype.start = function() {
    if (!this.isRunning()) {
        this.interval = setInterval(this.tick.bind(this), this.getTickSpeed());
        if (this.onTick) {
            this.onTick(this);
        }
    }
};

WorldTimer.prototype.stop = function() {
    if (this.isRunning()) {
        clearInterval(this.interval);
        this.interval = null;
        if (this.onTick) {
            this.onTick(this);
        }
    }
};

WorldTimer.prototype.restart = function() {
    this.stop();
    this.start();
};

WorldTimer.prototype.flush = function() {
    if (this.isRunning()) {
        this.restart();
    }
    if (this.onTick) {
        this.onTick(this);
    }
};

WorldTimer.prototype.getYear = function() {
    return this.year.getValue();
};

WorldTimer.prototype.getDay = function() {
    return this.day.getValue();
};

WorldTimer.prototype.getTickSpeed = function() {
    return this.tickSpeed;
};

WorldTimer.prototype.setTickSpeed = function(tickSpeed) {
    this.tickSpeed = tickSpeed;
};

WorldTimer.prototype.getDailyProgress = function() {
    return this.getDay() / this.day.max * 100;
};

WorldTimer.prototype.getSpeedIndex = function() {
    return SPEED_LIST.indexOf(this.getTickSpeed());
};

WorldTimer.prototype.increaseTickSpeed = function() {
    if (this.getSpeedIndex() !== SPEED_LIST.length - 1) {
        this.setTickSpeed(SPEED_LIST[this.getSpeedIndex() + 1]);
    }
    this.flush();
};

WorldTimer.prototype.decreaseTickSpeed = function() {
    if (this.getSpeedIndex() > 0) {
        this.setTickSpeed(SPEED_LIST[this.getSpeedIndex() - 1]);
    }
    this.flush();
};

WorldTimer.prototype.tick = function() {
    this.day.increment();
    if (this.day.getValue() === 1) {
        this.year.increment();
    }
    if (this.onTick) {
        this.onTick(this);
    }
};

export default WorldTimer;
