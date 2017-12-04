import React from "react";
import { Flex } from "../common/glamorous/index";
import Icon from "../common/Icon";

function Header() {
  return (
    <Flex
      column
      zIndex={1000}
      width={200}
      height={75}
      padding="0 3px 0 0"
      hAlignCenter
      vAlignCenter
      style={{
        background: `url(${require("../../assets/images/horizontal-board.png")}) no-repeat`,
        backgroundSize: "contain"
      }}
    >
      <Flex
        vAlignCenter
        className="title primary-font has-text-primary-dark is-size-3"
      >
        <div>
          <Icon large icon="custom-mushroom" />
        </div>
        <div>Pixelwood</div>
      </Flex>
    </Flex>
  );
}

export default Header;
