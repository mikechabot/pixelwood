import React from "react";
import PropTypes from "prop-types";

class Icon extends React.PureComponent {
  render() {
    const img = this._getIcon(this.props.icon);

    if (img) {
      let size = this.props.large ? 32 : 16;
      return (
        <img
          src={img}
          alt="icon"
          style={{ height: size, width: size, color: "#4a4a4a" }}
        />
      );
    }

    return (
      <span className="icon">
        <i
          title={this.props.title}
          style={this.props.style}
          onClick={this.props.onClick}
          className={`fa fa-${this.props.icon} ${this.props.className || ""} ${
            this.props.onClick ? "pointer" : ""
          }`}
        />
      </span>
    );
  }

  _getIcon(icon) {
    switch (icon) {
      case "stone":
        return require("./icons/stone.png");
      case "stone-danger":
        return require("./icons/stone-danger.png");
      case "custom-food":
        return require("./icons/D13.png");
      case "custom-water":
        return require("./icons/H16.png");
      case "custom-firewood":
        return require("./icons/Crafting_85.png");
      case "custom-stone":
        return require("./icons/Crafting_73.png");
      case "custom-timber":
        return require("./icons/D9.png");
      case "custom-iron":
        return require("./icons/Crafting_52.png");
      case "custom-world-timer":
        return require("./icons/M13.png");
      case "custom-labor-pool":
        return require("./icons/Weapon_46.png");
      case "custom-winter":
        return require("./icons/Crafting_14.png");
      case "custom-spring":
        return require("./icons/Crafting_35.png");
      case "custom-fall":
        return require("./icons/Crafting_42.png");
      case "custom-summer":
        return require("./icons/Crafting_28.png");
      case "custom-population":
        return require("./icons/Armor_18.png");
      case "custom-profession":
        return require("./icons/Misc_53.png");
      case "custom-stats":
        return require("./icons/Misc_47.png");
      case "custom-building":
        return require("./icons/Crafting_63.png");
      case "custom-drying-hut":
        return require("./icons/Crafting_71.png");
      case "custom-pause":
        return require("./icons/pause.png");
      case "custom-play":
        return require("./icons/play.png");
      case "custom-ff":
        return require("./icons/fast-forward.png");
      case "custom-structure":
        return require("./icons/Misc_02.png");
      case "custom-mushroom":
        return require("./icons/mushroom-2.png");
      case "custom-diamond":
        return require("./icons/Crafting_09.png");
      case "custom-family":
        return require("./icons/Shield_18.png");
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
