import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Slider from "@react-native-community/slider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { render } from "react-dom";
const { width, height } = Dimensions.get("window");

const ProgressBar = ({ h, w, customLabel, onChange }) => {
  const [token, setToken] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
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

        setIsPlaying(response.data.is_playing);
        setTotalTime(response.data.item.duration_ms);
        setCurrentTime(response.data.progress_ms);
      } catch (err) {
        console.log("error in progress bar");
        console.log(err);
      }
    };

    getValue();
    const interval = setInterval(() => {
      setCurrentTime((currentTime) => currentTime + 1000);
    }, 1000);
    return () => {
      setIsPlaying(false);
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
        setIsPlaying(response.data.is_playing);
        setTotalTime(response.data.item.duration_ms);
        setCurrentTime(response.data.progress_ms);
      })
      .catch((err) => {
        console.log("error in reredering progress bar");
        console.log(err);
      });
    onChange();
    return (
      <Slider
        style={{ width: width - 20 }}
        minimumValue={0}
        maximumValue={totalTime}
        value={currentTime}
        thumbTintColor={"#ffffff00"}
      />
    );
  };

  return (
    <View>
      <Text>{totalTime}</Text>
      <Text>{currentTime}</Text>
      {currentTime >= totalTime ? (
        rerender()
      ) : (
        <Slider
          style={{ width: width - 20 }}
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

export default ProgressBar;
