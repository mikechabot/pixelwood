import { action, computed, observable } from 'mobx';
import chance from 'util/chance';
import get from 'lodash.get';

import { getNumberBetween, isAvailableToWork } from '../../util/population';
import { areWithinMarryRange,  } from '../../util/person';

import { DAYS_IN_WORLD_YEAR } from '../const/timer';
import { MARRY_AGE, MAX_INITIAL_AGE, SEX, } from '../const/population';

class Person {

  @observable age = getNumberBetween(1, MAX_INITIAL_AGE);
  @observable lastName = chance.last();
  @observable isAlive = true;
  @observable isWorker = isAvailableToWork(this);
  @observable family;

  constructor(sex) {
    this.id = chance.guid();
    this.sex = sex;
    this.birthday = getNumberBetween(1, DAYS_IN_WORLD_YEAR);
    this.firstName = chance.first({ gender: this.sex.toLowerCase() });
  }

  @computed get theAge() {
    return this.age;
  }

  @computed get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  @computed get mate() {
    throw new Error('Subclass has not implemented this method!');
  }

  @computed get isMated() {
    return Boolean(this.mate);
  }

  @computed get numberOfChildren() {
    return get(this.family, 'numberOfChildren', 0);
  }

  @computed get hasChildren() {
    return this.numberOfChildren > 0;
  }

  @computed get isMarryable() {
    return this.age >= MARRY_AGE;
  }

  @computed get isMale() {
    return this.sex === SEX.MALE;
  }

  @action
  setFamily(family) {
    this.family = family;
  }

  @action
  incrementAge() {
    this.age += 1;
  }

  @action
  die() {
    this.isAlive = false;
  }

  @action
  makeWorker() {
    this.isWorker = true;
  }

  canMateWith(citizen) {
    return !this.isEqual(citizen)
      && areWithinMarryRange(this, citizen);
  }

  isEqual(citizen) {
    return this.id === citizen.id;
  }

  isSameSex(citizen) {
    return this.sex === citizen.sex;
  }

}

export default Person;
