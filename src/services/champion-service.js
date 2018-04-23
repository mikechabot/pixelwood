import leftPad from 'left-pad';
import { Chance } from 'chance';
import generateCharacter from 'this-is-your-life-cli/lib/';

import { LEVEL_CHAMPION_CLASS_LIST } from '../common/champion-const';

const chance = Chance();

function _getRandomIntBetween(min, max) {
    return Math.floor(Math.random() * max) + min;
}

const MAX_FEMALE_PORTRAITS = 14;
const MAX_MALE_PORTRAITS = 21;

function _getPortraitSpriteId(sex) {
    const id = _getRandomIntBetween(1, sex === SEX.FEMALE ? MAX_FEMALE_PORTRAITS : MAX_MALE_PORTRAITS);
    return leftPad(id, 2, 0);
}

const SEX = {
    MALE: 'Male',
    FEMALE: 'Female'
};

class Champion {
    constructor() {
        this.sex = chance.gender();
        this.portrait = `bg-${this.sex.toLowerCase()}_${_getPortraitSpriteId(this.sex)}`;
        this.name = chance.name({ gender: this.sex });
        this.class = chance.pickone(LEVEL_CHAMPION_CLASS_LIST);
        this.abilities = this.class._generateAbilities();
        this.character = generateCharacter(null, null, this.class.label);
    }
}

const ChampionService = {
    generateChampion() {
        return new Champion();
    }
};

export default ChampionService;
