import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

const Song = (props) => {
  const song = props.songs;
  const ind = props.index;
  return (
    <View>
      <TouchableOpacity>
        <View style={styles.container}>
          <Text style={styles.index}>{ind}</Text>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{ uri: song.track.album.images[0].url }}
            />
          </View>
          <View
            style={{
              flexDirection: "column",
            }}
          >
            <Text numberOfLines={1} style={styles.name}>
              {song.track.name.length > 25
                ? song.track.name.slice(0, 25) + "...         "
                : song.track.name}
            </Text>
            <Text style={styles.artistName}>
              {song.track.album.artists[0].name}
            </Text>
          </View>
          <Icon style={styles.icon} name="playcircleo" size={17} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    margin: 1,
    flexDirection: "row",
    flex: 1,
  },
  icon: {
    alignContent: "flex-end",
    position: "absolute",
    right: 0,
    marginTop: 10,
  },
  index: {
    marginRight: 15,
    marginTop: 15,
    fontSize: 17,
  },
  imageContainer: {
    marginHorizontal: 10,
    marginBottom: 10,
  },
  image: {
    width: 55,
    height: 55,
    borderRadius: 3,
  },
  name: {
    alignSelf: "flex-start",
    fontSize: 17,
  },
  artistName: {
    alignSelf: "flex-start",
    color: "grey",
    fontStyle: "italic",
  },
});

export default Song;