import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store';
import MainNavigation from './navigation/MainNavigation';
import SocketContextProvider from './context/SocketContext';

// eslint-disable-next-line react/prefer-stateless-function
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <SocketContextProvider>
            <MainNavigation />
          </SocketContextProvider>
        </PersistGate>
      </Provider>
    );
  }
}
