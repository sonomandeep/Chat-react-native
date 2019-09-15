import React, { useEffect, useContext } from 'react';
import { View, ActivityIndicator, StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { MainStyles } from '../style/styles';
import { SocketContext } from '../context/SocketContext';

function LoadingScreen({ navigation }) {
  const payload = useSelector(state => state.user);
  const { socket } = useContext(SocketContext);

  const bootstrap = () => {
    navigation.navigate(payload.user ? 'App' : 'Auth');
  };

  useEffect(() => {
    bootstrap();
  }, [payload]);

  useEffect(() => {
    if (payload.user) {
      socket.emit('new_user', {
        username: payload.user.username,
        _id: payload.user._id,
      });
    }
  }, [payload.user]);

  return (
    <View style={[MainStyles.container, MainStyles.alignCenter, MainStyles.alignCenterVertically]}>
      <ActivityIndicator size="large" />
      <StatusBar barStyle="default" />
    </View>
  );
}

LoadingScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default LoadingScreen;
