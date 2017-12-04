import React from "react";
import PropTypes from "prop-types";
import ReactTooltip from "react-tooltip";

import Icon from "../common/Icon";
import Button from "../common/Button";
import { Flex } from "../common/glamorous/index";

import {
  STRUCTURES,
  RESOURCE_ICON_MAP,
  RESOURCE_LABEL
} from "../../common/app-const";
import MedBoardImg from "../../assets/images/medium-board.png";

class Structures extends React.Component {
  constructor(props) {
    super(props);
    this._renderStructure = this._renderStructure.bind(this);
    this._renderStructureCost = this._renderStructureCost.bind(this);
    this._renderNumberOfBuildings = this._renderNumberOfBuildings.bind(this);
  }

  render() {
    return (
      <Flex
        column
        zIndex={1000}
        width={680}
        height={475}
        className="primary-font"
        background={`url(${MedBoardImg}) no-repeat`}
      >
        <ReactTooltip />
        <Flex padding="35px 0 0 35px">
          <div className="is-size-4 has-text-primary-dark">Structures</div>
        </Flex>
        <Flex padding="15px 30px">
          <table
            className="table is-narrow is-size-6"
            style={{ tableLayout: "fixed", backgroundColor: "transparent" }}
          >
            <tbody>{STRUCTURES.map(this._renderStructure)}</tbody>
          </table>
        </Flex>
      </Flex>
    );
  }

  _renderStructure(structure) {
    if (!structure.name) {
      return null;
    }

    const isBuilding = this.props.buyTicks[structure.structureKey] >= 0;
    const missingResources = !this._hasAvailableResources(structure);

    let col;
    if (isBuilding) {
      col = (
        <progress
          className="progress is-success is-small"
          value={this.props.buyTicks[structure.structureKey]}
          max={structure.ticks}
        >
          {parseInt(
            this.props.buyTicks[structure.structureKey] / structure.ticks,
            10
          )}%
        </progress>
      );
    } else {
      col = (
        <Button
          small
          icon="custom-labor-pool"
          disabled={!this.props.isRunning || missingResources}
          onClick={this._handleBuyStructure.bind(this, structure)}
          className={`primary-font is-tab-link ${missingResources ? "has-text-danger" : "has-text-success-dark"}`}
        >
          Build
        </Button>
      );
    }

    return (
      <tr key={structure.structureKey}>
        <td style={{ width: 115 }}>
          <Flex
            data-tip={this._renderNumberOfBuildings(structure)}
            vAlignCenter
          >
            <Icon icon={structure.icon} />
            <span>{structure.name}</span>
          </Flex>
        </td>
        <td className="is-size-14px">{structure.description}</td>
        <td>{this._renderCost(structure)}</td>
        <td style={{ width: 100 }}>
          <Flex hAlignCenter>
            {col}
          </Flex>
        </td>
      </tr>
    );
  }

  _renderCost(structure) {
    return (
      <Flex flex={0} zIndex={5}>
        {structure.cost.map(this._renderStructureCost)}
      </Flex>
    );
  }

  _renderStructureCost(cost, index) {
    let className = "";
    if (!this.props.resourceStore.hasXOfResource(cost.resource, cost.value)) {
      className = "has-text-danger has-text-weight-bold";
    }
    return (
      <Flex
        data-tip={`${RESOURCE_LABEL[cost.resource]}: ${cost.value}`}
        key={index}
        vAlignCenter
        margin="0 2px"
        className={className}
      >
        <Icon icon={RESOURCE_ICON_MAP[cost.resource]} />
        <small>{cost.value}</small>
      </Flex>
    );
  }

  _renderNumberOfBuildings(structure) {
    let count = this.props.structureStore.getStructureCountByType(
      structure.structureKey
    );
    const usePlural = count === 0 || count > 1;

    let label = structure.name;
    if (label === "Quarry") {
      if (usePlural) {
        label = "Quarries";
      }
    } else if (usePlural) {
      label = `${label}s`;
    }

    if (count === 0) {
      return `You don't own any ${label}`;
    } else {
      return `You own ${count} ${label}`;
    }
  }

  _hasAvailableResources(structure) {
    return structure.cost.every(c =>
      this.props.resourceStore.hasXOfResource(c.resource, c.value)
    );
  }

  _handleBuyStructure(structure) {
    if (this._hasAvailableResources(structure)) {
      this.props.onBuyStructure(structure);
    }
  }
}

Structures.propTypes = {
  isRunning: PropTypes.bool.isRequired,
  buyTicks: PropTypes.object.isRequired,
  structureStore: PropTypes.object.isRequired,
  resourceStore: PropTypes.object.isRequired,
  onBuyStructure: PropTypes.func.isRequired
};

export default Structures;
