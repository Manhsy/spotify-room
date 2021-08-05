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

const ListSong = (props) => {
  const [songs, setSongs] = useState();
  const [albumCover, setAlbumCover] = useState();
  const [playlistID, setPlaylistId] = useState();
  const [albumName, setAlbumName] = useState("");

  useEffect(() => {
    setAlbumCover(props.navigation.state.params.image);
    setAlbumName(props.navigation.state.params.name);

    const getSongs = async () => {
      try {
        setPlaylistId(props.navigation.state.params.playListId);
        const auth = await AsyncStorage.getItem("SpotifyAuth");
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
      <SafeAreaView>
        <ScrollView>
          <View style={styles.container}>
            <Image style={styles.image} source={{ uri: albumCover }} />
            <Text style={styles.albumTitle}>
              {albumName.length > 25
                ? albumName.slice(0, 25) + "..."
                : albumName}
            </Text>
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
    marginBottom: 20,
  },
  image: {
    marginBottom: 11,
    width: 250,
    height: 250,
    borderRadius: 5,
    shadowColor: "grey",
    shadowOpacity: 1,
    shadowOffset: {
      width: 251,
      height: 251,
    },
    shadowRadius: 5,
  },
  container: {
    flex: 1,
    paddingTop: "7%",
    alignSelf: "center",
    alignItems: "center",
  },
});
export default ListSong;
