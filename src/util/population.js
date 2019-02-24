import {
  CHILD_WORK_AGE,
  CREATE_CHILD_RATE,
  CREATE_FAMILY_UNIT_RATE,
  DEATH_CHANGE_RANGES,
  HYPHENATE_LAST_NAME,
  DAYS_TO_ATTEMPT_PROCREATION,
  TAKE_LAST_NAME
} from '../domain/const/population';

export const getNumberBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

export const isAvailableToWork = (person) => {
  return (person.age >= CHILD_WORK_AGE);
};

export const isProcreationDay = (day) => {
  return day % DAYS_TO_ATTEMPT_PROCREATION === 0
}

export const shouldProcreate = () => {
  return !(Math.random() > CREATE_CHILD_RATE);
}

export const shouldTakeLastName = () => {
  return !(Math.random() > TAKE_LAST_NAME);
}

export const shouldHyphenateLastName = () => {
  return !(Math.random() > HYPHENATE_LAST_NAME);
}

export const shouldLive = (person) => {
  const ageRange = DEATH_CHANGE_RANGES.find(
    ageRange => person.age <= ageRange.age
  );
  return godFunction(ageRange.modifier);
};

export const shouldMarry = () => {
  return !(Math.random() > CREATE_FAMILY_UNIT_RATE);
}

const godFunction = (modifier) => {
  return !(Math.random() < (modifier));
}
