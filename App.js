import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store';
import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';

const AppSwitch = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Chat: { screen: ChatScreen },
});

const AuthSwitch = createSwitchNavigator({
  login: LoginScreen,
});

const AppNavigator = createAppContainer(
  createSwitchNavigator(
    {
      LoadingScreen,
      App: AppSwitch,
      Auth: AuthSwitch,
    },
    { initialRouteName: 'LoadingScreen' }
  )
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <View style={styles.container}>
          <AppNavigator />
        </View>
      </PersistGate>
    </Provider>
  );
}
