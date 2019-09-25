import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import InputField from '../../input/InputField';
import PrimaryButton from '../../input/Button';
import { loginAction } from '../../../store/actions/userActions';

const styles = StyleSheet.create({
  marginTop: { marginTop: 15 },
});

const LoginForm = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const submit = async () => {
    let data;
    try {
      data = await dispatch(loginAction(username, password));

      if (data.error) {
        setError(true);
      } else {
        navigation.navigate('Home');
      }
    } catch (ex) {
      console.log('Errore:', ex);
    }
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
