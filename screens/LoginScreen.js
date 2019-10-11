import React from 'react';
import PropTypes from 'prop-types';
import Login from '../components/auth/login/Login';
import { Auth } from '../components/auth';

const LoginScreen = () => {
  // return <Login />;
  return <Auth />;
};

LoginScreen.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func.isRequired }).isRequired,
};

export default LoginScreen;
