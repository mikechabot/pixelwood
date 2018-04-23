import React from 'react';
import PropTypes from 'prop-types';

class Icon extends React.PureComponent {
    render() {
        const img = this._getIcon(this.props.icon);

        if (img) {
            let size = 16;

            if (this.props.large) {
                size = 32;
            } else if (this.props.medium) {
                size = 24;
            }

            let image = (
                <img
                    src={img}
                    alt="icon"
                    className={this.props.className}
                    title={this.props.title}
                    style={{
                        height: size,
                        width: size,
                        cursor: this.props.onClick ? 'pointer' : ''
                    }}
                    onClick={this.props.onClick}
                />
            );

            if (!this.props.label) {
                return image;
            }

            return (
                <span className="icon">
                    {image}
                    &nbsp;
                    {this.props.label}
                </span>
            );
        }

        return (
            <span className="icon">
                <i
                    title={this.props.title}
                    style={this.props.style}
                    onClick={this.props.onClick}
                    className={`fa fa-${this.props.icon} ${this.props.className || ''} ${
                        this.props.onClick ? 'pointer' : ''
                    }`}
                />
                {this.props.label}
            </span>
        );
    }

    _getIcon(icon) {
        switch (icon) {
            case 'dice':
                return require('./icons/dice.png');
            default:
                return null;
        }
    }
}

Icon.propTypes = {
    icon: PropTypes.string.isRequired,
    title: PropTypes.string,
    style: PropTypes.object,
    className: PropTypes.string,
    onClick: PropTypes.func
};

export default Icon;
