import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoadingScreen from '../screens/LoadingScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';

const AppStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Chat: { screen: ChatScreen },
});

const AuthSwitch = createSwitchNavigator({
  login: LoginScreen,
});

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppStack,
      Auth: AuthSwitch,
    },
    { initialRouteName: 'Loading' }
  )
);
