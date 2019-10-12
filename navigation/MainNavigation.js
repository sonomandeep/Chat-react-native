/* eslint-disable react/prop-types */
import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeStack from './HomeStack';
import LoadingScreen from '../screens/LoadingScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SignupScreen from '../screens/SignupScreen';
import LoginStack from './LoginStack';

const AppTabBar = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarlabel: 'Home',
        tabBarIcon: ({ tintColor }) => <Icon name="home" size={25} color={tintColor} />,
      },
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        tabBarlabel: 'Settings',
        tabBarIcon: ({ tintColor }) => <Icon name="cog" size={25} color={tintColor} />,
      },
    },
  },
  {
    initialRouteName: 'Home',
  }
);

const AuthSwitch = createSwitchNavigator(
  {
    Login: LoginStack,
    Signup: SignupScreen,
  },
  { initialRouteName: 'Signup' }
);

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
