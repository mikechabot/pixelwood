import React from "react";
import PropTypes from "prop-types";
import Maybe from "maybe-baby";

import Tab from "./Tab";
import { Flex } from "../glamorous";
import Icon from "../Icon";

const NOT_ALLOWED = { cursor: "not-allowed" };

function __hasValue(obj) {
  return obj !== null && obj !== undefined;
}

class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uncontrolledTabKey: null
    };
  }

  componentDidMount() {
    const { defaultActiveKey } = this.props;
    if (__hasValue(defaultActiveKey)) {
      let activeKey = defaultActiveKey;

      const savedKey = window.localStorage.getItem(this.props.id);
      if (savedKey) {
        activeKey = JSON.parse(savedKey).uncontrolledTabKey;
      }

      this.setState({
        uncontrolledTabKey: activeKey
      });
    }
  }

  componentWillUnmount() {
    window.localStorage.setItem(
      this.props.id,
      JSON.stringify({ uncontrolledTabKey: this.state.uncontrolledTabKey })
    );
  }

  render() {
    const tabs = __getTabs(this.props.children);

    __detectDescendantTypeMismatches(tabs);
    __detectControlledUncontrolledPropMismatches(
      this.props.activeKey,
      this.props.defaultActiveKey,
      this.props.onSelect
    );

    return this._renderTabList(tabs);
  }

  _renderTabList(tabs) {
    return (
      <Flex
        id={this.props.id}
        className="is-fullheight is-fullwidth overflow-hidden"
        style={this.props.style}
      >
        <Flex column flex={0} padding="0 0 0 10px">
          {this._renderTabs(tabs, this._renderHorizontalTab)}
        </Flex>
        <Flex flex={1} className="full-height">
          {this._renderTabContent(tabs)}
        </Flex>
      </Flex>
    );
  }

  _renderHorizontalTab(child, index) {
    const { disabled } = this.props;
    const tabProps = child.props;
    const isTabActive = tabProps.eventKey === this._getActiveTabKey();

    let icon = tabProps.icon;
    if (isTabActive) {
      icon = 'custom-diamond';
    }

    return (
      <div
        key={index}
        onClick={this._handleTabSelect.bind(this, tabProps.eventKey)}
        className="is-capitalized is-size-7"
        style={{
          ...index !== 0 ? { marginTop: 20  } : {},
          ...disabled ? NOT_ALLOWED : {}
        }}
        title={tabProps.label}
      >
        <a className="has-text-primary-dark is-tab-link">
          <Flex vAlignCenter>
            {this._maybeRenderTabIcon(icon)}
            <span>{tabProps.label}</span>
          </Flex>
        </a>
      </div>
    );
  }

  _maybeRenderTabIcon(icon) {
    if (icon) {
      return <Icon icon={icon} />;
    }
  }

  _renderTabs(tabs, renderCallback) {
    return tabs.map(renderCallback.bind(this));
  }

  _renderTabContent(children) {
    const activeKey = this._getActiveTabKey();
    return children.map((child, key) => {
      if (child.props.eventKey === activeKey) {
        return React.cloneElement(child, { key });
      }
      return null;
    });
  }

  _handleTabSelect(eventKey) {
    if (!this.props.onSelect) {
      if (eventKey !== this.state.uncontrolledTabKey) {
        this.setState({ uncontrolledTabKey: eventKey });
      }
    } else {
      this.props.onSelect(eventKey);
    }
  }

  _getActiveTabKey() {
    return __hasValue(this.props.activeKey)
      ? this.props.activeKey
      : this.state.uncontrolledTabKey;
  }
}

function __getTabs(tabs) {
  if (!Array.isArray(tabs)) {
    tabs = [tabs];
  }
  return tabs.filter(tab => {
    if (!tab) return false;
    return (
      Maybe.of(tab.props)
        .prop("show")
        .orElse(true)
        .join() === true
    );
  });
}

function __detectDescendantTypeMismatches(tabs) {
  const typeMismatches = __getDescendantTypeMismatches(tabs);
  if (typeMismatches.length > 0) {
    __logDescendantTypeMismatches(typeMismatches);
    throw new Error("Descendant type mismatches detected");
  }
}

function __getDescendantTypeMismatches(tabs) {
  if (!tabs) return [];
  return tabs.filter(child => child.type !== <Tab />.type);
}

function __logDescendantTypeMismatches(typeMismatches) {
  if (!typeMismatches) return;
  typeMismatches.forEach(typeMismatch => {
    console.error(
      `Expected children of "Tabs" to be of type "Tab", but found type "${__getType(
        typeMismatch
      )}"`
    );
  });
}

function __getType(instance) {
  if (!instance.type) return "Unknown";
  if (typeof instance.type === "function") {
    return instance.type.name;
  }
  return instance.type;
}

function __detectControlledUncontrolledPropMismatches(
  activeKey,
  defaultActiveKey,
  onSelect
) {
  if (__hasValues(activeKey, defaultActiveKey)) {
    throw new Error(
      'Mixing controlled and uncontrolled props. Specify an "activeKey" or a "defaultActiveKey", but not both.'
    );
  }
  if (__hasValues(defaultActiveKey, onSelect)) {
    throw new Error(
      'Mixing controlled and uncontrolled props. If specifying an "onSelect" function, use "activeKey" instead of "defaultActiveKey.'
    );
  }
}

function __hasValues(...values) {
  return values.every(value => __hasValue(value));
}

Tabs.propTypes = {
  id: PropTypes.string.isRequired,
  defaultActiveKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  controlsHorizontal: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  activeKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onSelect: PropTypes.func,
  children: PropTypes.node.isRequired
};

export default Tabs;
