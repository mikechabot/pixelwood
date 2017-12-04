import React from "react";
import PropTypes from "prop-types";
import { Flex } from "../common/glamorous/index";
import Icon from "../common/Icon";

const tabs = [
  { key: "struct", icon: "custom-structure", label: "Structures" },
  { key: "prof", icon: "custom-profession", label: "Professions" },
  { key: "stats", icon: "custom-stats", label: "Stats" },
  { key: "pop", icon: "custom-population", label: "Population" }
];

class Menu extends React.PureComponent {
  render() {
    return (
      <Flex
        column
        zIndex={1000}
        width={175}
        height={460}
        padding="30px 0 0 30px"
        backgroundSize="cover"
        className="primary-font"
        background={`url(${require("../../assets/images/vertical-board.png")}) no-repeat`}
      >
        <div className="has-text-primary-dark is-size-5">Menu</div>
        {tabs.map(tab => {
          const isActive = tab.key === this.props.activeKey;
          return (
            <Flex
              margin="15px 0"
              key={tab.key}
              vAlignCenter
              onClick={() => this.props.onSelect(tab.key)}
              className="has-text-dark is-tab-link"
              style={{ cursor: "pointer" }}
            >
              <Icon icon={isActive ? "custom-diamond" : tab.icon} />
              {tab.label}
            </Flex>
          );
        })}
      </Flex>
    );
  }
}

Menu.propTypes = {
  onSelect: PropTypes.func.isRequired
};

export default Menu;
