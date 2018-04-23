import { Chance } from 'chance';
import {
    SEX,
    CHILD_WORK_AGE,
    MARRY_AGE,
    MARRY_AGE_RANGE,
    MINIMUM_DAYS_SINCE_LAST_BIRTH,
    DEATH_AGE_CHANGE_RANGES,
    CREATE_FAMILY_UNIT_RATE,
    SAME_SEX_MARRIAGE_RATE,
    CREATE_CHILD_RATE,
    PROCREATION_ATTEMPT_RATE,
    getHistoryLogRate
} from '../common/app-const';

const chance = Chance();

function Population(startSize) {
    this.population = [];
    if (startSize) {
        for (let i = 0; i < startSize; i++) {
            this.addPerson(_getAgeBetween(CHILD_WORK_AGE, 68));
        }
    }
}

Population.prototype.addPerson = function(age) {
    const person = {
        id: chance.guid(),
        sex: chance.gender(),
        age: age || chance.age(),
        isAlive: true,
        isSingle: true
    };

    person.name = chance.name({ gender: person.sex.toLowerCase() });
    person.isWorker = this.isAvailableToWork(person);

    if (person.sex === SEX.FEMALE) {
        person.daysSinceLastBirth = MINIMUM_DAYS_SINCE_LAST_BIRTH;
    }

    this.population.push(person);

    return person;
};

Population.prototype.getPopulation = function() {
    return this.population;
};

Population.prototype.getLivingPopulation = function() {
    return this.population.filter(p => p.isAlive);
};

Population.prototype.getCount = function() {
    return this.population.length;
};

Population.prototype.getLivingPopulationCount = function() {
    return this.getLivingPopulation().length;
};

Population.prototype.isAvailableToWork = function(person) {
    return person && person.isAlive && (person.age >= CHILD_WORK_AGE && person.age <= 68);
};

Population.prototype.getWorkforce = function() {
    return this.population.filter(this.isAvailableToWork);
};

Population.prototype.getUnemployedCount = function() {
    return this.getWorkforce().filter(p => !p.profession).length;
};

Population.prototype.getWorkersByProfession = function(profession) {
    return this.getWorkforce().filter(w => w.profession === profession);
};

Population.prototype.getGatherers = function() {
    return this.getWorkersByProfession('Gatherer');
};

Population.prototype.getWoodCutters = function() {
    return this.getWorkersByProfession('Woodcutter');
};

Population.prototype.getDowsers = function() {
    return this.getWorkersByProfession('Dowser');
};

Population.prototype.getWorkforceCount = function() {
    return this.getWorkforce().length;
};

Population.prototype.hasLivingCitizens = function() {
    return this.getLivingPopulationCount() > 0;
};

Population.prototype.getFamilies = function() {
    const uniq = [];
    return this.getLivingPopulation()
        .filter(p => !p.isSingle)
        .map(p => {
            const id = [p.id, p.mateId].sort().join('-');
            if (uniq.includes(id)) {
                return null;
            }
            uniq.push(id);
            return {
                mateId1: p.id,
                mateId2: p.mateId
            };
        })
        .filter(family => !!family);
};

Population.prototype.getFamilyCount = function() {
    return this.getFamilies().length;
};

Population.prototype.agePopulation = function(isNewYear, resourceStore, worldTimer, history) {
    const isEmpty = resourceStore.isOutOfFood();

    this.population.forEach(person => {
        if (person.isAlive) {
            if (!this.__shouldLive(person, isEmpty)) {
                person.isAlive = false;
            } else if (isNewYear) {
                person.age += 1;
            }
        }
    });

    const logRate = getHistoryLogRate(worldTimer.tickSpeed);
    if (worldTimer.day % logRate === 0) {
        history.census.population.push({
            year: worldTimer.year,
            x: `Day: ${worldTimer.day} Year ${worldTimer.year}`,
            y: this.getLivingPopulationCount()
        });
        history.census.workforce.push({
            year: worldTimer.year,
            x: `Day: ${worldTimer.day} Year ${worldTimer.year}`,
            y: this.getWorkforceCount()
        });
    }
};

Population.prototype.findMate = function(person) {
    if (this.__shouldMarry()) {
        const sameSexCondition = this.__shouldSameSexMarry()
            ? p => p.sex === person.sex
            : p => p.sex !== person.sex;

        return this.getLivingPopulation().find(
            p =>
                p.isSingle &&
                p.id !== person.id &&
                sameSexCondition(p) &&
                (person.age - MARRY_AGE_RANGE >= p.age || person.age + MARRY_AGE_RANGE <= p.age)
        );
    }
};

Population.prototype.createFamilyUnit = function() {
    this.getLivingPopulation().forEach(person => {
        if (person.isSingle && this.__canMarry(person)) {
            const mate = this.findMate(person);
            if (mate) {
                person.isSingle = false;
                person.mateId = mate.id;
                mate.isSingle = false;
                mate.mateId = person.id;
            }
        }
    });
    // const logRate = getHistoryLogRate(worldTimer.tickSpeed);
    // if (worldTimer.day % logRate === 0) {
    //     history.census.families.push({
    //         year: worldTimer.year,
    //         x: `Day: ${worldTimer.day} Year ${worldTimer.year}`,
    //         y: this.getFamilyCount()
    //     });
    // }
};

Population.prototype.procreate = function(day) {
    if (day % PROCREATION_ATTEMPT_RATE === 0) {
        this.getFamilies().forEach(family => {
            const couple = [
                this.population.find(p => p.id === family.mateId1),
                this.population.find(p => p.id === family.mateId2)
            ];

            const male = couple.find(p => p.sex === SEX.MALE);
            const female = couple.find(p => p.sex === SEX.FEMALE);

            if (this.__canMate(male, female) && this.__shouldMate(male, female)) {
                const child = this.addPerson(1);

                let { children } = female;
                if (!children) {
                    children = [];
                    female.children = children;
                }

                children.push(child);
                female.daysSinceLastBirth = 0;
            } else if (female) {
                female.daysSinceLastBirth++;
            }
        });
    }
};

Population.prototype.__canMate = function(male, female) {
    if (!female || !male || ![male, female].every(p => p.isAlive)) {
        return false;
    }
    return female.daysSinceLastBirth >= MINIMUM_DAYS_SINCE_LAST_BIRTH && female.age <= 45;
};

Population.prototype.__canMarry = function(person) {
    return person.age >= MARRY_AGE;
};

Population.prototype.__shouldSameSexMarry = function() {
    return !(Math.random() > SAME_SEX_MARRIAGE_RATE);
};

Population.prototype.__shouldMarry = function() {
    return !(Math.random() > CREATE_FAMILY_UNIT_RATE);
};

Population.prototype.__shouldMate = function() {
    return !(Math.random() > CREATE_CHILD_RATE);
};

Population.prototype.__shouldLive = function(person, noFood) {
    function _godFunction(magicNumber) {
        return !(Math.random() < (noFood ? magicNumber * 200 : magicNumber));
    }
    const ageRange = DEATH_AGE_CHANGE_RANGES.find(ageRange => person.age <= ageRange.age);
    return _godFunction(ageRange.modifier);
};

function _getAgeBetween(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export default Population;
