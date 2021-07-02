import React from 'react'
import { ImageBackground } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import DefaultScr from './src/screens/DefaultScr';
import CreateRoomScr from './src/screens/CreateRoomScr';
import JoinARoomScr from './src/screens/JoinARoomScr';

const navigator = createSwitchNavigator(
  {
    Home: DefaultScr,
    Create: CreateRoomScr,
    Join: JoinARoomScr
  },
  {
    initialRouteName: "Home",
  }
);
const App = createAppContainer(navigator);

const app = () => {
  return (
    <ImageBackground
      style={{ width: '100%', height: '100%' }}
      source={require('./src/backgroundImage/CRkXWm.jpeg')}>
      <App />
    </ImageBackground>
  )
}
export default app;

