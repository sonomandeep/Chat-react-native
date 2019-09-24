import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeStack from './HomeStack';
import LoadingScreen from '../screens/LoadingScreen';
import LoginScreen from '../screens/LoginScreen';
import SettingsScreen from '../screens/SettingsScreen';

const AppTabBar = createBottomTabNavigator({
  Home: { screen: HomeStack, navigationOptions: { tabBarLabel: 'Home' } },
  Settings: { screen: SettingsScreen },
});

const AuthSwitch = createSwitchNavigator({
  Login: LoginScreen,
});

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppTabBar,
      Auth: AuthSwitch,
    },
    { initialRouteName: 'Loading' }
  )
);
