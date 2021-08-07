import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import AlbumCard from "../components/AlbumCard";
import BottomTab from "../components/BottomTab";

const PlayScr = (props) => {
  const roomName = props.navigation.state.params.roomName;
  const [auth, setAuth] = useState();
  const [user, setUser] = useState();
  const [playList, setPlayList] = useState([]);
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
    <ImageBackground
      style={{ width: "100%", height: "100%", flex: 1 }}
      source={require("../backgroundImage/CRkXWm.jpeg")}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={{ marginVertical: 30, justifyContent: "center" }}>
            <Text style={styles.title}>{roomName}</Text>
          </View>
          <View>
            <AlbumCard playList={playList} navigation={props.navigation} />
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
  bottomTab: {
    marginBottom: 0,
  },
  container: {
    flex: 1,
  },
  title: {
    alignSelf: "center",
    fontSize: 55,
  },
});
export default PlayScr;
