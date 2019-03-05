export const CHILD_WORK_AGE = 10;

export const POPULATION_TABLE_SCHEMA = [
  { propKey: 'fullName', label: 'Name' },
  { propKey: 'age', label: 'Age' },
  { propKey: 'sex', label: 'Name' },
  { propKey: 'isWorker', label: 'isWorker' },
  { propKey: 'isAlive', label: 'isAlive' },
  { propKey: 'isMated', label: 'isMated' },
  { propKey: 'mate.fullName', label: 'Mate', defaultVal: 'None' },
  { propKey: 'hasChildren', label: 'hasChildren' },
  { propKey: 'family.numberOfChildren', label: '# of Children', defaultVal: 0 },
]


export const SEX = {
  MALE: 'Male',
  FEMALE: 'Female'
};

/**
 * Max age of a person when constructing the population
 * @type {number}
 */
export const MAX_INITIAL_AGE = 68;

/**
 * Max number of children a woman can birth
 * @type {number}
 */
export const MAX_CHILDREN = 10;

/**
 * Time lag between births
 * @type {number}
 */
export const MINIMUM_DAYS_SINCE_LAST_BIRTH = 365;

/**
 * Age when marrying becomes available
 * @type {number}
 */
export const MARRY_AGE = 15;

/**
 * Chance to create a family unit
 * @type {number}
 */
export const CREATE_FAMILY_UNIT_RATE = 0.005;

/**
 * Age between marryable peoples
 * @type {number}
 */
export const MARRY_AGE_RANGE = 10;

/**
 * Days on which to attempt procreation
 * @type {number}
 */
export const DAYS_TO_ATTEMPT_PROCREATION = 3;

/**
 * Chance to create a child
 * @type {number}
 */
export const CREATE_CHILD_RATE = 0.05;

/**
 * Chance a woman takes the man's last name
 * @type {number}
 */
export const TAKE_LAST_NAME = .25;

/**
 * Chance a woman hyphenates her name
 * @type {number}
 */
export const HYPHENATE_LAST_NAME = .25;

/**
 * Chance to die by age range.
 * @type {*[]}
 */
export const DEATH_CHANGE_RANGES = [
  {
    age: 5,
    modifier: 0.0001
  },
  {
    age: 15,
    modifier: 0.00001
  },
  {
    age: 20,
    modifier: 0.00002
  },
  {
    age: 30,
    modifier: 0.00003
  },
  {
    age: 40,
    modifier: 0.00004
  },
  {
    age: 50,
    modifier: 0.00005
  },
  {
    age: 60,
    modifier: 0.00007
  },
  {
    age: 70,
    modifier: 0.00009
  },
  {
    age: 80,
    modifier: 0.0001
  },
  {
    age: 85,
    modifier: 0.0003
  },
  {
    age: 90,
    modifier: 0.0006
  },
  {
    age: 95,
    modifier: 0.001
  },
  {
    age: 100,
    modifier: 0.005
  },
  {
    age: 120,
    modifier: 0.01
  }
];


