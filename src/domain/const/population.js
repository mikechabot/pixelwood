export const CHILD_WORK_AGE = 10;

export const SEX = {
  MALE: 'Male',
  FEMALE: 'Female'
};

export const MAX_INITIAL_AGE = 68;
export const MAX_CHILDREN = 10;

export const MINIMUM_DAYS_SINCE_LAST_BIRTH = 365;

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

export const MARRY_AGE = 15;
export const CREATE_FAMILY_UNIT_RATE = 0.005;
export const MARRY_AGE_RANGE = 10;
export const PROCREATION_ATTEMPT_RATE = 3;
export const CREATE_CHILD_RATE = 0.05;
export const TAKE_LAST_NAME = .25;
export const HYPHENATE_LAST_NAME = .25;
