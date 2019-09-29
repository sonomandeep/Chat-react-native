import firebase from 'react-native-firebase';
import { setFcmTokenAction } from '../store/actions/userActions';
import { store } from '../store/store';

export const createChannel = async () => {
  // Build a channel
  const channel = new firebase.notifications.Android.Channel(
    'message-channel',
    'Messages',
    firebase.notifications.Android.Importance.Max
  ).setDescription('Messages channel');

  // Create the channel
  await firebase.notifications().android.createChannel(channel);

  // Build a channel group
  // const channelGroup = new firebase.notifications.Android.ChannelGroup(
  //   'message-group',
  //   'Messages group'
  // );

  // Create the channel group
  // firebase.notifications().android.createChannelGroup(channelGroup);
};

export const getToken = () => {
  firebase
    .messaging()
    .getToken()
    .then(data => store.dispatch(setFcmTokenAction(store.getState().user.user._id, data)))
    .catch(error => console.log('Errore durante il getToken:', error));
};

export const requestPermission = async () => {
  try {
    await firebase.messaging().requestPermission();
    // User has authorised
    // getToken();
  } catch (error) {
    // User has rejected permissions
    console.log('permission rejected');
  }
};

export const checkPermission = async () => {
  const enabled = await firebase.messaging().hasPermission();
  if (enabled) {
    // getToken();
  } else {
    requestPermission();
  }
};
