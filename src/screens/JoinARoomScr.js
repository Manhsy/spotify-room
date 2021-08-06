import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import CustButton from "../components/CustButton";
import Title from "../components/Title";
const JoinARoomScr = ({ navigation }) => {
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState("");
  const validateRoomCode = () => {
    //API call
  };

  const checkError = () => {
    if (roomCode.length === 0) {
      setError("Fill out all needed fields");
    } else {
      validateRoomCode();
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
            placeholder="Room Code"
            maxLength={100}
            multiline={false}
            onTextChange={(text) => {
              setRoomCode(text);
              setError("");
            }}
          />

          <View style={{ top: "10%" }}>
            {error.length > 0 ? (
              <Text style={styles.error}> {error}</Text>
            ) : null}
            <CustButton title="Join" onSub={checkError} buttonColor="#1BD760" />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Create");
              }}
            >
              <Text style={styles.createButton}>Create a room</Text>
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
  createButton: {
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

export default JoinARoomScr;
