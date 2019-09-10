import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import LoadingScreen from '../screens/LoadingScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';
import SettingsScreen from '../screens/SettingsScreen';

const AppTabBar = createBottomTabNavigator({
  Home: { screen: HomeScreen },
  Settings: { screen: SettingsScreen },
});

const AppStack = createStackNavigator({
  Home: { screen: AppTabBar, navigationOptions: () => ({ title: 'Home' }) },
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
