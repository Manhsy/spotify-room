import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const PAUSE = "PAUSE";
export const PLAY = "PLAY";
export const NEXT = "NEXT";
export const PREV = "PREV";
export const GET_STATES = "GET_STATES";

export const pause = () => {
  return (dispatch) => {
    AsyncStorage.getItem("SpotifyAuth")
      .then((token) => {
        axios
          .put(
            "https://api.spotify.com/v1/me/player/pause",
            {},
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          .then(dispatch(pauseState()))
          .catch((err) => {
            console.log("error pausing song");
            console.log(err);
          });
      })
      .catch((err) => {
        console.log("error with async storage/pause");
        console.log(err);
      });
  };
};
export const play = () => {
  return (dispatch) => {
    AsyncStorage.getItem("SpotifyAuth")
      .then((token) => {
        axios
          .put(
            "https://api.spotify.com/v1/me/player/play",
            {},
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          .then(dispatch(playState()))
          .catch((err) => {
            console.log("error playing song");
            console.log(err);
          });
      })
      .catch((err) => {
        console.log("error with async storage/play");
        console.log(err);
      });
  };
};
export const next = () => {
  return (dispatch) => {
    AsyncStorage.getItem("SpotifyAuth")
      .then((token) => {
        axios
          .post(
            "https://api.spotify.com/v1/me/player/play",
            {},
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          .then((token) => {
            axios
              .get("https://api.spotify.com/v1/me/player", {
                headers: { Authorization: `Bearer ${token}` },
              })
              .then((response) => {
                const data = {
                  isPlaying: response.data.is_playing,
                  currentSong: response.data.item.name,
                  artists: response.data.item.artists.map(
                    (artist) => artist.name
                  ),
                  image: response.data.item.album.images[0].url,
                };
                dispatch(currentState(data));
              })
              .catch((err) => {
                console.log("error with getting player state after NEXT");
                console.log(err);
              });
          })
          .catch((err) => {
            console.log("error with getting getting NEXT song");
            console.log(err);
          });
      })
      .catch((err) => {
        console.log("error with async storage/next");
        console.log(err);
      });
  };
};

export const prev = () => {
  return (dispatch) => {
    AsyncStorage.getItem("SpotifyAuth")
      .then((token) => {
        axios
          .post(
            "https://api.spotify.com/v1/me/player/previous",
            {},
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          .then((token) => {
            axios
              .get("https://api.spotify.com/v1/me/player", {
                headers: { Authorization: `Bearer ${token}` },
              })
              .then((response) => {
                const data = {
                  isPlaying: response.data.is_playing,
                  currentSong: response.data.item.name,
                  artists: response.data.item.artists.map(
                    (artist) => artist.name
                  ),
                  image: response.data.item.album.images[0].url,
                };
                dispatch(currentState(data));
              })
              .catch((err) => {
                console.log("error with getting player state after prev");
                console.log(err);
              });
          })
          .catch((err) => {
            console.log("error with getting getting previously song");
            console.log(err);
          });
      })
      .catch((err) => {
        console.log("error with async storage/prev");
        console.log(err);
      });
  };
};

export const getInitialStates = () => {
  return (dispatch) => {
    AsyncStorage.getItem("SpotifyAuth")
      .then((token) => {
        axios
          .get("https://api.spotify.com/v1/me/player", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            const data = {
              isPlaying: response.data.is_playing,
              currentSong: response.data.item.name,
              artists: response.data.item.artists.map((artist) => artist.name),
              image: response.data.item.album.images[0].url,
            };
            dispatch(currentState(data));
          })
          .catch((err) => {
            console.log("error with getting player state");
            console.log(err);
          });
      })
      .catch((err) => {
        console.log("error with async storage/ISS");
        console.log(err);
      });
  };
};

const currentState = (state) => ({
  type: GET_STATES,
  payload: { ...state },
});
const playState = () => ({
  type: PLAY,
});
const pauseState = () => ({
  type: PAUSE,
});
