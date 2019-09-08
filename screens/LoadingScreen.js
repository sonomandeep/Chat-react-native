import React, { useEffect } from 'react';
import { View, ActivityIndicator, StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

function LoadingScreen({ navigation }) {
  const payload = useSelector(state => state.user);

  const bootstrap = () => {
    navigation.navigate(payload.user ? 'App' : 'Auth');
  };

  useEffect(() => {
    bootstrap();
  }, [payload]);

  return (
    <View>
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
