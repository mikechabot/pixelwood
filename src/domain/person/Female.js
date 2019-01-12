import { action, computed, observable } from 'mobx';
import get from 'lodash.get';

import Person from './Person';

import {
  getNumberBetween,
  shouldHyphenateLastName,
  shouldTakeLastName
} from '../../util/population';
import { MAX_CHILDREN, MINIMUM_DAYS_SINCE_LAST_BIRTH, SEX } from '../const/population';

class Female extends Person {

  @observable daysSinceLastBirth;

  constructor() {
    super(SEX.FEMALE);
    this.daysSinceLastBirth = MINIMUM_DAYS_SINCE_LAST_BIRTH;
    this.maxChildren = getNumberBetween(3, MAX_CHILDREN);
  }

  @computed get mate() {
    return get(this.family, 'husband');
  }

  @computed get isWidow() {
    return this.isMated && this.mate.isAlive;
  }

  @computed get canGiveBirth() {
    return this.daysSinceLastBirth >= MINIMUM_DAYS_SINCE_LAST_BIRTH
    && this.numberOfChildren < this.maxChildren
  }

  @action
  resetDaysSinceLastBirth() {
    this.daysSinceLastBirth = 0;
  }

  @action
  incrementDaysSinceLastBirth() {
    this.daysSinceLastBirth += 1;
  }

  @action
  updateLastName(husband) {
    if (shouldTakeLastName()) {
      this.lastName = husband.lastName;
    } else if (shouldHyphenateLastName()) {
      this.lastName = `${this.lastName}-${husband.lastName}`;
    }
  }

}

export default Female;
