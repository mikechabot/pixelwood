import React from "react";

import WorldTimer from "../domain/WorldTimer";
import Population from "../domain/Population";
import ResourceStore from "../domain/ResourceStore";
import StructureStore from "../domain/StructureStore";

import Structures from "./boards/Structures";
import YearAndSeason from "./boards/YearAndSeason";
import Header from "./boards/Header";
import TimerControl from "./boards/TimerControl";
import Summary from "./boards/Summary";
import Menu from "./boards/Menu";
import Professions from "./boards/Professions";
import Statistics from "./boards/Statistics";
import PopulationList from "./boards/PopulationList";

import { Flex } from "./common/glamorous/index";
import {
  DEFAULTS,
  getNewHistory,
  STRUCTURE_TICK_TIMES
} from "../common/app-const";

class Body extends React.Component {
  constructor(props) {
    super(props);

    this._onTimerTick = this._onTimerTick.bind(this);
    this._worldTimer = new WorldTimer(this._onTimerTick);
    this._population = new Population(DEFAULTS.DEFAULT_POPULATION_SIZE);
    this._resourceStore = new ResourceStore();
    this._structureStore = new StructureStore();

    this._history = getNewHistory();

    this.state = {
      activeKey: "struct",
      tick: this._worldTimer.getState(),
      population: this._population,
      resourceStore: this._resourceStore,
      structureStore: this._structureStore,
      buyTicks: {},
      reset: false,
      net: {
        food: 0,
        water: 0,
        timber: 0,
        firewood: 0,
        stone: 0,
        iron: 0,
        populationSize: 0
      }
    };
    this._handlePopulationChange = this._handlePopulationChange.bind(this);
    this._handleMenuItemSelect = this._handleMenuItemSelect.bind(this);
    this._handleStructureChange = this._handleStructureChange.bind(this);
    this._handleBuyStructure = this._handleBuyStructure.bind(this);
    this._resetSimVillage = this._resetSimVillage.bind(this);
    this._clearHistory = this._clearHistory.bind(this);
  }
  render() {
    return (
      <Flex column vAlignCenter className="is-fullheight overflow-hidden">
        <Flex hAlignCenter vAlignCenter>
          <Header />
          <TimerControl
            disabled={this._worldTimer.isGameOver()}
            speed={this.state.tick.tickSpeed}
            isRunning={this._worldTimer.isRunning()}
            startTimer={() => this._worldTimer.start()}
            stopTimer={() => this._worldTimer.stop()}
            increaseTickSpeed={() => this._worldTimer.increaseSpeed()}
            decreaseTickSpeed={() => this._worldTimer.decreaseSpeed()}
          />
          <YearAndSeason tick={this.state.tick} />
        </Flex>
        <Flex hAlignCenter>
          <Flex hAlignCenter flex={0} zIndex={1000}>
            <Summary
              tick={this.state.tick}
              population={this.state.population}
              resourceStore={this.state.resourceStore}
              net={this.state.net}
            />
          </Flex>
          <Flex
            flex={0}
            hAlignCenter
            zIndex={1000}
            height="100%"
            overflow="hidden"
          >
            {this._getActiveComponent()}
          </Flex>
          <Flex column hAlignCenter zIndex={1000}>
            <Menu
              onSelect={this._handleMenuItemSelect}
              activeKey={this.state.activeKey}
            />
          </Flex>
        </Flex>
      </Flex>
    );
  }

  _handleMenuItemSelect(activeKey) {
    this.setState({ activeKey });
  }

  _getActiveComponent() {
    switch (this.state.activeKey) {
      case "struct": {
        return (
          <Structures
            isRunning={this._worldTimer.isRunning()}
            buyTicks={this.state.buyTicks}
            structureStore={this.state.structureStore}
            resourceStore={this.state.resourceStore}
            onBuyStructure={this._handleBuyStructure}
          />
        );
      }
      case "prof": {
        return (
          <Professions
            onPopulationChange={this._handlePopulationChange}
            structureStore={this.state.structureStore}
            population={this.state.population}
            isRunning={this._worldTimer.isRunning()}
            net={this.state.net}
          />
        );
        break;
      }
      case "stats": {
        return (
          <Statistics
            history={this._history}
            clearHistory={this._clearHistory}
          />
        )
      }
      case "pop": {
        return (
          <PopulationList population={this.state.population}/>
        )
      }
    }
  }

  _onTimerTick(tick) {
    const prevFoodCount = this._resourceStore.getFoodCount();
    const prevWaterCount = this._resourceStore.getWaterCount();
    const prevTimberCount = this._resourceStore.getTimberCount();
    const prevFirewoodCount = this._resourceStore.getFirewoodCount();
    const prevIronCount = this._resourceStore.getIronCount();
    const prevStoneCount = this._resourceStore.getStoneCount();
    const prevPopSize = this._population.getLivingPopulationCount();

    const isNewDay = this.state.tick.day !== tick.day;

    if (this._worldTimer.isRunning() && isNewDay) {
      const isNewYear = this.state.tick.year !== tick.year;
      const isNewSeason = this.state.tick.verboseSeason !== tick.verboseSeason;

      this._population.createFamilyUnit(
        this._resourceStore,
        tick,
        this._history
      );

      const newBuyTicks = {};
      Object.keys(this.state.buyTicks).forEach(prop => {
        newBuyTicks[prop] = this.state.buyTicks[prop] + 1;
        if (newBuyTicks[prop] === STRUCTURE_TICK_TIMES[prop]) {
          this._structureStore.addStructure(prop);
          delete newBuyTicks[prop];
        }
      });

      this._population.procreate(this._resourceStore, tick, this._history);

      this._population.agePopulation(
        isNewYear,
        this._resourceStore,
        tick,
        this._history
      );

      if (
        !this._population.hasLivingCitizens() &&
        this._worldTimer.isRunning()
      ) {
        this._worldTimer.stop();
        this._worldTimer.setGameOver(true);
      } else {
        this._resourceStore.generateAndConsumeResources(
          { isNewDay, isNewSeason },
          this._population,
          tick,
          this._history
        );
      }

      this.setState({
        buyTicks: newBuyTicks,
        net: {
          food: parseFloat(
            this._resourceStore.getFoodCount() - prevFoodCount
          ).toFixed(1),
          water: parseFloat(
            this._resourceStore.getWaterCount() - prevWaterCount
          ).toFixed(1),
          stone: parseFloat(
            this._resourceStore.getStoneCount() - prevStoneCount
          ).toFixed(1),
          iron: parseFloat(
            this._resourceStore.getIronCount() - prevIronCount
          ).toFixed(1),
          timber: parseFloat(
            this._resourceStore.getTimberCount() - prevTimberCount
          ).toFixed(1),
          firewood: parseFloat(
            this._resourceStore.getFirewoodCount() - prevFirewoodCount
          ).toFixed(1),
          populationSize: parseFloat(
            this._population.getLivingPopulationCount() - prevPopSize
          ).toFixed(1)
        }
      });
    }

    this.setState({
      tick,
      population: this._population,
      resourceStore: this._resourceStore
    });
  }

  _resetSimVillage() {
    if (window.confirm("Are you sure you want to reset the scenario?")) {
      this._worldTimer = new WorldTimer(this._onTimerTick);
      this._population = new Population(DEFAULTS.DEFAULT_POPULATION_SIZE);
      this._resourceStore = new ResourceStore();
      this._structureStore = new StructureStore();
      this._history = getNewHistory();

      this.setState(
        {
          tick: this._worldTimer.getState(),
          population: this._population,
          resourceStore: this._resourceStore,
          structureStore: this._structureStore,
          buyTicks: {},
          net: {
            food: 0,
            water: 0,
            timber: 0,
            firewood: 0,
            stone: 0,
            iron: 0,
            populationSize: 0
          },
          reset: true
        },
        () => {
          this.setState({
            reset: false
          });
        }
      );
    }
  }

  _clearHistory() {
    this._history = getNewHistory();
    this.forceUpdate();
  }

  _handlePopulationChange(population) {
    this.setState({
      tick: this._worldTimer.getState(),
      population: population,
      resourceStore: this._resourceStore
    });
  }

  _handleStructureChange(structure, resourceStore) {
    this.setState({
      tick: this._worldTimer.getState(),
      structureStore: structure,
      resourceStore: resourceStore
    });
  }

  _handleBuyStructure(structure) {
    const buyTick = this.state.buyTicks[structure.structureKey];
    if (buyTick === null || buyTick === undefined) {
      structure.cost.forEach(cost => {
        this._resourceStore.reduceResourceByX(cost.resource, cost.value);
      });
      this.setState({
        buyTicks: {
          ...this.state.buyTicks,
          [structure.structureKey]: 0
        }
      });
    }
  }
}

export default Body;
