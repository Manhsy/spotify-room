import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const ListSong = (props) => {
  const playListId = props.navigation.state.params.playListId;

  const [songs, setSongs] = useState();
  useEffect(() => {
    const getSongs = async () => {
      const auth = await AsyncStorage.getItem("SpotifyAuth");
      const songs = await axios.get(
        `https://api.spotify.com/v1/playlists/${playListId}/tracks?market=${"US"}`,
        {
          headers: { Authorization: `Bearer ${auth}` },
        }
      );

      setSongs(songs.data.items);
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
      <View>
        <Text>ListSong</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({});
export default ListSong;
