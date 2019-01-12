import chance from 'util/chance';
import { action, computed, observable } from 'mobx';

import PersonFactory from '../person';

import {
  shouldHyphenateLastName,
  shouldProcreate,
  shouldTakeLastName
} from '../../util/population';

class Family {

  @observable children = [];

  constructor(husband, wife) {
    if (!husband || !wife) {
      throw new Error('husband and wife are required');
    }

    if (!husband.isMale || wife.isMale) {
      throw new Error('sex mismatch between husband and wife');
    }

    this.id = chance.guid();
    this.husband = husband;
    this.wife = wife;

    wife.updateLastName(husband);

    this.husband.setFamily(this);
    this.wife.setFamily(this);
  }

  @computed get surname() {
    return this.husband.lastName;
  }

  @computed get numberOfChildren() {
    return this.children.length;
  }

  @action
  addChild(child) {
    this.children.push(child);
  }

  createAndAddChild() {
    const child = this.createChild();
    this.addChild(child);
    return child;
  }

  /**
   * Attempt to procreate
   * @returns {Person}
   */
  procreate() {
    if (!this.canProcreate()) {
      this.wife.incrementDaysSinceLastBirth();
      return void 0;
    }
    this.wife.resetDaysSinceLastBirth();
    return this.createAndAddChild();
  }

  /**
   * Create a child
   * @returns {Person}
   */
  createChild() {
    const child = PersonFactory();
    child.age = 1;
    child.lastName = this.surname;
    child.isWorker = false;
    return child;
  }

  canProcreate() {
    return this.husband.isAlive
      && this.wife.isAlive
      && this.wife.canGiveBirth
      && this.wife.age <= 45
      && shouldProcreate()
  }

}

export default Family;
