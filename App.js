import React from "react";
import { ImageBackground } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import DefaultScr from "./src/screens/DefaultScr";
import CreateRoomScr from "./src/screens/CreateRoomScr";
import JoinARoomScr from "./src/screens/JoinARoomScr";
import PlayList from "./src/screens/PlayListScr";
import ListSong from "./src/screens/ListSong";

const navigator = createSwitchNavigator(
  {
    Home: DefaultScr,
    SignUp: createSwitchNavigator({
      Create: CreateRoomScr,
      Join: JoinARoomScr,
    }),

    AuthenticatedFlow: createStackNavigator({
      PlayList: PlayList,
      ListSong: ListSong,
    }),
  },
  {
    initialRouteName: "Home",
    headerMode: "none",
  }
);
const App = createAppContainer(navigator);

const app = () => {
  return (
    <ImageBackground
      style={{ width: "100%", height: "100%" }}
      source={require("./src/backgroundImage/CRkXWm.jpeg")}
    >
      <App />
    </ImageBackground>
  );
};
export default app;
