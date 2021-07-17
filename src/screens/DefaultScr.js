import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import CustButton from "../components/CustButton";
import Title from "../components/Title";
import * as AuthSession from "expo-auth-session";

const DefaultScr = ({ navigation }) => {
  console.log(AuthSession.makeRedirectUri());
  return (
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
