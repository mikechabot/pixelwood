import React from "react";
import PropTypes from "prop-types";
import ReactTooltip from "react-tooltip";

import Tab from "../common/tabs/Tab";
import { Flex } from "../common/glamorous/index";
import Chart from "../common/Chart";
import Tabs from "../common/tabs/Tabs";
import MedBoardImg from "../../assets/images/medium-board.png";
import { STATISTICS_CHARTS } from "../../common/app-const";

class Statistics extends React.Component {
  render() {
    const { history } = this.props;

    return (
      <Flex
        column
        zIndex={1000}
        width={680}
        height={475}
        className="primary-font"
        background={`url(${MedBoardImg}) no-repeat`}
      >
        <ReactTooltip html={true} />
        <Flex flex={0} padding="35px 0 0 35px">
          <div className="is-size-4 has-text-primary-dark">Statistics</div>
        </Flex>
        <Flex flex={1} margin="15px 30px 40px 20px">
          <Tabs stacked id="stats-tabs" defaultActiveKey="food">
            {this._renderTabs(history)}
          </Tabs>
        </Flex>
      </Flex>
    );

    return (
      <Flex
        column
        zIndex={1000}
        width={680}
        height={475}
        margin="20px 20px"
        border="1px solid red"
        p
        className="primary-font"
        background={`url(${MedBoardImg}) no-repeat`}
      />
    );
  }
  _renderTabs(history) {
    return STATISTICS_CHARTS.map(stat => {
      return (
        <Tab
          key={stat.key}
          eventKey={stat.key}
          label={stat.label}
          icon={stat.icon}
        >
          <Flex className="is-fullheight is-fullwidth" padding="20px 0 20px 0">
            <Chart
              width="100%"
              legend={stat.label}
              dataset={history[stat.category][stat.key]}
              theme={stat.hexTheme}
              yOffset={stat.offset}
            />
          </Flex>
        </Tab>
      );
    });
  }
}

Statistics.propTypes = {
  history: PropTypes.object.isRequired
};

export default Statistics;
