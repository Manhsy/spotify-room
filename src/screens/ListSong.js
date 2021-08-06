import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import SongCard from "../components/SongCard";
import TextTicker from "react-native-text-ticker";

const ListSong = (props) => {
  const [songs, setSongs] = useState();
  const [albumCover, setAlbumCover] = useState();
  const [playlistID, setPlaylistId] = useState();
  const [albumName, setAlbumName] = useState("");

  useEffect(() => {
    const getSongs = async () => {
      try {
        setAlbumCover(props.navigation.state.params.image);
        setAlbumName(props.navigation.state.params.name);
        setPlaylistId(props.navigation.state.params.playListId);
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
      setAlbumCover();
      setAlbumName("");
      setPlaylistId();
    };
  }, []);

  return (
    <ImageBackground
      style={{ width: "100%", height: "100%", flex: 1 }}
      source={require("../backgroundImage/CRkXWm.jpeg")}
    >
      <SafeAreaView>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.shadow}>
              <Image style={styles.image} source={{ uri: albumCover }} />
            </View>

            <TextTicker
              style={styles.albumTitle}
              duration={9000}
              scroll={false}
              animationType="auto"
              bounce={false}
            >
              {albumName}
            </TextTicker>

            <SongCard songs={songs} navigation={props.navigation} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  albumTitle: {
    fontWeight: "bold",
    fontSize: 25,
    color: "white",
    position: "relative",
  },
  image: {
    marginBottom: 11,
    width: 250,
    height: 250,
    borderRadius: 5,
  },
  shadow: {
    shadowColor: "#202020",
    shadowOffset: { height: 4 },
    shadowRadius: 5,
    shadowOpacity: 0.8,
  },
  container: {
    flexDirection: "column",
    flex: 1,
    paddingTop: "7%",
    alignSelf: "center",
    alignItems: "center",
  },
});
export default ListSong;
