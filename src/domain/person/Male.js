import Person from './Person';
import { computed } from 'mobx';
import get from 'lodash.get';
import { SEX } from '../const/population';

class Male extends Person {
  constructor() {
    super(SEX.MALE);
  }

  @computed get mate() {
    return get(this.family, 'wife');
  }

  @computed get isWidower() {
    return this.isMated && this.mate.isAlive;
  }
}

export default Male;
