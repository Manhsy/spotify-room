import React from "react";
import { ImageBackground } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import DefaultScr from "./src/screens/DefaultScr";
import CreateRoomScr from "./src/screens/CreateRoomScr";
import JoinARoomScr from "./src/screens/JoinARoomScr";
import PlayList from "./src/screens/PlayListScr";
import ListSong from "./src/screens/ListSong";

import { Provider } from "react-redux";
import store from "./src/redux/store";

const navigator = createSwitchNavigator(
  {
    Home: DefaultScr,
    SignUp: createSwitchNavigator({
      Create: CreateRoomScr,
      Join: JoinARoomScr,
    }),

    AuthenticatedFlow: createStackNavigator(
      {
        PlayList: PlayList,
        ListSong: ListSong,
      },
      {
        headerMode: "none",
      }
    ),
  },
  {
    initialRouteName: "Home",
    headerMode: "none",
  }
);
const App = createAppContainer(navigator);

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
