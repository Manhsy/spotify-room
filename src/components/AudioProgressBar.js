import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Slider from "@react-native-community/slider";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProgressBar = () => {
  const [isPlaying, setIsPlaying] = useState();
  const [sliderValue, setSliderValue] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [duration, setDuration] = useState();
  const [currentProgress, setCurrentProgress] = useState();
  const [token, setToken] = useState();

  const curSong = useState();

  useEffect(() => {
    const getInfo = async () => {
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
        setDuration(response.data.item.duration_ms);
        setCurrentProgress(response.data.progress_ms);
        setSliderValue(currentProgress / duration);

        slidingComplete();
      } catch (err) {
        console.log(err);
      }
    };
    getInfo();
  }, []);

  const slidingBar = () => {
    setIsSeeking(true);
  };
  const slidingComplete = async () => {
    try {
      const response = await axios.put(
        `https://api.spotify.com/v1/me/player/seek?position_ms=${88658}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsSeeking(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View>
      <Text>hi</Text>
    </View>
  );
};

export default ProgressBar;
