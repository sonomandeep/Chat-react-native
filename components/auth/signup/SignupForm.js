import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import InputField from '../../input/InputField';
import PrimaryButton from '../../input/Button';
import { signupAction } from '../../../store/actions/userActions';
import { getToken } from '../../../utils/notifications';
import { showAlert } from '../../../utils/errors';

const styles = StyleSheet.create({
  marginTop: { marginTop: 15 },
});

const SignupForm = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const submit = async () => {
    // let data;
    // try {
    //   data = await dispatch(signupAction(name, email, username, password));
    //   if (data.error) {
    //     setError(true);
    //   } else {
    //     getToken();
    //     navigation.navigate('Home');
    //   }
    // } catch (ex) {
    //   console.log('Errore:', ex);
    // }
    dispatch(signupAction(name, email, username, password))
      .then(() => {
        getToken();
        navigation.navigate('Home');
      })
      .catch(err => {
        showAlert(err.title, err.message);
        setError(true);
      });
  };

  return (
    <>
      <InputField
        style={styles.marginTop}
        placeHolder="Name"
        value={name}
        onChangeHandler={setName}
        error={error}
      />
      <InputField
        style={styles.marginTop}
        placeHolder="E-mail"
        value={email}
        onChangeHandler={setEmail}
        error={error}
      />
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
      <PrimaryButton style={styles.marginTop} text="Iscriviti" pressHandler={submit} />
    </>
  );
};

SignupForm.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default withNavigation(SignupForm);
