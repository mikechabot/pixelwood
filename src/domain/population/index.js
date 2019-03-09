import { action, computed, observable, reaction } from 'mobx';

import timer from '../Timer';
import Family from '../family';
import {PersonFactory} from '../person';

import {
  isAvailableToWork,
  isProcreationDay,
  shouldLive,
  shouldMarry,
} from '../../util/population';

class Population {

  @observable people = [];
  @observable families = [];

  constructor(populationSize = 10) {
    for (let i = 0; i < populationSize; i++) {
      this.addPerson(
        this.newPerson()
      );
    }
  }

  @computed get size() {
    return this.people.length;
  }

  @computed get living() {
    return this.people.filter(person => person.isAlive);
  }

  @computed get mated() {
    return this.living.filter(person => person.isMated);
  }

  @computed get mateable() {
    return this.living.filter(person => !person.isMated && person.isMarryable);
  }

  @computed get mateableMales() {
    return this.mateable.filter(person => person.isMale);
  }

  @computed get mateableFemales() {
    return this.mateable.filter(person => !person.isMale);
  }

  @action
  addPerson(person) {
    this.people.push(person);
  }

  @action
  addFamily(family) {
    this.families.push(family);
  }

  onTick = reaction(() => timer.day, (day) => {
    this.living
      .forEach(person => {
        this.agePerson(person, day);
        this.makeWorker(person);
        this.killPerson(person);
      });

    this.mateable
      .forEach(person => {
        const family = this.createFamily(person);
        if (family) {
          this.addFamily(family);
        }
      });

    if (isProcreationDay(day)) {
      this.families
        .forEach(family => {
          const child = family.procreate();
          if (child) {
            this.addPerson(child);
          }
        });
    }
  });

  newPerson() {
    return PersonFactory();
  }

  newFamily(husband, wife) {
    return new Family(husband, wife);
  }

  killPerson(person) {
    if (person.isAlive && !shouldLive(person)) {
      person.die();
    }
  }

  makeWorker(person) {
    if (!person.isWorker && isAvailableToWork(person)) {
      person.makeWorker();
    }
  }

  agePerson(person, day) {
    if (person.birthday === day) {
      person.incrementAge();
    }
  }

  createFamily(person) {
    if (!shouldMarry(person)) return;

    const mate = this.findMate(person);
    if (!mate) return;

    // Create the family
    return person.isMale
      ? this.newFamily(person, mate)
      : this.newFamily(mate, person);
  }

  findMate(person) {
    const mateables = person.isMale
      ? this.mateableFemales
      : this.mateableMales;
    return mateables.find(mate => mate.canMateWith(person));
  }

}

export default new Population();
