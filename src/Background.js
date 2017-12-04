import React, { Component } from "react";

import $ from "jquery";

const SUBTLY = 20;
const MAX_WIDTH = 700;
const NUMBER_OF_LAYERS = 6;
const EVENT = "mousemove";

class Background extends Component {
  constructor(props) {
    super(props);
    this.state = {
      styles: []
    };
    this._renderLayer = this._renderLayer.bind(this);
    this._handleMouse = this._handleMouse.bind(this);
  }

  componentDidMount() {
    window.addEventListener(EVENT, this._handleMouse);
  }

  componentWillUnmount() {
    window.removeEventListener(EVENT, this._handleMouse);
  }

  render() {
    return <div className="forest">{this._renderLayers()}</div>;
  }

  _renderLayers() {
    return _getDummyArray().map(this._renderLayer);
  }

  _renderLayer(each, index) {
    const key = `p${index}`;
    return (
      <img
        alt={`forest-layer-${key}`}
        key={key}
        className={key}
        style={this.state.styles[index]}
        src={require(`./assets/images/layer_${index}.svg`)}
      />
    );
  }

  _handleMouse(e) {
    if ($(window).width() > MAX_WIDTH) {
      const newX = -($(window).innerWidth() / 2 - e.pageX) / SUBTLY;
      this.setState({
        styles: _getDummyArray().map((each, index) =>
          _transformLayerByIndex(newX, index)
        )
      });
    }
  }
}

function _getDummyArray() {
  return [...new Array(NUMBER_OF_LAYERS)];
}

function _transformLayerByIndex(newX, index) {
  return {
    transform:
      "translateX(" +
      newX / _getNewXDivisor(index) * _getModifier(index) +
      "px)"
  };
}

function _getModifier(index) {
  return index % 2 === 0 ? -1 : 1;
}

function _getNewXDivisor(index) {
  switch (index) {
    case 0: // Fall through
    case 1:
      return 16;
    case 2: // Fall through
    case 3:
      return 15;
    case 4:
      return 14;
    case 5:
      return 13;
    default:
      return 1;
  }
}

export default Background;
