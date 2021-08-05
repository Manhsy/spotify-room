import React, { useState, useEffect } from "react";
import { ScrollView, SafeAreaView, StyleSheet, FlatList } from "react-native";
import Track from "./Track";

const AlbumCard = ({ playList, navigation }) => {
  return (
    <SafeAreaView>
      <ScrollView>
        <FlatList
          data={playList.items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Track {...item} navigation={navigation} />}
        />
      </ScrollView>
    </SafeAreaView>
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
