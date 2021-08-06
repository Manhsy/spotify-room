import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import TextTicker from "react-native-text-ticker";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SwipeablePanel } from "rn-swipeable-panel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const { height, width } = Dimensions.get("window");

const BottomTab = () => {
  const [panelProps, setPanelProps] = useState({
    fullWidth: true,
    openLarge: true,
    style: { backgroundColor: "#121212" },
    closeOnTouchOutside: true,
    onClose: () => closePanel(),
    onPressCloseButton: () => closePanel(),
    // ...or any prop you want
  });
  const [isPanelActive, setIsPanelActive] = useState(true);
  const [curSongPlaying, setCurSongPlaying] = useState("");
  const [artists, setArtists] = useState([]);
  const [image, setImage] = useState();
  const [token, setToken] = useState();
  const [isPaused, setIsPaused] = useState(true);

  const openPanel = () => {
    setIsPanelActive(true);
  };

  const closePanel = () => {
    setIsPanelActive(false);
  };

  const pause = async () => {
    setIsPaused(!isPaused);

    await axios.put("https://api.spotify.com/v1/me/player/pause", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(res);
  };

  useEffect(() => {
    const getSong = async () => {
      try {
        const token = await AsyncStorage.getItem("SpotifyAuth");
        setToken(token);
        const response = await axios.get(
          "https://api.spotify.com/v1/me/player",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setCurSongPlaying(response.data.item.name);
        setArtists(
          response.data.item.artists.map((artist, index) => artist.name)
        );
        setImage(response.data.item.album.images[0].url);
      } catch (err) {
        console.log(err);
      }
    };
    getSong();
    return () => {
      setIsPanelActive(false);
      setCurSongPlaying("");
      setArtists([]);
      setImage("");
    };
  }, []);

  return (
    <View style={{ alignItems: "center" }}>
      <TouchableOpacity style={styles.tab} onPress={() => openPanel()}>
        <Image style={styles.image} source={{ uri: image }} />
        <View style={styles.textContainer}>
          <Text style={styles.song}>{curSongPlaying}</Text>
          <Text style={styles.artist}>
            {artists.map((name, index) => {
              if (index + 1 !== artists.length) {
                return name + ", ";
              } else {
                return name;
              }
            })}
          </Text>
        </View>
        <TouchableOpacity onPress={() => pause()} style={styles.icon}>
          {isPaused ? (
            <Icon name="pause" size={35} color={"white"} />
          ) : (
            <Icon name="play-arrow" size={35} color={"white"} />
          )}
        </TouchableOpacity>
      </TouchableOpacity>

      <SwipeablePanel {...panelProps} isActive={isPanelActive}>
        <View style={styles.pannelTextContainer}>
          <Image style={styles.largeImage} source={{ uri: image }} />
          <View style={{ marginTop: 40 }}>
            <Text style={styles.pannelSong}>{curSongPlaying}</Text>
            <Text style={styles.pannelArtist}>
              {artists.map((name, index) => {
                if (index + 1 !== artists.length) {
                  return name + ", ";
                } else {
                  return name;
                }
              })}
            </Text>
          </View>
        </View>
      </SwipeablePanel>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {},
  panelContainer: {
    alignItems: "center",
    paddingBottom: 0,
    marginBottom: 0,
  },
  largeImage: {
    marginTop: 50,
    width: 400,
    height: 400,
    borderRadius: 20,
    alignSelf: "center",
  },
  pannelSong: {
    color: "white",
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  pannelArtist: {
    color: "white",
    alignSelf: "center",
    fontSize: 15,
    fontWeight: "bold",
    opacity: 0.7,
  },
  song: { fontSize: 16 },
  artist: {
    opacity: 0.5,
    fontSize: 16,
  },
  image: {
    width: 55,
    height: 55,
  },

  textContainer: {
    margin: 7,
    width: width - 120,
  },
  tab: {
    flexDirection: "row",
    width: width - 20,
    height: height / 15,
    alignItems: "center",
  },
});
export default BottomTab;
