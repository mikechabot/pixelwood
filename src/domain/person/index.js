import { SEX } from '../const/population';

import Male from './Male';
import Female from './Female';

const randomSex = () => {
  return Math.random() > .5
    ? SEX.MALE
    : SEX.FEMALE
}

export const ChildFactory = (family) => {
  const child = randomSex() === SEX.MALE
    ? new Male()
    : new Female()

  child.age = 1;
  child.lastName = family.surname;
  child.isWorker = false;

  return child;
};


export const PersonFactory = () => {
  switch (randomSex()) {
    case SEX.MALE:
      return new Male();
    case SEX.FEMALE:
      return new Female();
    default: {
      throw new Error('Unknown gender!');
    }
  }
};
