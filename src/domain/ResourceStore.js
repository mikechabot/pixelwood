import {
  DEFAULTS,
  FOOD_CONSUMPTION_RATES_SEASON,
  WATER_CONSUMPTION_RATES_SEASON,
  FOOD_AND_WATER_CONSUMPTION_RATE_AGE,
  FIREWOOD_CONSUMPTION_RATES_SEASON,
  DOWSER_TO_WATER_GENERATION_RATES,
  FORAGER_TO_FOOD_GENERATIONS_RATES,
  LOGGER_TO_TIMBER_GENERATION_RATES,
  WOODCUTTER_TO_FIREWOOD_GENERATION_RATES,
  MASON_TO_STONE_GENERATION_RATES,
  MINER_TO_IRON_GENERATION_RATES,
  getHistoryLogRate
} from "../common/app-const";

const {
  DEFAULT_FOOD_COUNT,
  DEFAULT_WATER_COUNT,
  DEFAULT_TIMBER_COUNT,
  DEFAULT_FIREWOOD_COUNT,
  DEFAULT_STONE_COUNT,
  DEFAULT_IRON_COUNT
} = DEFAULTS;

function ResourceStore(
  food = DEFAULT_FOOD_COUNT,
  water = DEFAULT_WATER_COUNT,
  timber = DEFAULT_TIMBER_COUNT,
  firewood = DEFAULT_FIREWOOD_COUNT,
  stone = DEFAULT_STONE_COUNT,
  iron = DEFAULT_IRON_COUNT
) {
  this.food = food;
  this.water = water;
  this.timber = timber;
  this.firewood = firewood;
  this.stone = stone;
  this.iron = iron;
}

ResourceStore.prototype.isOutOfResource = function(resourceType) {
  return !this.hasXOfResource(resourceType, 0);
};

ResourceStore.prototype.hasXOfResource = function(resourceType, value) {
  if (this[resourceType]) {
    return this[resourceType] - value >= 0;
  }
};

ResourceStore.prototype.reduceResourceByX = function(resourceType, value) {
  if (this[resourceType]) {
    this[resourceType] = this[resourceType] - value;
  }
};

ResourceStore.prototype.getResourceCountByType = function(resourceType) {
  return this[resourceType];
};


ResourceStore.prototype.getFoodCount = function() {
  return this.food;
};

ResourceStore.prototype.setFoodCount = function(food) {
  this.food = food || 0;
};

ResourceStore.prototype.isOutOfFood = function() {
  return this.food === 0;
};

ResourceStore.prototype.getWaterCount = function() {
  return this.water;
};

ResourceStore.prototype.setWaterCount = function(water) {
  this.water = water || 0;
};

ResourceStore.prototype.isOutOfWater = function() {
  return this.water === 0;
};

ResourceStore.prototype.getTimberCount = function() {
  return this.timber;
};

ResourceStore.prototype.setTimberCount = function(timber) {
  this.timber = timber || 0;
};

ResourceStore.prototype.isOutOfTimber = function() {
  return this.timber === 0;
};

ResourceStore.prototype.getFirewoodCount = function() {
  return this.firewood;
};

ResourceStore.prototype.setFirewoodCount = function(firewood) {
  this.firewood = firewood || 0;
};

ResourceStore.prototype.isOutOfFirewood = function() {
  return this.firewood === 0;
};

ResourceStore.prototype.getStoneCount = function() {
  return this.stone;
};

ResourceStore.prototype.setStoneCount = function(stone) {
  this.stone = stone || 0;
};

ResourceStore.prototype.isOutOfStone = function() {
  return this.stone === 0;
};

ResourceStore.prototype.getIronCount = function() {
  return this.iron;
};

ResourceStore.prototype.setIronCount = function(iron) {
  this.iron = iron || 0;
};

ResourceStore.prototype.isOutOfIron = function() {
  return this.iron === 0;
};

ResourceStore.prototype.generateAndConsumeResources = function(
  tickMetadata,
  population,
  worldTimer,
  history
) {
  const { isNewDay, isNewSeason } = tickMetadata;
  const resourceMap = this.getResoureMap();

  Object.keys(resourceMap).forEach(key => {
    const { resourceKey, rates, setter, getter } = resourceMap[key];
    rates.forEach(_rate => {
      const {
        condition,
        dayTick,
        seasonTick,
        rate,
        operation,
        profession,
        modifiers
      } = _rate;

      let conditionFunc;
      if (condition) {
        conditionFunc = condition.bind(this);
      }

      if (!conditionFunc || conditionFunc()) {
        if (modifiers) {
          modifiers.forEach(modifier => {
            modifier.condition = modifier.condition.bind(this);
          });
        }

        if (seasonTick && isNewSeason) {
          this.__generateOrConsumeResource(
            population,
            worldTimer,
            history,
            rate,
            profession,
            setter.bind(this),
            getter.bind(this),
            operation,
            modifiers,
            resourceKey
          );
        } else if (dayTick && isNewDay) {
          this.__generateOrConsumeResource(
            population,
            worldTimer,
            history,
            rate,
            profession,
            setter.bind(this),
            getter.bind(this),
            operation,
            modifiers,
            resourceKey
          );
        }
      }
    });
  });
};

ResourceStore.prototype.__generateOrConsumeResource = function(
  population,
  worldTimer,
  history,
  rates,
  profession,
  setter,
  getter,
  operation,
  modifiers,
  resourceKey
) {
  const { season, tickSpeed } = worldTimer;
  if (getter() >= 0) {
    if (profession) {
      const workers = population.getWorkersByProfession(profession);
      __setOperation(
        workers,
        rates,
        season,
        operation,
        modifiers,
        getter,
        setter
      );
    } else {
      const living = population.getLivingPopulation();
      __setOperation(
        living,
        rates,
        season,
        operation,
        modifiers,
        getter,
        setter
      );
    }
  }
  __logOperation(resourceKey, tickSpeed, worldTimer, history, getter);
  return getter();
};

ResourceStore.prototype.getResoureMap = function() {
  return {
    FOOD: {
      resourceKey: "food",
      setter: this.setFoodCount,
      getter: this.getFoodCount,
      rates: [
        {
          dayTick: true,
          profession: "Forager",
          rate: FORAGER_TO_FOOD_GENERATIONS_RATES,
          operation: __add
        },
        {
          rate: FOOD_CONSUMPTION_RATES_SEASON,
          operation: __subtract,
          seasonTick: true,
          modifiers: [
            {
              condition: this.isOutOfWater,
              multiplier: 3
            },
            {
              condition: this.isOutOfFirewood,
              multiplier: 2
            }
          ]
        },
        {
          rate: FOOD_AND_WATER_CONSUMPTION_RATE_AGE,
          operation: __subtract,
          dayTick: true,
          modifiers: [
            {
              condition: this.isOutOfWater,
              multiplier: 3
            },
            {
              condition: this.isOutOfFirewood,
              multiplier: 2
            }
          ]
        }
      ]
    },
    WATER: {
      resourceKey: "water",
      setter: this.setWaterCount,
      getter: this.getWaterCount,
      rates: [
        {
          dayTick: true,
          profession: "Dowser",
          rate: DOWSER_TO_WATER_GENERATION_RATES,
          operation: __add
        },
        {
          rate: WATER_CONSUMPTION_RATES_SEASON,
          seasonTick: true,
          operation: __subtract,
          modifiers: [
            {
              condition: this.isOutOfFood,
              multiplier: 3
            },
            {
              condition: this.isOutOfFirewood,
              multiplier: 2
            }
          ]
        },
        {
          rate: FOOD_AND_WATER_CONSUMPTION_RATE_AGE,
          dayTick: true,
          operation: __subtract,
          modifiers: [
            {
              condition: this.isOutOfFood,
              multiplier: 5
            },
            {
              condition: this.isOutOfFirewood,
              multiplier: 2
            }
          ]
        }
      ]
    },
    TIMBER: {
      resourceKey: "timber",
      setter: this.setTimberCount,
      getter: this.getTimberCount,
      rates: [
        {
          dayTick: true,
          profession: "Logger",
          rate: LOGGER_TO_TIMBER_GENERATION_RATES,
          operation: __add
        },
        {
          dayTick: true,
          profession: "Woodcutter",
          rate: WOODCUTTER_TO_FIREWOOD_GENERATION_RATES,
          operation: __subtract
        }
      ]
    },
    FIREWOOD: {
      resourceKey: "firewood",
      setter: this.setFirewoodCount,
      getter: this.getFirewoodCount,
      rates: [
        {
          seasonTick: true,
          rate: FIREWOOD_CONSUMPTION_RATES_SEASON,
          operation: __subtract
        },
        {
          dayTick: true,
          profession: "Woodcutter",
          rate: WOODCUTTER_TO_FIREWOOD_GENERATION_RATES,
          operation: __add
        }
      ]
    },
    STONE: {
      resourceKey: "stone",
      setter: this.setStoneCount,
      getter: this.getStoneCount,
      rates: [
        {
          dayTick: true,
          profession: "Mason",
          rate: MASON_TO_STONE_GENERATION_RATES,
          operation: __add
        }
      ]
    },
    IRON: {
      resourceKey: "iron",
      setter: this.setIronCount,
      getter: this.getIronCount,
      rates: [
        {
          dayTick: true,
          profession: "Miner",
          rate: MINER_TO_IRON_GENERATION_RATES,
          operation: __add
        }
      ]
    }
  };
};

function __logOperation(resourceKey, tickSpeed, worldTimer, history, getter) {
  let logRate = getHistoryLogRate(tickSpeed);
  if (worldTimer.day % logRate === 0) {
    history.resources[resourceKey].push({
      year: worldTimer.year,
      x: `Day: ${worldTimer.day} Year ${worldTimer.year}`,
      y: getter()
    });
  }
}

function __setOperation(
  population,
  rates,
  season,
  operation,
  modifiers,
  getter,
  setter
) {
  population.forEach(person => {
    let rate = Array.isArray(rates)
      ? rates.find(r => person.age <= r.age).rate
      : rates[season];

    if (modifiers) {
      modifiers.forEach(modifier => {
        if (modifier.condition()) {
          rate = rate * modifier.multiplier;
        }
      });
    }

    let temp = parseFloat(parseFloat(operation(getter(), rate)).toFixed(2));
    setter(temp > 0 ? temp : 0);
  });
}

function __add(a, b) {
  return a + b;
}

function __subtract(a, b) {
  return a - b;
}

export default ResourceStore;
