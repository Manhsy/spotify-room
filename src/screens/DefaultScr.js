import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import CustButton from "../components/CustButton";
import Title from "../components/Title";
import * as AuthSession from "expo-auth-session";

const DefaultScr = ({ navigation }) => {
  console.log(AuthSession.makeRedirectUri());
  return (
    <ImageBackground
      style={{ width: "100%", height: "100%", flex: 1 }}
      source={require("../backgroundImage/CRkXWm.jpeg")}
    >
      <View style={styles.container}>
        <Title first={"Spotify"} last={"Room"} />
        <View style={styles.subContainer}>
          <CustButton
            title="Create Room"
            onSub={() => {
              navigation.navigate("Create");
            }}
            disable={false}
            buttonColor="#E5DCF3"
          />
          <View style={{ top: 20 }}>
            <CustButton
              title="Join Room"
              onSub={() => {
                navigation.navigate("Join");
              }}
              disable={false}
              buttonColor="#D3E5F2"
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    top: "15%",
  },
  subContainer: {
    top: "30%",
  },
});

export default DefaultScr;
