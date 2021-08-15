import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import TT from "./TextTicker";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SwipeablePanel } from "rn-swipeable-panel";
import ProgressBar from "./ProgressBar";
import PannelProgressBar from "./PannelProgressBar";
import { connect } from "react-redux";
import * as actions from "../redux/actions/playerActions";

const { height, width } = Dimensions.get("window");

const BottomTab = (props, { navigation }) => {
  //player states
  const { artists, currentSong, image, isPlaying } = props.playerState;

  //panel
  const [isPanelActive, setIsPanelActive] = useState(false);
  const [panelProps, setPanelProps] = useState({
    fullWidth: true,
    openLarge: true,
    style: {
      backgroundColor: "#121212",
      paddingBottom: 0,
      flex: 1,
    },
    closeOnTouchOutside: true,
    onClose: () => closePanel(),
    onPressCloseButton: () => closePanel(),
  });
  const openPanel = () => {
    setIsPanelActive(true);
  };

  const closePanel = () => {
    setIsPanelActive(false);
  };

  useEffect(() => {
    props.getCurrentState();
  }, []);

  return (
    <View style={{ alignItems: "center" }}>
      <View
        style={{ width: width - 10, borderRadius: 2, alignItems: "center" }}
      >
        <ProgressBar h={7} w={7} barWidth={width - 20} />
      </View>

      <TouchableOpacity style={styles.tab} onPress={() => openPanel()}>
        <Image style={styles.image} source={{ uri: image }} />
        <View style={styles.textContainer}>
          <Text style={styles.song}>{currentSong}</Text>
          <TT
            text={artists.map((artist, index) => {
              if (index + 1 == artists.length) {
                return artist;
              } else {
                return artist + ", ";
              }
            })}
            style={styles.artist}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            if (isPlaying) {
              props.pause();
            } else {
              props.play();
            }
          }}
        >
          {isPlaying ? (
            <Icon name="pause" size={35} color={"white"} />
          ) : (
            <Icon name="play-arrow" size={35} color={"white"} />
          )}
        </TouchableOpacity>
      </TouchableOpacity>
      <SwipeablePanel {...panelProps} isActive={isPanelActive}>
        <View style={styles.panelContainer}>
          <Image style={styles.largeImage} source={{ uri: image }} />
          <View
            style={{
              marginTop: 40,
              alignItems: "center",
              width: width - 100,
            }}
          >
            <TT text={currentSong} styles={styles.pannelSong} />

            <View
              style={{
                width: width - 80,
                alignItems: "center",
              }}
            >
              <Text numberOfLines={1} style={styles.pannelArtist}>
                {artists.map((index, artist) => {
                  if (index + 1 == artists.length) {
                    return artist;
                  } else {
                    return artist + ", ";
                  }
                })}
              </Text>
            </View>
          </View>
          <View
            style={{
              alignItems: "center",
            }}
          >
            <PannelProgressBar
              h={10}
              w={10}
              barWidth={width - 100}
              onChange={props.getCurrentState()}
            />
          </View>
          <View style={styles.controller}>
            <TouchableOpacity onPress={() => prev()}>
              <Icon name="skip-previous" color="white" size={65} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => pause()}>
              {isPlaying ? (
                <Icon name="pause" size={35} color={"white"} />
              ) : (
                <Icon name="play-arrow" size={35} color={"white"} />
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => next()}>
              <Icon name="skip-next" color="white" size={65} />
            </TouchableOpacity>
          </View>
        </View>
      </SwipeablePanel>
    </View>
  );
};

const styles = StyleSheet.create({
  controller: {
    flexDirection: "row",
    marginTop: 45,
    justifyContent: "space-between",
    width: width - 100,
  },
  audioBar: {
    marginTop: 0,
    paddingHorizontal: 2,
  },
  pannelAudioBar: { marginTop: 30, paddingHorizontal: 10 },
  panelContainer: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 0,
    marginBottom: 0,
  },
  largeImage: {
    marginTop: 50,
    width: 400,
    height: 400,
    borderRadius: 20,
    alignSelf: "center",
  },
  pannelSong: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  pannelArtist: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    opacity: 0.7,
  },
  song: { fontSize: 16 },
  artist: {
    opacity: 0.5,
    fontSize: 16,
  },
  image: {
    width: 55,
    height: 55,
    borderRadius: 3,
  },

  textContainer: {
    margin: 7,
    width: width - 120,
  },
  tab: {
    flexDirection: "row",
    width: width - 20,
    height: height / 15,
    alignItems: "center",
    marginBottom: 30,
  },
});

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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BottomTab);
