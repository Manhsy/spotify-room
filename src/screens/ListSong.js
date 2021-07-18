import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const ListSong = (props) => {
  const playListId = props.navigation.state.params.playListId;

  const [songs, setSongs] = useState();
  useEffect(() => {
    const getSongs = async () => {
      const auth = await AsyncStorage.getItem("SpotifyAuth");
      const markets = await axios.get("https://api.spotify.com/v1/markets", {
        headers: { Authorization: `Bearer ${auth}` },
      });

      //markets.data

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
    <View>
      <Text>ListSong</Text>
    </View>
  );
};
const styles = StyleSheet.create({});
export default ListSong;
