import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Avatar } from "react-native-elements";

const { width, height } = Dimensions.get("window");
const Track = (props) => {
  const [name, setName] = useState();
  const [image, setImage] = useState();
  const [total, setTotal] = useState();

  useEffect(() => {
    setName(props.name);
    setImage(props.images[0].url);
    setTotal(props.tracks.total);

    return () => {
      setName();
      setImage();
      setTotal();
    };
  });
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <View style={styles.button}>
          <Avatar
            size="medium"
            source={{
              uri: image,
            }}
          />
          <View>
            <Text numOfLines={1} style={styles.name}>
              {name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
    margin: 10,
  },
  button: {
    flexDirection: "row",
  },
  name: {
    marginLeft: 13,
    marginTop: 12,
    marginRight: 45,
    fontSize: 18,
    color: "#f8f8ff",
    fontWeight: "400",
  },
  sub: {},
});

export default Track;
