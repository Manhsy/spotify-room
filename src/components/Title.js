import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useFonts, Signika_400Regular } from "@expo-google-fonts/signika";
import AppLoading from "expo-app-loading";

const Title = ({ first, last, marginTop }) => {
  let [fontsLoaded] = useFonts({
    Signika_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <>
        <Text style={styles.spotify}>──{first}──</Text>
        <Text style={styles.room}>──{last}──</Text>
      </>
    );
  }
};
const styles = StyleSheet.create({
  spotify: {
    textAlign: "center",
    fontWeight: "bold",
    paddingHorizontal: 5,
    fontSize: 55,
    fontFamily: "Signika_400Regular",
  },
  room: {
    fontWeight: "500",
    textAlign: "center",
    fontSize: 55,
    fontFamily: "Signika_400Regular",
  },
});

export default Title;
