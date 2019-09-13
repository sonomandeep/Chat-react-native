import React, { useEffect } from 'react';
import { View, ActivityIndicator, StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { MainStyles } from '../style/styles';

function LoadingScreen({ navigation }) {
  const payload = useSelector(state => state.user);

  const bootstrap = () => {
    navigation.navigate(payload.user ? 'App' : 'Auth');
  };

  useEffect(() => {
    bootstrap();
  }, [payload]);

  // useEffect(() => {
  //   setSocket();
  // }, []);

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

// export default connect(
//   null,
//   { setSocket: setSocketAction }
// )(LoadingScreen);

export default LoadingScreen;
