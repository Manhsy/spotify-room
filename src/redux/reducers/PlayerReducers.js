import { PAUSE, PLAY, GET_STATES } from "../actions/playerActions";

const initialState = {
  currentSong: "",
  image: "",
  isPlaying: false,
  artists: [],
};

const playerState = (state = initialState, action) => {
  switch (action.type) {
    case PAUSE:
      return { ...state, isPlaying: false };
    case PLAY:
      return { ...state, isPlaying: true };
    case GET_STATES:
      state = action.payload;
      return { ...state };
    default:
      return { ...state };
  }
};

export default playerState;
