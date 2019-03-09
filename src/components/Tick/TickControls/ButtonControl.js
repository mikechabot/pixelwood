import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class ButtonControl extends Component {
  render() {
    return (
      <button
        className={`button ${this.props.className}`}
        disabled={this.props.disabled}
        onClick={this.props.onClick}>
        <FontAwesomeIcon icon={this.props.icon} />
      </button>
    );
  }
}

ButtonControl.propTypes = {
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.instanceOf(Object).isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default ButtonControl;
