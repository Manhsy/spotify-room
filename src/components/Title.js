import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Title = ({ first, last, marginTop }) => {
  return (
    <>
      <Text style={styles.spotify}>{first}</Text>
      <Text style={styles.room}>{last}</Text>
    </>
  );
};
const styles = StyleSheet.create({
  spotify: {
    top: "10%",
    fontStyle: "italic",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 55,
  },
  room: {
    top: "12%",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 55,
  },
});

export default Title;
