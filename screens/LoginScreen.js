import React from 'react';
import PropTypes from 'prop-types';
import Login from '../components/auth/login/Login';

const LoginScreen = () => {
  return <Login />;
};

LoginScreen.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func.isRequired }).isRequired,
};

export default LoginScreen;
