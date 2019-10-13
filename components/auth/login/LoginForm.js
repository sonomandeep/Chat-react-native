import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import { TextInput } from '../../input';
import { loginAction } from '../../../store/actions/userActions';
import { getToken } from '../../../utils/notifications';
import theme from '../../../style';

const styles = StyleSheet.create({
  wrapper: { marginTop: theme.utils.margin.base * 2 },
  input: { marginTop: theme.utils.margin.base * 4 },
  button: { marginTop: theme.utils.margin.base * 4 },
});

const LoginForm = ({ navigation }) => {
  const [username, setUsername] = useState('Mandeep1');
  const [password, setPassword] = useState('Test1234');
  const [error, setError] = useState({ username: null, password: null });
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const validate = async () => {
    let noError = true;
    if (!username) {
      await setError({ ...error, username: 'Devi inserire un nome utente.' });
      noError = false;
    }
    if (!password) {
      console.log('Errore1:', error);
      await setError({ ...error, password: 'Devi inserire una password.' });
      noError = false;
    }

    if (password.length < 8) {
      console.log('Errore2:', error);
      await setError({ ...error, password: 'La password deve contenere almeno 8 caratteri.' });
      noError = false;
    }
    return noError;
  };

  const submit = async () => {
    setLoading(true);
    await setError({ username: null, password: null });

    if (!validate()) {
      setLoading(false);
      return;
    }
    dispatch(loginAction(username, password))
      .then(() => {
        setLoading(false);
        getToken();
        navigation.navigate('Home');
      })
      .catch(err => {
        setLoading(false);
        err.fields.forEach(field => setError({ ...error, ...field }));
      });
  };

  return (
    <View style={styles.wrapper}>
      <TextInput
        placeholderTextColor={theme.components.inputPlaceholder.color}
        style={{ ...theme.components.input, ...styles.input }}
        placeholder="Nome utente"
        value={username}
        onChangeText={setUsername}
        error={error.username}
      />
      <TextInput
        placeholderTextColor={theme.components.inputPlaceholder.color}
        style={{ ...theme.components.input, ...styles.input }}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        error={error.password}
        secure
      />

      <TouchableOpacity onPress={submit}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={[theme.colors.primary, theme.colors.primaryDark]}
          style={[theme.components.primaryButton.button, styles.button]}
        >
          {isLoading ? (
            <ActivityIndicator size="small" style={{ color: '#ffffff' }} />
          ) : (
            <Text style={theme.components.primaryButton.text}>Accedi</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

LoginForm.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default withNavigation(LoginForm);
