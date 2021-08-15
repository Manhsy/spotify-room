import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Slider from "@react-native-community/slider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../redux/actions/playerActions";

const { height, width } = Dimensions.get("window");

const ProgressBar = (props, { barWidth }) => {
  const { isPlaying } = props.playerState;

  const [token, setToken] = useState();
  const [totalTime, setTotalTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

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
        console.log("error in progress bar");
        console.log(err);
      }
    };

    getValue();
    const interval = setInterval(() => {
      if (isPlaying) setCurrentTime((currentTime) => currentTime + 1000);
    }, 1000);
    return () => {
      setTotalTime(0);
      setCurrentTime(0);
      clearInterval(interval);
    };
  }, [isPlaying]);

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
        console.log("error in rendering progress bar");
        console.log(err);
      });
    setTimeout(() => {
      props.getCurrentState();
    }, 3000);
    return (
      <Slider
        style={{ width: barWidth }}
        minimumValue={0}
        maximumValue={totalTime}
        value={currentTime}
        thumbTintColor={"#ffffff00"}
      />
    );
  };
  return (
    <View style={{ width: width }}>
      {currentTime >= totalTime ? (
        rerender()
      ) : (
        <Slider
          style={{ width: barWidth }}
          minimumValue={0}
          maximumValue={totalTime}
          value={currentTime}
          thumbTintColor={"#ffffff00"}
        />
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
    next: () => dispatch(actions.next()),
    prev: () => dispatch(actions.prev()),
    getCurrentState: () => dispatch(actions.getInitialStates()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProgressBar);
