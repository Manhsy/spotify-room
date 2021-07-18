import React, { useState, useEffect } from "react";
import {
  ScrollView,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  View,
  Dimensions,
} from "react-native";
import Track from "./Track";

const { height, width } = Dimensions.get("window");
const SingleTrackCard = (props) => {
  const [playList, setPlayList] = useState([]);

  useEffect(() => {
    setPlayList(props.items);
    return () => {
      setPlayList();
    };
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <FlatList
          data={playList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Track {...item} />}
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

export default SingleTrackCard;
