import { Chance } from 'chance';
const chance = Chance();

const ABILITY = {
    STRENGTH: 'STRENGTH',
    DEXTERITY: 'DEXTERITY',
    CONSTITUTION: 'CONSTITUTION',
    INTELLIGENCE: 'INTELLIGENCE',
    WISDOM: 'WISDOM',
    CHARISMA: 'CHARISMA'
};

const ABILITY_ABBREVIATION = {
    STRENGTH: 'STR',
    DEXTERITY: 'DEX',
    CONSTITUTION: 'CON',
    INTELLIGENCE: 'INT',
    WISDOM: 'WIS',
    CHARISMA: 'CHA'
};

const ABILITY_LABEL = {
    [ABILITY.STRENGTH]: 'Strength',
    [ABILITY.DEXTERITY]: 'Dexterity',
    [ABILITY.CONSTITUTION]: 'Constitution',
    [ABILITY.INTELLIGENCE]: 'Intelligence',
    [ABILITY.WISDOM]: 'Wisdom',
    [ABILITY.CHARISMA]: 'Charisma'
};

const CLASS = {
    BARBARIAN: 'BARBARIAN',
    BARD: 'BARD',
    CLERIC: 'CLERIC',
    DRUID: 'DRUID',
    FIGHTER: 'FIGHTER',
    MONK: 'MONK',
    PALADIN: 'PALADIN',
    RANGER: 'RANGER',
    ROGUE: 'ROGUE',
    SORCERER: 'SORCERER',
    WARLOCK: 'WARLOCK',
    WIZARD: 'WIZARD'
};

const CLASS_LABEL = {
    BARBARIAN: 'Barbarian',
    BARD: 'Bard',
    CLERIC: 'Cleric',
    DRUID: 'Druid',
    FIGHTER: 'Fighter',
    MONK: 'Monk',
    PALADIN: 'Paladin',
    RANGER: 'Ranger',
    ROGUE: 'Rogue',
    SORCERER: 'Sorcerer',
    WARLOCK: 'Warlock',
    WIZARD: 'Wizard'
};

function _generateWeightedAbilities(str, dex, con, int, wis, cha) {
    return [
        {
            key: ABILITY.STRENGTH,
            value: _getWeightedAbility(str),
            label: ABILITY_LABEL[ABILITY.STRENGTH],
            abbreviation: ABILITY_ABBREVIATION[ABILITY.STRENGTH]
        },
        {
            key: ABILITY.DEXTERITY,
            value: _getWeightedAbility(dex),
            label: ABILITY_LABEL[ABILITY.DEXTERITY],
            abbreviation: ABILITY_ABBREVIATION[ABILITY.DEXTERITY]
        },
        {
            key: ABILITY.CONSTITUTION,
            value: _getWeightedAbility(con),
            label: ABILITY_LABEL[ABILITY.CONSTITUTION],
            abbreviation: ABILITY_ABBREVIATION[ABILITY.CONSTITUTION]
        },
        {
            key: ABILITY.INTELLIGENCE,
            value: _getWeightedAbility(int),
            label: ABILITY_LABEL[ABILITY.INTELLIGENCE],
            abbreviation: ABILITY_ABBREVIATION[ABILITY.INTELLIGENCE]
        },
        {
            key: ABILITY.WISDOM,
            value: _getWeightedAbility(wis),
            label: ABILITY_LABEL[ABILITY.WISDOM],
            abbreviation: ABILITY_ABBREVIATION[ABILITY.WISDOM]
        },
        {
            key: ABILITY.CHARISMA,
            value: _getWeightedAbility(cha),
            label: ABILITY_LABEL[ABILITY.CHARISMA],
            abbreviation: ABILITY_ABBREVIATION[ABILITY.CHARISMA]
        }
    ];
}

function _primaryAbility() {
    return [0, 1, 2, 3, 2, 2];
}

function _secondaryAbility() {
    return [0, 1, 2, 2, 2, 1];
}

function _fairSkill() {
    return [1, 2, 1, 1, 0, 0];
}

function _poorSkill() {
    return [1, 2, 1, 0, 0, 0];
}

function _veryPoorSkill() {
    return [2, 2, 1, 0, 0, 0];
}

const ABILITY_RANGE = [0, 1, 2, 3, 4, 5];
function _getWeightedAbility(weights) {
    return chance.weighted(ABILITY_RANGE, weights);
}

const CLASS_ABILITY = {
    [CLASS.BARBARIAN]: () =>
        _generateWeightedAbilities(
            _primaryAbility(),
            _fairSkill(),
            _secondaryAbility(),
            _veryPoorSkill(),
            _veryPoorSkill(),
            _poorSkill()
        ),
    [CLASS.BARD]: () =>
        _generateWeightedAbilities(
            _veryPoorSkill(),
            _secondaryAbility(),
            _veryPoorSkill(),
            _fairSkill(),
            _poorSkill(),
            _primaryAbility()
        ),
    [CLASS.CLERIC]: () =>
        _generateWeightedAbilities(
            _veryPoorSkill(),
            _poorSkill(),
            _veryPoorSkill(),
            _fairSkill(),
            _primaryAbility(),
            _secondaryAbility()
        ),
    [CLASS.DRUID]: () =>
        _generateWeightedAbilities(
            _veryPoorSkill(),
            _veryPoorSkill(),
            _fairSkill(),
            _secondaryAbility(),
            _primaryAbility(),
            _poorSkill()
        ),
    [CLASS.FIGHTER]: () =>
        _generateWeightedAbilities(
            _primaryAbility(),
            _secondaryAbility(),
            _fairSkill(),
            _veryPoorSkill(),
            _veryPoorSkill(),
            _poorSkill()
        ),
    [CLASS.MONK]: () =>
        _generateWeightedAbilities(
            _veryPoorSkill(),
            _secondaryAbility(),
            _veryPoorSkill(),
            _fairSkill(),
            _primaryAbility(),
            _poorSkill()
        ),
    [CLASS.PALADIN]: () =>
        _generateWeightedAbilities(
            _primaryAbility(),
            _poorSkill(),
            _veryPoorSkill(),
            _veryPoorSkill(),
            _fairSkill(),
            _secondaryAbility()
        ),
    [CLASS.RANGER]: () =>
        _generateWeightedAbilities(
            _fairSkill(),
            _primaryAbility(),
            _poorSkill(),
            _veryPoorSkill(),
            _secondaryAbility(),
            _veryPoorSkill()
        ),
    [CLASS.ROGUE]: () =>
        _generateWeightedAbilities(
            _veryPoorSkill(),
            _primaryAbility(),
            _poorSkill(),
            _fairSkill(),
            _secondaryAbility(),
            _veryPoorSkill()
        ),
    [CLASS.SORCERER]: () =>
        _generateWeightedAbilities(
            _veryPoorSkill(),
            _poorSkill(),
            _fairSkill(),
            _secondaryAbility(),
            _veryPoorSkill(),
            _primaryAbility()
        ),
    [CLASS.WARLOCK]: () =>
        _generateWeightedAbilities(
            _veryPoorSkill(),
            _poorSkill(),
            _veryPoorSkill(),
            _fairSkill(),
            _secondaryAbility(),
            _primaryAbility()
        ),
    [CLASS.WIZARD]: () =>
        _generateWeightedAbilities(
            _veryPoorSkill(),
            _veryPoorSkill(),
            _poorSkill(),
            _primaryAbility(),
            _secondaryAbility(),
            _fairSkill()
        )
};

const CLASS_MAP = {};
Object.keys(CLASS).forEach(key => {
    CLASS_MAP[key] = {
        key,
        label: CLASS_LABEL[key],
        _generateAbilities: CLASS_ABILITY[key]
    };
});

export const LEVEL_CHAMPION_CLASS_LIST = Object.keys(CLASS_MAP).map(key => CLASS_MAP[key]);
