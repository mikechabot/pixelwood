import { SEX } from '../const/population';

import Male from './Male';
import Female from './Female';

const randomSex = () => {
  return Math.random() > .5
    ? SEX.MALE
    : SEX.FEMALE
}

const PersonFactory = () => {
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

export default PersonFactory;
