import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet, ImageBackground } from "react-native";

const CurPlayScr = (props) => {
  const song = props.navigation.state.params.song;
  console.log(song.track.uri);

  return (
    <ImageBackground
      style={{ width: "100%", height: "100%", flex: 1 }}
      source={require("../backgroundImage/CRkXWm.jpeg")}
    >
      <View>
        <Text>PLAY MY GODDAMN MUSIC!</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({});

export default CurPlayScr;
