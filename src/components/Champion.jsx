import React from 'react';
import PropTypes from 'prop-types';
import ChampionService from '../services/champion-service';
import { Flex } from './common/glamorous';
import { capitalize } from '../common/common';
import Icon from './common/Icon';

const MAX_REROLLS = 3;

class ChampionCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            champion: ChampionService.generateChampion(),
            rerolls: MAX_REROLLS
        };
        this._randomizeCharacter = this._randomizeCharacter.bind(this);
        this._randomizeAbilities = this._randomizeAbilities.bind(this);
    }
    render() {
        const { champion } = this.state;
        return (
            <div
                className="card paper-2"
                style={{
                    width: 400,
                    margin: 2,
                    border: '2px solid #121212'
                }}
            >
                <div className="pull-right">
                    <Icon
                        className="is-link"
                        large
                        icon="dice"
                        title="Randomize"
                        onClick={this._randomizeCharacter}
                    />
                </div>
                <div className="card-content">
                    <div className="media">
                        <div className="media-left">
                            <img className={champion.portrait} />
                        </div>
                        <div className="media-content">
                            <p className="title is-4 has-text-white berkshire-swash">{champion.name}</p>
                            <p
                                className="subtitle is-5 is-italic has-text-light has-text-secondary"
                                style={{ marginBottom: 10 }}
                            >
                                {champion.class.label}
                            </p>
                            <p style={{ marginBottom: 5 }}>
                                {capitalize(champion.character.classReason)}
                            </p>
                        </div>
                    </div>
                    <hr style={{ margin: '5px 0px' }} />
                    <div className="content">
                        <Flex column>
                            <Flex justifyContent="space-between">
                                <div>
                                    <p className="title is-5 has-text-light has-text-secondary">
                                        Abilities&nbsp;
                                    </p>
                                </div>
                                {this.state.rerolls > 0 ? (
                                    <Flex vAlignCenter style={{ marginLeft: 5 }}>
                                        <Icon
                                            medium
                                            className="is-link"
                                            icon="dice"
                                            title="Randomize"
                                            label={
                                                this.state.rerolls === 1 ? (
                                                    <span className="has-text-warning">
                                                        {this.state.rerolls}
                                                    </span>
                                                ) : (
                                                    this.state.rerolls
                                                )
                                            }
                                            onClick={this._randomizeAbilities}
                                        />&nbsp;
                                    </Flex>
                                ) : (
                                    <Icon medium icon="lock" title="Locked" />
                                )}
                            </Flex>

                            <Flex vAlignCenter justifyContent="center" width="100%">
                                <Flex column className="has-text-right">
                                    {champion.abilities.map(ability => (
                                        <div
                                            title={ability.label}
                                            style={{ margin: 5 }}
                                            key={ability.key}
                                        >
                                            {ability.label} ({ability.abbreviation})
                                        </div>
                                    ))}
                                </Flex>
                                <Flex column style={{ marginLeft: 10 }}>
                                    {champion.abilities.map((ability, index) => (
                                        <div style={{ margin: 5 }} key={index}>
                                            {[1, 2, 3, 4, 5].map(val => (
                                                <i
                                                    key={val}
                                                    className={
                                                        ability.value >= val
                                                            ? 'fa fa-star has-text-warning'
                                                            : 'fa fa-star-o'
                                                    }
                                                />
                                            ))}
                                        </div>
                                    ))}
                                </Flex>
                            </Flex>
                        </Flex>
                        <hr style={{ margin: '5px 0px' }} />
                        <Flex column width="100%" margin="10px 0 0 0">
                            <p className="title is-5 has-text-light has-text-secondary">Backstory</p>
                            <p className="subtitle is-6 is-italic has-text-light has-text-secondary">
                                {champion.character.background.name}
                            </p>
                            <p>{capitalize(champion.character.backgroundReason)}</p>
                            <p className="has-text-success">
                                <Icon icon="arrow-circle-up" /> {champion.character.backgroundBond}
                            </p>
                            <p className="has-text-danger">
                                <Icon icon="arrow-circle-down" />
                                {champion.character.backgroundFlaw}
                            </p>
                        </Flex>
                    </div>
                </div>
            </div>
        );
    }
    _randomizeCharacter() {
        this.setState({
            rerolls: MAX_REROLLS,
            champion: ChampionService.generateChampion()
        });
    }
    _randomizeAbilities() {
        if (this.state.rerolls > 0) {
            const abilities = this.state.champion.class._generateAbilities();
            this.setState({
                rerolls: this.state.rerolls - 1,
                champion: {
                    ...this.state.champion,
                    ...{ abilities }
                }
            });
        }
    }
}

ChampionCard.propTypes = {
    id: PropTypes.string.isRequired
};

export default ChampionCard;
