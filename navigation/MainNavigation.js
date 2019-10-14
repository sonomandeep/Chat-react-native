/* eslint-disable react/prop-types */
import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createStackNavigator } from 'react-navigation-stack';
import HomeStack from './HomeStack';
import LoadingScreen from '../screens/LoadingScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SignupScreen from '../screens/SignupScreen';
import SignupSecondScreen from '../screens/SignupSecondScreen';
import LoginScreen from '../screens/LoginScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import InsertCodeScreen from '../screens/InsertCodeScreen';

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

const AuthSwitch = createStackNavigator(
  {
    Login: { screen: LoginScreen },
    ForgotPassword: { screen: ForgotPasswordScreen },
    ForgotPasswordCode: { screen: InsertCodeScreen },
    Signup: { screen: SignupScreen },
    CompleteSignup: { screen: SignupSecondScreen },
  },
  {
    initialRouteName: 'Signup',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
    transitionConfig: () => ({
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;

        const translateX = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [layout.initWidth, 0, 0],
        });

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index, index + 0.99, index + 1],
          outputRange: [0, 1, 1, 0.3, 0],
        });

        return { opacity, transform: [{ translateX }] };
      },
    }),
  }
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
