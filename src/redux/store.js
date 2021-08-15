import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleWare from "redux-thunk";
import playerState from "./reducers/PlayerReducers";

const reducers = combineReducers({
  playerState: playerState,
});

const store = createStore(reducers, applyMiddleware(thunkMiddleWare));

export default store;
