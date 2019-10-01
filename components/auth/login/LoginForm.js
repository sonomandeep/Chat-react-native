import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, Alert } from 'react-native';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import InputField from '../../input/InputField';
import PrimaryButton from '../../input/Button';
import { loginAction } from '../../../store/actions/userActions';
import { getToken } from '../../../utils/notifications';

const styles = StyleSheet.create({
  marginTop: { marginTop: 15 },
});

const LoginForm = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const submit = () => {
    dispatch(loginAction(username, password))
      .then(() => {
        getToken();
        navigation.navigate('Home');
      })
      .catch(err => {
        setError(true);
        Alert.alert(err.title, err.message);
      });
  };

  return (
    <>
      <InputField
        style={styles.marginTop}
        placeHolder="Username"
        value={username}
        onChangeHandler={setUsername}
        error={error}
      />
      <InputField
        style={styles.marginTop}
        placeHolder="Password"
        value={password}
        onChangeHandler={setPassword}
        secureTextEntry
        error={error}
      />
      <PrimaryButton style={styles.marginTop} text="Accedi" pressHandler={submit} />
    </>
  );
};

LoginForm.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default withNavigation(LoginForm);
