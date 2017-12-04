import React from "react";
import PropTypes from "prop-types";
import ReactTooltip from "react-tooltip";

import Icon from "../common/Icon";
import Button from "../common/Button";
import { Flex } from "../common/glamorous/index";
import {
  PROFESSIONS,
  STRUCTURE_LABEL
} from "../../common/app-const";

class Professions extends React.Component {
  constructor(props) {
    super(props);
    this._renderProfessions = this._renderProfessions.bind(this);
  }
  render() {
    return (
      <Flex
        column
        zIndex={1000}
        width={680}
        height={475}
        className="primary-font"
        background={`url(${require("../../assets/images/medium-board.png")}) no-repeat`}
      >
        <ReactTooltip html={true} />
        <Flex padding="35px 0 0 35px">
          <div className="is-size-4 has-text-primary-dark">Professions</div>
        </Flex>
        <Flex padding="15px 30px">
          <table
            className="table is-narrow"
            style={{ tableLayout: "fixed", backgroundColor: "transparent" }}
          >
            <tbody>{PROFESSIONS.map(this._renderProfessions)}</tbody>
          </table>
        </Flex>
      </Flex>
    );
  }

  _renderProfessions(profession, index) {
    const workforce = this.props.population.getWorkforce();
    const workers = workforce.filter(p => p.profession === profession.name);
    const missingStructure = !this.props.structureStore.hasStructureType(profession.structureKey);

    let col;
    if (!missingStructure) {
      col = this._renderControls(
        workers,
        workforce,
        profession,
        this.props.population
      );
    } else {
      col = (
        <div className="has-text-danger is-size-14px">
          <Icon icon="lock" />{STRUCTURE_LABEL[profession.structureKey]}
        </div>
      )
    }

    return (
      <tr key={index}>
        <td>
          <Flex vAlignCenter>
            <Icon icon={profession.icon} />
            <p data-tip={profession.tooltip}>{profession.name}</p>
          </Flex>
        </td>
        <td className="is-size-14px">
          {profession.description}
        </td>
        <td style={{width: 115}}>{col}</td>
      </tr>
    );
  }

  _renderControls(workers, workforce, profession, population) {
    const structureCount = this.props.structureStore.getStructureCountByType(
      profession.structureKey
    );

    const maxWorkers = workers.length === profession.max * structureCount;
    const noStructures = structureCount === 0;

    return (
      <Flex vAlignCenter>
        <Button
          icon={noStructures ? "lock" : "arrow-down"}
          className="is-text"
          disabled={workers.length === 0 || !this.props.isRunning}
          onClick={this._handleRemoveProfession.bind(
            this,
            profession,
            population,
            workforce,
            workers
          )}
        />
        <span className={maxWorkers ? "has-text-danger" : ""}>
          {workers.length}/{this.props.structureStore.getStructureCountByType(
            profession.structureKey
          ) * profession.max}
        </span>
        <Button
          icon={maxWorkers ? "lock" : "arrow-up"}
          disabled={
            !this.props.isRunning ||
            this.props.structureStore.getStructureCountByType(
              profession.structureKey
            ) *
              profession.max ===
              0
          }
          onClick={this._handleAddProfession.bind(
            this,
            profession,
            population,
            workforce,
            workers
          )}
          className={`is-text ${
            !this._hasAvailableStructure(profession) || maxWorkers
              ? "has-text-danger"
              : ""
          }`}
        />
      </Flex>
    );
  }

  _hasAvailableStructure(profession) {
    return this.props.structureStore.hasStructureType(profession.structureKey);
  }

  _handleAddProfession(profession, population, workforce, workers) {
    if (
      workforce.length > 0 &&
      workers.length !==
        profession.max *
          this.props.structureStore.getStructureCountByType(
            profession.structureKey
          ) &&
      this._hasAvailableStructure(profession)
    ) {
      const worker = workforce.find(w => !w.profession);
      if (worker) {
        worker.profession = profession.name;
        this.props.onPopulationChange(population);
      }
    }
  }

  _handleRemoveProfession(profession, population, workforce, workers) {
    if (workers.length !== 0) {
      const worker = workers[0];
      worker.profession = null;
      this.props.onPopulationChange(population);
    }
  }
}

Professions.propTypes = {
  population: PropTypes.object.isRequired,
  structureStore: PropTypes.object.isRequired,
  onPopulationChange: PropTypes.func.isRequired
};

export default Professions;
