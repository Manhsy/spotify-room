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
    <Animated.FlatList
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true }
      )}
      data={playList.items}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{
        paddingTop: StatusBar.currentHeight,
      }}
      renderItem={({ item, index }) => {
        const inputRange = [-1, 0, ITEM_SIZE + index, ITEM_SIZE * (index + 2)];
        const scale = scrollY.interpolate({
          inputRange,
          outputRange: [1, 1, 1, 0],
        });
        return (
          <Animated.View style={{ transform: [{ scale }] }}>
            <Track {...item} navigation={navigation} />
          </Animated.View>
        );
      }}
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
