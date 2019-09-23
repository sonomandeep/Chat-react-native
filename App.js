import React, { Component } from 'react';
import { Provider, AsyncStorage } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import firebase from 'react-native-firebase';
import { store, persistor } from './store/store';
import MainNavigation from './navigation/MainNavigation';
import SocketContextProvider from './context/SocketContext';

export default class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  async componentDidMount() {
    this.createChannel();
    this.checkPermission();
    this.createNotificationListeners();
  }

  componentWillUnmount() {
    this.removeNotificationDisplayedListener();
    this.removeNotificationListener();
    this.removeNotificationOpenedListener();
  }

  createChannel = () => {
    // Build a channel
    const channel = new firebase.notifications.Android.Channel(
      'message-channel',
      'Messages',
      firebase.notifications.Android.Importance.Max
    ).setDescription('Messages channel');

    // Create the channel
    firebase.notifications().android.createChannel(channel);
  };

  getToken = async () => {
    try {
      this.fcmToken = await AsyncStorage.getItem('fcmToken');
    } catch (error) {
      console.log('Error:', error);
    }

    if (!this.fcmToken) {
      this.fcmToken = await firebase.messaging().getToken();
      if (this.fcmToken) {
        // user has a device token
        console.log('fcmToken:', this.fcmToken);
        await AsyncStorage.setItem('fcmToken', this.fcmToken);
      }
    }
    console.log('fcmToken:', this.fcmToken);
  };

  requestPermission = async () => {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  };

  checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  };

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

        console.log(notification);

        const date = new Date();
        date.setMinutes(date.getMinutes() + 1);

        firebase.notifications().scheduleNotification(notification, {
          fireDate: date.getTime(),
        });
        notification.android.setChannelId('message-channel').android.setSmallIcon('ic_launcher');

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
