import React from "react";
import TextTicker from "react-native-text-ticker";

const TT = ({ text, styles }) => {
  return (
    <TextTicker
      style={styles}
      duration={10000}
      scroll={false}
      animationType="auto"
      bounce={false}
    >
      {text}
    </TextTicker>
  );
};

export default TT;
