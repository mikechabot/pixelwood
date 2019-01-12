import { MARRY_AGE_RANGE } from '../domain/const/population';

export const areWithinMarryRange = (citizenA, citizenB) => {
  return Math.abs(citizenA.age - citizenB.age) <= MARRY_AGE_RANGE;
};

