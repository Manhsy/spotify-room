import React, { useState, useCallback, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Slider from "@react-native-community/slider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as actions from "../redux/actions/playerActions";
import { connect } from "react-redux";

const { width, height } = Dimensions.get("window");

const PannelProgressBar = (props, { barWidth }) => {
  const [token, setToken] = useState();
  const [totalTime, setTotalTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const { artists, currentSong, image, isPlaying } = props.playerState;

  useEffect(() => {
    const getValue = async () => {
      try {
        const token = await AsyncStorage.getItem("SpotifyAuth");
        setToken(token);

        const response = await axios.get(
          "https://api.spotify.com/v1/me/player",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setTotalTime(response.data.item.duration_ms);
        setCurrentTime(response.data.progress_ms);
      } catch (err) {
        console.log("error in panel progress bar");
        console.log(err);
      }
    };

    getValue();
    const interval = setInterval(() => {
      if (isPlaying) {
        setCurrentTime((currentTime) => currentTime + 1000);
      }
    }, 1000);
    return () => {
      setTotalTime(0);
      setCurrentTime(0);
      clearInterval(interval);
    };
  }, []);

  const rerender = () => {
    axios
      .get("https://api.spotify.com/v1/me/player", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setTotalTime(response.data.item.duration_ms);
        setCurrentTime(response.data.progress_ms);
      })
      .catch((err) => {
        console.log("error in rendering panel progress bar");
        console.log(err);
      });
    props.getCurrentState();

    return (
      <View style={{ flexDirection: "row", marginTop: 25 }}>
        <Text style={{ color: "white", marginTop: 11 }}>
          {Math.floor(currentTime / 1000 / 60)}:
          {Math.floor((currentTime / 1000) % 60) < 9
            ? 0 + "" + Math.floor((currentTime / 1000) % 60)
            : Math.floor((currentTime / 1000) % 60)}
        </Text>
        <Slider
          style={{ width: barWidth }}
          minimumValue={0}
          maximumValue={totalTime}
          value={currentTime}
          thumbTintColor={"#ffffff00"}
        />
        <Text style={{ color: "white", marginTop: 11 }}>
          {Math.floor(totalTime / 1000 / 60)}:
          {Math.floor((totalTime / 1000) % 6) < 9
            ? 0 + "" + Math.floor((totalTime / 1000) % 6)
            : Math.floor((totalTime / 1000) % 6)}
        </Text>
      </View>
    );
  };
  return (
    <View>
      {currentTime >= totalTime ? (
        rerender()
      ) : (
        <View style={{ flexDirection: "row", marginTop: 25 }}>
          <Text style={{ color: "white", marginTop: 11 }}>
            {Math.floor(currentTime / 1000 / 60)}:
            {Math.floor((currentTime / 1000) % 60) <= 9
              ? 0 + "" + Math.floor((currentTime / 1000) % 60)
              : Math.floor((currentTime / 1000) % 60)}
          </Text>
          <Slider
            style={{ width: width - 100 }}
            minimumValue={0}
            maximumValue={totalTime}
            value={currentTime}
            thumbTintColor={"#ffffff00"}
          />

          <Text style={{ color: "white", marginTop: 11 }}>
            {Math.floor(totalTime / 1000 / 60)}:
            {Math.floor((totalTime / 1000) % 6) <= 9
              ? 0 + "" + Math.floor((totalTime / 1000) % 6)
              : Math.floor((totalTime / 1000) % 6)}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

const mapStateToProps = (state) => {
  const { playerState } = state;
  return {
    playerState: playerState,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    play: () => dispatch(actions.play()),
    pause: () => dispatch(actions.pause()),
    getCurrentState: () => dispatch(actions.getInitialStates()),
    prev: () => dispatch(actions.prev()),
    next: () => dispatch(actions.next()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PannelProgressBar);
