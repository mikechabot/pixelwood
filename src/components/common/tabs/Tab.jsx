import React from "react";
import PropTypes from "prop-types";

function Tab({ id, children }) {
  return (
    <div id={id} className="is-fullwidth is-fullheight overflow-auto">
      {children}
    </div>
  );
}

Tab.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
  stacked: PropTypes.bool,
  label: PropTypes.string, // Used when building tab list in <Tabs />
  show: PropTypes.bool, // Used when building tab list in <Tabs />
  eventKey: PropTypes.oneOfType([
    // Used when building tab list in <Tabs />
    PropTypes.string,
    PropTypes.number
  ])
};

export default Tab;
