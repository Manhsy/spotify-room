import React from "react";
import { ScrollView, SafeAreaView, StyleSheet, FlatList } from "react-native";
import Song from "./Song";

const SingleTrackCard = ({ songs, navigation }) => {
  return (
    <FlatList
      data={songs}
      keyExtractor={(item) =>
        item.track.id + (Math.random() + 1).toString(36).substring(7)
      }
      renderItem={({ item }) => (
        <Song
          songs={item}
          index={songs.indexOf(item) + 1}
          navigation={navigation}
        />
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

export default SingleTrackCard;
