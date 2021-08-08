import React, { useState, useCallback, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Slider from "@react-native-community/slider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const PannelProgressBar = ({ h, w, barWidth, onChange }) => {
  const [token, setToken] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  //   useFocusEffect(
  //     useCallback(() => {
  //       const getValue = async () => {
  //         try {
  //           const token = await AsyncStorage.getItem("SpotifyAuth");
  //           setToken(token);

  //           const response = await axios.get(
  //             "https://api.spotify.com/v1/me/player",
  //             {
  //               headers: { Authorization: `Bearer ${token}` },
  //             }
  //           );

  //           setIsPlaying(response.data.is_playing);
  //           setTotalTime(response.data.item.duration_ms);
  //           setCurrentTime(response.data.progress_ms);
  //         } catch (err) {
  //           console.log("error in panel progress bar");
  //           console.log(err);
  //         }
  //       };

  //       getValue();
  //       const interval = setInterval(() => {
  //         if (isPlaying) {
  //           setCurrentTime((currentTime) => currentTime + 1000);
  //         }
  //       }, 1000);
  //       return () => {
  //         setIsPlaying(false);
  //         setTotalTime(0);
  //         setCurrentTime(0);
  //         clearInterval(interval);
  //       };
  //     }, [])
  //   );

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
        console.log("error in rendering panel progress bar");
        console.log(err);
      });
    onChange();

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
            style={{ width: barWidth }}
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

export default PannelProgressBar;
