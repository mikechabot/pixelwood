import React from "react";
import Icon from "./Icon";

class Button extends React.PureComponent {
  render() {
    return (
      <button
        style={{backgroundColor: this.props.backgroundColor}}
        title={this.props.title}
        className={`button ${this.props.small ? "is-small" : ""} ${this.props.large ? "is-large" : ""} ${this.props.className}`}
        disabled={this.props.disabled}
        onClick={this.props.onClick}
      >
        {this._maybeRenderIcon(this.props.icon)}
        {this._maybeRenderContent(this.props.children)}
      </button>
    );
  }
  _maybeRenderIcon(icon) {
    if (icon) {
      return <Icon large={this.props.large} icon={this.props.icon} />;
    }
  }
  _maybeRenderContent(children) {
    if (children) {
      return <span>{children}</span>;
    }
  }
}

export default Button;
