import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import Title from "../components/Title";
import CustButton from "../components/CustButton";
import SpotifyLogin from "../api/spotifyLogin";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { connect } from "react-redux";
import * as actions from "../redux/actions/playerActions";

const CreateRoomScr = (props) => {
  const [roomName, setRoomName] = useState("");
  const [error, setError] = useState("");

  const login = async () => {
    try {
      const response = await SpotifyLogin();
      await AsyncStorage.setItem("SpotifyAuth", response);
      props.getInitialStates();
      props.navigation.navigate("PlayList", { roomName });
    } catch (err) {
      console.log(err);
    }
  };

  const checkError = () => {
    if (roomName.length === 0) {
      setError("Fill out all needed fields");
    } else {
      login();
    }
  };
  return (
    <ImageBackground
      style={{ width: "100%", height: "100%", flex: 1 }}
      source={require("../backgroundImage/CRkXWm.jpeg")}
    >
      <View style={styles.container}>
        <Title first={"Spotify"} last={"Room"} />

        <View style={styles.subContainer}>
          <TextInput
            style={styles.input}
            placeholder="Room Name"
            maxLength={100}
            multiline={false}
            value={roomName}
            onChangeText={(text) => {
              setRoomName(text);
            }}
          />

          <View style={{ top: "10%" }}>
            {error.length > 0 ? (
              <Text style={styles.error}>{error}</Text>
            ) : null}
            <CustButton
              title="Log into Spotify"
              onSub={checkError}
              buttonColor="#1BD760"
            />

            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("Join");
              }}
            >
              <Text style={styles.joinButton}>Join a Room</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  error: {
    alignSelf: "center",
    color: "red",
    marginBottom: 5,
  },
  input: {
    width: "98%",
    backgroundColor: "white",
    height: 50,
    borderRadius: 5,
    paddingLeft: 16,
    textAlign: "left",
    fontSize: 21,
    left: 4,
  },
  joinButton: {
    alignSelf: "center",
    color: "blue",
    fontSize: 18,
    marginTop: 20,
  },
  container: {
    top: "15%",
  },
  subContainer: {
    top: "30%",
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    getInitialStates: () => {
      dispatch(actions.getInitialStates());
    },
  };
};

export default connect(null, mapDispatchToProps)(CreateRoomScr);
