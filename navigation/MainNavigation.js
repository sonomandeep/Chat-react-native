import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import LoadingScreen from '../screens/LoadingScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { Colors } from '../style/styles';

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: () => ({ title: 'Home' }),
    },
    Chat: {
      screen: ChatScreen,
      navigationOptions: () => ({ title: 'Home', headerTintColor: '#fff' }),
    },
  },
  {
    initialRouteName: 'Home',
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

const AppTabBar = createBottomTabNavigator({
  Home: { screen: HomeStack, navigationOptions: { tabBarLabel: 'Home' } },
  Settings: { screen: SettingsScreen },
});

const AuthSwitch = createSwitchNavigator({
  login: LoginScreen,
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
