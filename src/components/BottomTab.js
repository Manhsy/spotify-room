import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { Divider } from "react-native-elements";
import TT from "./TextTicker";
import Icon from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import { SwipeablePanel } from "rn-swipeable-panel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const { height, width } = Dimensions.get("window");

const BottomTab = () => {
  const [panelProps, setPanelProps] = useState({
    fullWidth: true,
    openLarge: true,
    style: {
      backgroundColor: "#121212",
      paddingBottom: 0,
      flex: 1,
    },
    closeOnTouchOutside: true,
    onClose: () => closePanel(),
    onPressCloseButton: () => closePanel(),
    // ...or any prop you want
  });
  const [isPanelActive, setIsPanelActive] = useState(false);
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
          <TT
            text={artists.map((name, index) => {
              if (index + 1 !== artists.length) {
                return name + ", ";
              } else {
                return name;
              }
            })}
            style={styles.artist}
          />
        </View>
        <TouchableOpacity onPress={() => pause()}>
          {isPaused ? (
            <Icon name="pause" size={35} color={"white"} />
          ) : (
            <Icon name="play-arrow" size={35} color={"white"} />
          )}
        </TouchableOpacity>
      </TouchableOpacity>
      <SwipeablePanel {...panelProps} isActive={isPanelActive}>
        <View style={styles.panelContainer}>
          <Image style={styles.largeImage} source={{ uri: image }} />
          <View
            style={{
              marginTop: 40,
              alignItems: "center",
            }}
          >
            <TT text={curSongPlaying} styles={styles.pannelSong} />
            <TT
              styles={styles.pannelArtist}
              text={artists.map((name, index) => {
                if (index + 1 !== artists.length) {
                  return name + ", ";
                } else {
                  return name;
                }
              })}
            />
          </View>
          <View style={{ width: width - 80 }}>
            <Divider
              width={5}
              color="white"
              length={width / 2}
              orientation="horizontal"
              style={styles.audioBar}
            />
          </View>
          <View style={styles.controller}>
            <TouchableOpacity>
              <Icon name="skip-previous" color="white" size={65} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => pause()}>
              {isPaused ? (
                <Feather name="pause-circle" color="white" size={65} />
              ) : (
                <Feather name="play-circle" color="white" size={65} />
              )}
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="skip-next" color="white" size={65} />
            </TouchableOpacity>
          </View>
        </View>
      </SwipeablePanel>
    </View>
  );
};

const styles = StyleSheet.create({
  controller: {
    flexDirection: "row",
    marginTop: 45,
    justifyContent: "space-between",
    width: width - 100,
  },
  audioBar: { marginTop: 30, paddingHorizontal: 10 },
  panelContainer: {
    flex: 1,
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
    fontSize: 20,
    fontWeight: "bold",
  },
  pannelArtist: {
    color: "white",
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
    borderRadius: 3,
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
    marginBottom: 30,
  },
});
export default BottomTab;
