import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import TT from "./TextTicker";

const { width, height } = Dimensions.get("window");

const Song = (props) => {
  const song = props.songs;
  const ind = props.index;
  const imageLength = song.track.album.images.length;

  return (
    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate("Play", {
          song,
        });
      }}
      style={styles.borderContainer}
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: song.track.album.images[
                Math.floor(Math.random() * imageLength)
              ].url,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "column",
          }}
        >
          <View style={{ width: width - 135 }}>
            <TT text={song.track.name} styles={styles.name} />
          </View>

          <Text style={styles.artistName}>
            {song.track.album.artists[0].name}
          </Text>
        </View>
        <Icon style={styles.icon} name="playcircleo" size={17} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  borderContainer: {
    width: width - 20,
    borderRadius: 5,
  },
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
    alignSelf: "flex-start",
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
