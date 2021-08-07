import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import SongCard from "../components/SongCard";
import TT from "../components/TextTicker";
import BottomTab from "../components/BottomTab";
const { height, width } = Dimensions.get("window");
const ListSong = (props) => {
  const [songs, setSongs] = useState();

  const albumCover = props.navigation.state.params.image;
  const albumName = props.navigation.state.params.name;
  const playlistID = props.navigation.state.params.playListId;

  useEffect(() => {
    const getSongs = async () => {
      try {
        const auth = await AsyncStorage.getItem("SpotifyAuth");
        console.log(auth);
        const songs = await axios.get(
          `https://api.spotify.com/v1/playlists/${playlistID}/tracks?market=${"US"}`,
          {
            headers: { Authorization: `Bearer ${auth}` },
          }
        );
        setSongs(songs.data.items);
      } catch (err) {
        console.log(err);
      }
    };

    getSongs();
    return () => {
      setSongs();
    };
  }, []);

  return (
    <ImageBackground
      style={{ width: "100%", height: "100%", flex: 1 }}
      source={require("../backgroundImage/CRkXWm.jpeg")}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View>
            <View style={styles.shadow}>
              <Image style={styles.image} source={{ uri: albumCover }} />
            </View>
            <View
              style={{
                alignSelf: "center",
                alignItems: "center",
                width: width / 1.3,
              }}
            >
              <TT text={albumName} styles={styles.albumTitle} />
            </View>

            <SongCard songs={songs} navigation={props.navigation} />
          </View>
        </ScrollView>
      </SafeAreaView>
      <View
        style={{
          marginBottom: 0,
        }}
      >
        <BottomTab />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  albumTitle: {
    fontWeight: "bold",
    paddingBottom: 10,
    fontSize: 25,
    color: "white",
    alignSelf: "center",
  },
  image: {
    marginBottom: 11,
    width: 250,
    height: 250,
    borderRadius: 5,
    alignSelf: "center",
  },
  shadow: {
    shadowColor: "#202020",
    shadowOffset: { height: 4 },
    shadowRadius: 5,
    shadowOpacity: 0.8,
  },
  container: {
    flex: 1,
    paddingTop: "7%",
    alignItems: "center",
  },
});
export default ListSong;
