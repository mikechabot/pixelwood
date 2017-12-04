import React from "react";
import PropTypes from "prop-types";
import ReactTooltip from "react-tooltip";

import Icon from "../common/Icon";
import { Flex } from "../common/glamorous/index";
import {SEASON} from "../../common/app-const";

function YearAndSeason({
  tick
}) {
  return (
    <Flex
      column
      hAlignCenter
      vAlignCenter
      zIndex={1000}
      width={200}
      height={75}
      data-tip="World Timer"p
      padding="0 3px 0 0"
      style={{
        background: `url(${require("../../assets/images/horizontal-board.png")}) no-repeat`,
        backgroundSize: "contain"
      }}
    >
      <Flex column vAlignCenter className="primary-font has-text-dark is-size-5">
        <ReactTooltip />
        <Flex vAlignCenter>
          <Icon icon="custom-world-timer" />
          Day {tick.day} Year {tick.year}
        </Flex>
        <Flex vAlignCenter>
          { _getSeasonIcon(tick) }
          { tick.verboseSeason }
        </Flex>
      </Flex>
    </Flex>
  );

}

function _getSeasonIcon(tick) {
  switch (tick.season) {
    case SEASON.FALL:
      return <Icon icon="custom-fall" title="Season" />;
    case SEASON.SPRING:
      return <Icon icon="custom-spring" title="Season" />;
    case SEASON.SUMMER:
      return <Icon icon="custom-summer" title="Season" />;
    case SEASON.WINTER:
      return <Icon icon="custom-winter" title="Season" />;
    default:
      return <Icon icon="question" title="Unknown Season" />;
  }
}

YearAndSeason.propTypes = {
  tick: PropTypes.object.isRequired
};

export default YearAndSeason;
