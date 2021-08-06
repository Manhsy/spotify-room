import React from "react";
import { Header } from "react-native-elements";

const Header = ({ left, right, center }) => {
  return (
    <Header
      backgroundColor="#ffffff00"
      leftComponent={{
        icon: { left },
        iconStyle: { color: "#fff" },
      }}
      centerComponent={{ text: { right }, style: { color: "#fff" } }}
      rightComponent={{ icon: { center }, color: "#fff" }}
    />
  );
};

export default Header;
