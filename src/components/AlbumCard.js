import React, { useState, useEffect } from "react";
import {
  ScrollView,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Animated,
  StatusBar,
} from "react-native";
import Track from "./Track";

const AlbumCard = ({ playList, navigation }) => {
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const ITEM_SIZE = 50 * 8;
  return (
    <FlatList
      data={playList.items}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => (
        <Track {...item} navigation={navigation} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
  },
  button: {
    flexDirection: "row",
  },
});

export default AlbumCard;
