import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Title from "../components/Title";
import axios from "axios";
import SingleTrackCard from "../components/SingleTrackCard";

const PlayScr = (props) => {
  const roomName = props.navigation.state.params.roomName;
  const [auth, setAuth] = useState();
  const [user, setUser] = useState();
  const [playList, setPlayList] = useState([]);
  const [playListNames, setPlayListNames] = useState();
  const [playListId, setPlaylistId] = useState();
  const [chosenPlaylist, setChosenPlaylist] = useState();
  const [coverAlb, setCoverAlb] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validate = async () => {
      try {
        const token = await AsyncStorage.getItem("SpotifyAuth");
        setAuth(token);
        const userID = await axios.get("https://api.spotify.com/v1/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(userID.data.id);
        const playList = await axios.get(
          `https://api.spotify.com/v1/users/${userID.data.id}/playlists`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPlayList(playList.data);
      } catch (err) {
        console.error(err);
      }
    };
    validate();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{ marginVertical: 30, justifyContent: "center" }}>
          <Text style={styles.title}>{roomName}</Text>
        </View>
        <View>
          <SingleTrackCard playList={playList} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    alignSelf: "center",
    fontSize: 55,
    fontWeight: "400",
    fontStyle: "italic",
  },
});
export default PlayScr;
