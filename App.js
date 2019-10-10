import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import firebase from 'react-native-firebase';
import { store, persistor } from './store/store';
import MainNavigation from './navigation/MainNavigation';
import SocketContextProvider from './context/SocketContext';
import { createChannel, checkPermission } from './utils/notifications';
import Middleware from './components/common/Middleware';

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  async componentDidMount() {
    createChannel();
    checkPermission();
    this.createNotificationListeners();
  }

  componentWillUnmount() {
    this.removeNotificationDisplayedListener();
    this.removeNotificationListener();
    this.removeNotificationOpenedListener();
  }

  createNotificationListeners = async () => {
    this.removeNotificationListener = firebase
      .notifications()
      .onNotification(receivedNotification => {
        const { title, body, notificationId, data } = receivedNotification;

        const notification = new firebase.notifications.Notification()
          .setNotificationId(notificationId)
          .setTitle(title)
          .setBody(body)
          .setData(data);

        const date = new Date();
        date.setMinutes(date.getMinutes() + 1);

        firebase.notifications().scheduleNotification(notification, {
          fireDate: date.getTime(),
        });
        notification.android.setChannelId('message-channel').android.setSmallIcon('ic_launcher');
        notification.android.setGroup('message-group');

        firebase.notifications().displayNotification(notification);
      });

    this.removeNotificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        console.log('notificationOpen', notificationOpen);
        const { title, body } = notificationOpen;
        console.log('onNotificationOpened:', title, body);
      });

    this.removeNotificationDisplayedListener = firebase
      .notifications()
      .onNotificationDisplayed(notification => {
        notification.android.setChannelId('message-channel');
        console.log('OnNotificationDisplayed:', notification);
        // Process your notification as required
        // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
      });

    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen;
      console.log('getInitialNotification:', notificationOpen);
    }

    this.messageListener = firebase.messaging().onMessage(message => {
      console.log('Entrato.');
      console.log(JSON.stringify(message));
    });
  };

  handleAppStateChange = nextAppState => {
    console.log('NextAppState:', nextAppState);
  };

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <SocketContextProvider>
            <Middleware>
              <MainNavigation />
            </Middleware>
          </SocketContextProvider>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
