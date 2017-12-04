import React from "react";
import PropTypes from "prop-types";
import Button from "../common/Button";
import { MAX_SPEED, MIN_SPEED } from "../../common/app-const";
import { Flex } from "../common/glamorous/index";

function TimerControl({
  speed,
  disabled,
  isRunning,
  startTimer,
  stopTimer,
  increaseTickSpeed,
  decreaseTickSpeed
}) {
  return (
    <Flex
      zIndex={1000}
      width={200}
      height={75}
      hAlignCenter
      vAlignCenter
      style={{
        background: `url(${require("../../assets/images/horizontal-board.png")}) no-repeat`,
        backgroundSize: "cover"
      }}
    >
      <Button
        className="fa-rotate-180 is-text is-tab-link"
        icon="custom-ff"
        disabled={speed === MIN_SPEED || disabled}
        onClick={decreaseTickSpeed}
        title="Slower"
      />
      <Button
        icon={isRunning ? "custom-pause" : "custom-play"}
        disabled={disabled}
        onClick={isRunning ? stopTimer : startTimer}
        className="is-text is-tab-link"
        title="Resume"
      />
      <Button title="Speed" className="is-text" disabled>
        <strong style={{ fontFamily: "monospace" }}>
          {parseInt(1000 / speed, 10)}x
        </strong>
      </Button>
      <Button
        icon="custom-ff"
        className="is-text is-tab-link"
        disabled={speed === MAX_SPEED || disabled}
        onClick={increaseTickSpeed}
        title="Faster"
      />
    </Flex>
  );
}

TimerControl.propTypes = {
  speed: PropTypes.number.isRequired,
  isRunning: PropTypes.bool.isRequired,
  startTimer: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
  increaseTickSpeed: PropTypes.func.isRequired,
  decreaseTickSpeed: PropTypes.func.isRequired
};

export default TimerControl;
