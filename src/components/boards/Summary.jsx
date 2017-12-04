import React from "react";
import PropTypes from "prop-types";
import ReactTooltip from "react-tooltip";

import Icon from "../common/Icon";
import { Flex } from "../common/glamorous/index";
import {
  CHILD_WORK_AGE,
  RESOURCE_ICON_MAP,
  RESOURCE_TYPE,
  SEX
} from "../../common/app-const";

class Summary extends React.PureComponent {
  render() {
    const { population, resourceStore } = this.props;
    return (
      <Flex
        column
        zIndex={1000}
        width={175}
        height={460}
        padding="30px 0 10px 30px"
        backgroundSize="cover"
        background={`url(${require("../../assets/images/vertical-board.png")}) no-repeat`}
      >
        <ReactTooltip />
        <div className="has-text-primary-dark primary-font is-size-5">
          Vitals
        </div>
        {this._renderSummaryMap(
          this._getSummaryMapRow(population, resourceStore)
        )}
      </Flex>
    );
  }

  _renderSummaryMap(list) {
    return list.map((item, index) => {
      return (
        <Flex
          key={index}
          column
          className="is-fullheight"
          vAlignCenter
          flexShrink={0}
        >
          <Flex
            data-tip={item.label}
            vAlignCenter
            className="has-text-dark is-size-6"
          >
            {this._getIcon(item)}
            <div className="primary-font">{item.content}</div>
          </Flex>
        </Flex>
      );
    });
  }

  _getIcon(item) {
    return typeof item.icon !== "string" ? (
      item.icon
    ) : (
      <Icon icon={`${item.icon}`} />
    );
  }

  _getSummaryMapRow(population, resourceStore) {
    return [
      {
        label: "Population (Men/Women/Children)",
        icon: "custom-population",
        content: (function() {
          const census = population.getLivingPopulation();
          const m = census.filter(
            p => p.sex === SEX.MALE && p.age >= CHILD_WORK_AGE
          );
          const f = census.filter(
            p => p.sex === SEX.FEMALE && p.age >= CHILD_WORK_AGE
          );
          const c = census.filter(p => p.age < CHILD_WORK_AGE);
          return `${m.length} / ${f.length} / ${c.length}`;
        })()
      },
      {
        label: "Idle Workers",
        icon: "custom-labor-pool",
        content: `${population.getUnemployedCount()}`
      },
      {
        label: "Food",
        icon: RESOURCE_ICON_MAP[RESOURCE_TYPE.FOOD],
        tooltip: `${resourceStore.getResourceCountByType(RESOURCE_TYPE.FOOD)}`,
        content: this._renderResource(resourceStore, "Food", RESOURCE_TYPE.FOOD)
      },
      {
        label: "Water",
        icon: RESOURCE_ICON_MAP[RESOURCE_TYPE.WATER],
        tooltip: `${resourceStore.getResourceCountByType(RESOURCE_TYPE.WATER)}`,
        content: this._renderResource(
          resourceStore,
          "Water",
          RESOURCE_TYPE.WATER
        )
      },
      {
        label: "Timber",
        icon: RESOURCE_ICON_MAP[RESOURCE_TYPE.TIMBER],
        tooltip: `${resourceStore.getResourceCountByType(
          RESOURCE_TYPE.TIMBER
        )}`,
        content: this._renderResource(
          resourceStore,
          "Timber",
          RESOURCE_TYPE.TIMBER
        )
      },
      {
        label: "Firewood",
        icon: RESOURCE_ICON_MAP[RESOURCE_TYPE.FIREWOOD],
        tooltip: `${resourceStore.getResourceCountByType(
          RESOURCE_TYPE.FIREWOOD
        )}`,
        content: this._renderResource(
          resourceStore,
          "Firewood",
          RESOURCE_TYPE.FIREWOOD
        )
      },
      {
        label: "Stone",
        icon: RESOURCE_ICON_MAP[RESOURCE_TYPE.STONE],
        tooltip: `${resourceStore.getResourceCountByType(RESOURCE_TYPE.STONE)}`,
        content: this._renderResource(
          resourceStore,
          "Stone",
          RESOURCE_TYPE.STONE
        )
      },
      {
        label: "Iron",
        icon: RESOURCE_ICON_MAP[RESOURCE_TYPE.IRON],
        tooltip: `${resourceStore.getResourceCountByType(RESOURCE_TYPE.IRON)}`,
        content: this._renderResource(resourceStore, "Iron", RESOURCE_TYPE.IRON)
      }
    ];
  }

  _renderResource(resourceStore, label, resourceType) {
    if (!resourceStore.isOutOfResource(resourceType)) {
      const isPositive = this.props.net[resourceType] >= 0;
      return (
        <span>
          {resourceStore.getResourceCountByType(resourceType)}
          <small
            className={`has-text-weight-bold ${
              isPositive ? "has-text-success-dark" : "has-text-danger"
            }`}
          >
            {" "}
            {isPositive ? "+" : ""}
            {this.props.net[resourceType]}
          </small>
        </span>
      );
    } else {
      return <span className="has-text-danger">No {resourceType}</span>;
    }
  }
}

Summary.propTypes = {
  tick: PropTypes.object.isRequired,
  population: PropTypes.object.isRequired
};

export default Summary;
