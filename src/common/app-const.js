export const DAYS_IN_WORLD_YEAR = 365;

export const DEFAULTS = {
  DEFAULT_POPULATION_SIZE: 18,
  DEFAULT_FOOD_COUNT: 2000.0,
  DEFAULT_WATER_COUNT: 3000.0,
  DEFAULT_TIMBER_COUNT: 100.0,
  DEFAULT_FIREWOOD_COUNT: 120.0,
  DEFAULT_STONE_COUNT: 60.0,
  DEFAULT_IRON_COUNT: 40.0
};

export const SEX = {
  MALE: "Male",
  FEMALE: "Female"
};

export const SEASON = {
  FALL: "Fall",
  SPRING: "Spring",
  SUMMER: "Summer",
  WINTER: "Winter"
};

export const PROFESSION_TYPE = {
  DOWSER: "Dowser",
  FORAGER: "Forager",
  LOGGER: "Logger",
  MASON: "Mason",
  MINER: "Miner",
  WOODCUTTER: "Woodcutter"
};

export const RESOURCE_TYPE = {
  FIREWOOD: "firewood",
  FOOD: "food",
  IRON: "iron",
  STONE: "stone",
  TIMBER: "timber",
  WATER: "water"
};

export const STRUCTURE_TYPE = {
  CISTERN: "cistern",
  DRYING_HUT: "dryingHut",
  MINE: "mine",
  QUARRY: "quarry",
  WOODSHED: "woodshed"
};

export const STRUCTURE_TICK_TIMES = {
  [STRUCTURE_TYPE.CISTERN]: 90,
  [STRUCTURE_TYPE.DRYING_HUT]: 90,
  [STRUCTURE_TYPE.MINE]: 180,
  [STRUCTURE_TYPE.QUARRY]: 120,
  [STRUCTURE_TYPE.WOODSHED]: 60
};

export const STRUCTURE_LABEL = {
  [STRUCTURE_TYPE.CISTERN]: "Cistern",
  [STRUCTURE_TYPE.DRYING_HUT]: "Drying Hut",
  [STRUCTURE_TYPE.MINE]: "Mine",
  [STRUCTURE_TYPE.QUARRY]: "Quarry",
  [STRUCTURE_TYPE.WOODSHED]: "Woodshed"
};

export const RESOURCE_ICON_MAP = {
  [RESOURCE_TYPE.FIREWOOD]: "custom-firewood",
  [RESOURCE_TYPE.FOOD]: "custom-food",
  [RESOURCE_TYPE.IRON]: "custom-iron",
  [RESOURCE_TYPE.STONE]: "custom-stone",
  [RESOURCE_TYPE.TIMBER]: "custom-timber",
  [RESOURCE_TYPE.WATER]: "custom-water"
};

export const RESOURCE_LABEL = {
  [RESOURCE_TYPE.FIREWOOD]: "Firewood",
  [RESOURCE_TYPE.FOOD]: "Food",
  [RESOURCE_TYPE.IRON]: "Iron",
  [RESOURCE_TYPE.STONE]: "Stone",
  [RESOURCE_TYPE.TIMBER]: "Timber",
  [RESOURCE_TYPE.WATER]: "Water"
};

export const CREATE_FAMILY_UNIT_RATE = 0.005;
export const SAME_SEX_MARRIAGE_RATE = 0.1;
export const CREATE_CHILD_RATE = 0.05;
export const PROCREATION_ATTEMPT_RATE = 2;
export const MINIMUM_DAYS_SINCE_LAST_BIRTH = 365;
export const CHILD_WORK_AGE = 7;
export const MARRY_AGE = 15;
export const MARRY_AGE_RANGE = 10;

export const WOODCUTTER_TO_FIREWOOD_GENERATION_RATES = {
  [SEASON.FALL]: 0.1,
  [SEASON.SPRING]: 0.1,
  [SEASON.SUMMER]: 0.1,
  [SEASON.WINTER]: 0.1
};

export const LOGGER_TO_TIMBER_GENERATION_RATES = {
  [SEASON.FALL]: 0.1,
  [SEASON.SPRING]: 0.1,
  [SEASON.SUMMER]: 0.1,
  [SEASON.WINTER]: 0.1
};

export const MASON_TO_STONE_GENERATION_RATES = {
  [SEASON.FALL]: 0.05,
  [SEASON.SPRING]: 0.05,
  [SEASON.SUMMER]: 0.05,
  [SEASON.WINTER]: 0.05
};

export const MINER_TO_IRON_GENERATION_RATES = {
  [SEASON.FALL]: 0.05,
  [SEASON.SPRING]: 0.05,
  [SEASON.SUMMER]: 0.05,
  [SEASON.WINTER]: 0.05
};

export const DOWSER_TO_WATER_GENERATION_RATES = {
  [SEASON.FALL]: 0.7,
  [SEASON.SPRING]: 0.7,
  [SEASON.SUMMER]: 0.5,
  [SEASON.WINTER]: 0.9
};

export const FORAGER_TO_FOOD_GENERATIONS_RATES = {
  [SEASON.FALL]: 0.9,
  [SEASON.SPRING]: 0.7,
  [SEASON.SUMMER]: 0.7,
  [SEASON.WINTER]: 0.5
};

export const FOOD_CONSUMPTION_RATES_SEASON = {
  [SEASON.FALL]: 2.5,
  [SEASON.SPRING]: 2.0,
  [SEASON.SUMMER]: 2.0,
  [SEASON.WINTER]: 3.5
};

export const WATER_CONSUMPTION_RATES_SEASON = {
  [SEASON.FALL]: 2.5,
  [SEASON.SPRING]: 2.0,
  [SEASON.SUMMER]: 3.5,
  [SEASON.WINTER]: 2.0
};

export const FIREWOOD_CONSUMPTION_RATES_SEASON = {
  [SEASON.FALL]: 0.2,
  [SEASON.SPRING]: 0.2,
  [SEASON.SUMMER]: 0.2,
  [SEASON.WINTER]: 1.0
};

export const FOOD_AND_WATER_GENERATION_RATE_AGE = [
  { age: 5, rate: 0.01 },
  { age: 15, rate: 0.02 },
  { age: 20, rate: 0.03 },
  { age: 30, rate: 0.04 },
  { age: 40, rate: 0.05 },
  { age: 50, rate: 0.06 },
  { age: 60, rate: 0.07 },
  { age: 70, rate: 0.06 },
  { age: 100, rate: 0.05 }
];

export const FOOD_AND_WATER_CONSUMPTION_RATE_AGE = [
  { age: 5, rate: 0.01 },
  { age: 15, rate: 0.03 },
  { age: 20, rate: 0.04 },
  { age: 30, rate: 0.05 },
  { age: 40, rate: 0.06 },
  { age: 50, rate: 0.07 },
  { age: 60, rate: 0.08 },
  { age: 70, rate: 0.06 },
  { age: 100, rate: 0.05 }
];

export const SPEED_MAP = {
  NORMAL: 1000,
  FAST: 500,
  FASTER: 200,
  FASTEST: 100,
  LUDICROUS: 2
};

export const SPEED_LIST = Object.keys(SPEED_MAP).map(k => SPEED_MAP[k]);

export const MIN_SPEED = SPEED_LIST[0];
export const MAX_SPEED = SPEED_LIST[SPEED_LIST.length - 1];

export const DEFAULT_SPEED = SPEED_MAP.NORMAL;

export const STAGE = {
  EARLY: "Early",
  LATE: "Late"
};

export const SEASON_RANGES = {
  [SEASON.SPRING]: [0, 25.0],
  [SEASON.SUMMER]: [25.0, 50.0],
  [SEASON.FALL]: [50.0, 75.0],
  [SEASON.WINTER]: [75.0, 100.0]
};

export const VERBOSE_SEASON_RANGES = {
  [`${STAGE.EARLY} ${SEASON.SPRING}`]: [0.0, 8.33],
  [SEASON.SPRING]: [8.33, 16.66],
  [`${STAGE.LATE} ${SEASON.SPRING}`]: [16.66, 25.0],
  [`${STAGE.EARLY} ${SEASON.SUMMER}`]: [25.0, 33.33],
  [SEASON.SUMMER]: [33.33, 41.66],
  [`${STAGE.LATE} ${SEASON.SUMMER}`]: [41.66, 50.0],
  [`${STAGE.EARLY} ${SEASON.FALL}`]: [50.0, 58.33],
  [SEASON.FALL]: [58.33, 66.66],
  [`${STAGE.LATE} ${SEASON.FALL}`]: [66.66, 75.0],
  [`${STAGE.EARLY} ${SEASON.WINTER}`]: [75.0, 83.33],
  [SEASON.WINTER]: [83.33, 91.66],
  [`${STAGE.LATE} ${SEASON.WINTER}`]: [91.66, 100.0]
};

export const DEATH_CHANGE_RANGES = [
  { age: 5, modifier: 0.0001 },
  { age: 15, modifier: 0.00001 },
  { age: 20, modifier: 0.00002 },
  { age: 30, modifier: 0.00003 },
  { age: 40, modifier: 0.00004 },
  { age: 50, modifier: 0.00005 },
  { age: 60, modifier: 0.00007 },
  { age: 70, modifier: 0.00009 },
  { age: 80, modifier: 0.0001 },
  { age: 85, modifier: 0.0003 },
  { age: 90, modifier: 0.0006 },
  { age: 95, modifier: 0.001 },
  { age: 100, modifier: 0.005 },
  { age: 120, modifier: 0.01 }
];

export const STATISTICS_CHARTS = [
  {
    label: RESOURCE_LABEL[RESOURCE_TYPE.FOOD],
    key: RESOURCE_TYPE.FOOD,
    category: "resources",
    hexTheme: "#23d260",
    offset: 1000,
    icon: RESOURCE_ICON_MAP[RESOURCE_TYPE.FOOD]
  },
  {
    label: RESOURCE_LABEL[RESOURCE_TYPE.WATER],
    key: RESOURCE_TYPE.WATER,
    category: "resources",
    hexTheme: "#209cee",
    offset: 1000,
    icon: RESOURCE_ICON_MAP[RESOURCE_TYPE.WATER]
  },
  {
    label: RESOURCE_LABEL[RESOURCE_TYPE.TIMBER],
    key: RESOURCE_TYPE.TIMBER,
    category: "resources",
    hexTheme: "#A11662",
    offset: 50,
    icon: RESOURCE_ICON_MAP[RESOURCE_TYPE.TIMBER]
  },
  {
    label: RESOURCE_LABEL[RESOURCE_TYPE.FIREWOOD],
    key: RESOURCE_TYPE.FIREWOOD,
    category: "resources",
    hexTheme: "brown",
    offset: 50,
    icon: RESOURCE_ICON_MAP[RESOURCE_TYPE.FIREWOOD]
  },
  {
    label: RESOURCE_LABEL[RESOURCE_TYPE.STONE],
    key: RESOURCE_TYPE.STONE,
    category: "resources",
    hexTheme: "#084B9C",
    offset: 50,
    icon: RESOURCE_ICON_MAP[RESOURCE_TYPE.STONE]
  },
  {
    label: RESOURCE_LABEL[RESOURCE_TYPE.IRON],
    key: RESOURCE_TYPE.IRON,
    category: "resources",
    hexTheme: "purple",
    offset: 50,
    icon: RESOURCE_ICON_MAP[RESOURCE_TYPE.IRON]
  },
  {
    label: "Population",
    key: "population",
    category: "census",
    hexTheme: "#ff3860",
    offset: 10,
    icon: "custom-population"
  },
  {
    label: "Workforce",
    key: "workforce",
    category: "census",
    hexTheme: "orange",
    offset: 5,
    icon: "custom-labor-pool"
  },
  {
    label: "Families",
    key: "families",
    category: "census",
    hexTheme: "#363636",
    offset: 5,
    icon: "custom-family"
  }
];

export const STRUCTURES = [
  {
    name: STRUCTURE_LABEL[STRUCTURE_TYPE.DRYING_HUT],
    resourceKey: RESOURCE_TYPE.FOOD,
    structureKey: STRUCTURE_TYPE.DRYING_HUT,
    ticks: STRUCTURE_TICK_TIMES[STRUCTURE_TYPE.DRYING_HUT],
    icon: "custom-drying-hut",
    max: -1,
    maxWorkers: 4,
    description: ["Small wooden hut used by foragers to dry and store food."],
    cost: [
      { value: 30, resource: RESOURCE_TYPE.TIMBER },
      { value: 20, resource: RESOURCE_TYPE.STONE }
    ]
  },
  {
    name: STRUCTURE_LABEL[STRUCTURE_TYPE.WOODSHED],
    resourceKey: RESOURCE_TYPE.TIMBER,
    structureKey: STRUCTURE_TYPE.WOODSHED,
    ticks: STRUCTURE_TICK_TIMES[STRUCTURE_TYPE.WOODSHED],
    icon: RESOURCE_ICON_MAP[RESOURCE_TYPE.FIREWOOD],
    max: -1,
    maxWorkers: 4,
    description: ["Place for timber to be deposited by lumberjacks."],
    cost: [
      { value: 30, resource: RESOURCE_TYPE.TIMBER },
      { value: 15, resource: RESOURCE_TYPE.STONE }
    ]
  },
  {
    name: STRUCTURE_LABEL[STRUCTURE_TYPE.CISTERN],
    resourceKey: RESOURCE_TYPE.WATER,
    structureKey: STRUCTURE_TYPE.CISTERN,
    ticks: STRUCTURE_TICK_TIMES[STRUCTURE_TYPE.CISTERN],
    icon: RESOURCE_ICON_MAP[RESOURCE_TYPE.WATER],
    max: -1,
    maxWorkers: 4,
    description: ["Large stone receptacle for storing water found by dowsers."],
    cost: [
      { value: 120, resource: RESOURCE_TYPE.TIMBER },
      { value: 45, resource: RESOURCE_TYPE.STONE }
    ]
  },
  {
    name: STRUCTURE_LABEL[STRUCTURE_TYPE.QUARRY],
    resourceKey: RESOURCE_TYPE.STONE,
    structureKey: STRUCTURE_TYPE.QUARRY,
    ticks: STRUCTURE_TICK_TIMES[STRUCTURE_TYPE.QUARRY],
    icon: RESOURCE_ICON_MAP[RESOURCE_TYPE.STONE],
    max: -1,
    maxWorkers: 2,
    description: [
      "Establish a quarry by cutting into nearby granite deposits."
    ],
    cost: [
      { value: 180, resource: RESOURCE_TYPE.TIMBER },
      { value: 40, resource: RESOURCE_TYPE.IRON }
    ]
  },
  {
    name: STRUCTURE_LABEL[STRUCTURE_TYPE.MINE],
    resourceKey: RESOURCE_TYPE.IRON,
    structureKey: STRUCTURE_TYPE.MINE,
    ticks: STRUCTURE_TICK_TIMES[STRUCTURE_TYPE.MINE],
    icon: RESOURCE_ICON_MAP[RESOURCE_TYPE.IRON],
    max: -1,
    maxWorkers: 2,
    description: ["Extract precious metals by digging deep into the Earth."],
    cost: [
      { value: 200, resource: RESOURCE_TYPE.TIMBER },
      { value: 120, resource: RESOURCE_TYPE.STONE }
    ]
  },
  {
    name: null
  }
];

export const PROFESSIONS = [
  {
    name: PROFESSION_TYPE.FORAGER,
    resourceKey: RESOURCE_TYPE.FOOD,
    structureKey: STRUCTURE_TYPE.DRYING_HUT,
    icon: RESOURCE_ICON_MAP[RESOURCE_TYPE.FOOD],
    max: 4,
    tooltip: "Well-fed villagers consume less water. A well-fed population is able to expand.",
    description:
      "Gathers nuts, berries, mushrooms, and roots by searching nearby forests."
  },
  {
    name: PROFESSION_TYPE.DOWSER,
    resourceKey: RESOURCE_TYPE.WATER,
    structureKey: STRUCTURE_TYPE.CISTERN,
    icon: RESOURCE_ICON_MAP[RESOURCE_TYPE.WATER],
    max: 3,
    tooltip: "Hydrated villagers consume less food. A hydrated population is able to expand.",
    description: "Uses divination rods to locate nearby water sources."
  },
  {
    name: PROFESSION_TYPE.LOGGER,
    resourceKey: RESOURCE_TYPE.TIMBER,
    structureKey: STRUCTURE_TYPE.WOODSHED,
    icon: RESOURCE_ICON_MAP[RESOURCE_TYPE.TIMBER],
    max: 4,
    tooltip: "Timber is a vital resource that has many purposes.",
    description: "Harvests large amounts of timber from nearby forests."
  },
  {
    name: PROFESSION_TYPE.WOODCUTTER,
    resourceKey: RESOURCE_TYPE.FIREWOOD,
    structureKey: STRUCTURE_TYPE.WOODSHED,
    icon: RESOURCE_ICON_MAP[RESOURCE_TYPE.FIREWOOD],
    max: 4,
    tooltip: "Comfortable villagers consume less food and water.",
    description: "Chops timber into firewood, which keeps villagers warm and cozy."
  },
  {
    name: PROFESSION_TYPE.MASON,
    resourceKey: RESOURCE_TYPE.STONE,
    structureKey: STRUCTURE_TYPE.QUARRY,
    icon: RESOURCE_ICON_MAP[RESOURCE_TYPE.STONE],
    max: 2,
    tooltip: "Masonry is a dangerous profession, beware!",
    description: "Works in a quarry to cut and harvest stone."
  },
  {
    name: PROFESSION_TYPE.MINER,
    resourceKey: RESOURCE_TYPE.IRON,
    structureKey: STRUCTURE_TYPE.MINE,
    icon: RESOURCE_ICON_MAP[RESOURCE_TYPE.IRON],
    max: 2,
    tooltip: "Mining is a dangerous profession, beware!",
    description: "Works in a mine to harvest iron."
  }
];

/**
 * Reduce statistics logging with higher tick rates
 */
export function getHistoryLogRate(tickSpeed) {
  switch (tickSpeed) {
    case 125:
      return 12;
    case 10:
      return 60;
    case 1:
      return 120;
    default:
      return 5;
  }
}

/**
 * Generate a new history object used for statistics tracking
 */
export function getNewHistory() {
  const history = {
    census: {
      population: [],
      workforce: [],
      families: []
    },
    resources: {}
  };

  Object.keys(RESOURCE_TYPE).forEach(resourceType => {
    history.resources[RESOURCE_TYPE[resourceType]] = [];
  });

  return history;
}
