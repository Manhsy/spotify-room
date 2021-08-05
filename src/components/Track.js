import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

const { width, height } = Dimensions.get("window");
const Track = (props) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState();
  const [total, setTotal] = useState();

  const [playListId, setPlaylistId] = useState();

  useEffect(() => {
    setName(props.name);
    setImage(props.images[0].url);
    setTotal(props.tracks.total);
    setPlaylistId(props.id);

    return () => {
      setName();
      setImage();
      setTotal();
    };
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.border}
        onPress={() => {
          props.navigation.navigate("ListSong", { playListId, image, name });
        }}
      >
        <View style={styles.subBorder}>
          <Image style={styles.image} source={{ uri: image }} />
          <View style={styles.textView}>
            <View style={{ flexDirection: "column" }}>
              <Text numOfLines={1} style={styles.name}>
                {name.length > 30 ? name.slice(0, 30) + "..." : name}
              </Text>
              <Text numOfLines={1} style={styles.sub}>
                {total} Tracks
              </Text>
            </View>
          </View>
          <View style={styles.icon}>
            <Icon name="right" size={17} color={"red"} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  icon: {
    alignContent: "flex-end",
    position: "absolute",
    right: 0,
  },
  subBorder: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 6,
    width: width - 50,
  },
  border: {
    margin: 9,
    marginHorizontal: 20,
    justifyContent: "flex-start",
    height: 65,
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: "white",
    flex: 1,
    shadowOpacity: 0.4,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 4 },
  },
  textView: {
    marginHorizontal: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "400",
  },
  sub: {
    fontSize: 11,
    fontWeight: "200",
    fontStyle: "italic",
  },
});

export default Track;
