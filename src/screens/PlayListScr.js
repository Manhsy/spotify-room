import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Title from "../components/Title";
import axios from "axios";
import SingleTrackCard from "../components/SingleTrackCard";

const PlayScr = (props) => {
  const roomName = props.navigation.state.params.roomName;

  const [auth, setAuth] = useState();
  const [user, setUser] = useState();
  const [playList, setPlayList] = useState();
  const [playListNames, setPlayListNames] = useState();
  const [playListId, setPlaylistId] = useState();
  const [chosenPlaylist, setChosenPlaylist] = useState();

  useEffect(() => {
    const validateUser = async () => {
      setAuth(await AsyncStorage.getItem("SpotifyAuth"));

      //get user
      axios
        .get("https://api.spotify.com/v1/me", {
          headers: { Authorization: `Bearer ${auth}` },
        })
        .then((res) => {
          setUser(res.data.id);
        })
        .catch((err) => {
          console.log("error in getting user");
          console.log(err);
        });

      //get playlist
      axios
        .get(`https://api.spotify.com/v1/users/${user}/playlists`, {
          headers: { Authorization: `Bearer ${auth}` },
        })
        .then((res) => {
          setPlayList(res.data.items);
        })
        .catch((err) => {
          console.log("error in getting playlist");
          console.log(err);
        });
    };

    validateUser();

    return () => {
      setAuth();
      setUser();
      setPlayList();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Title first={roomName} />
      <SingleTrackCard tracks={playListNames} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: "10%",
  },
});
export default PlayScr;
