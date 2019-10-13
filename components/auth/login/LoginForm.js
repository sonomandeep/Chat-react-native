import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, Alert, View, TouchableOpacity, Text } from 'react-native';
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
    <View style={styles.wrapper}>
      <TextInput
        placeholderTextColor={theme.components.inputPlaceholder.color}
        style={{ ...theme.components.input, ...styles.input }}
        placeholder="Nome utente"
        value={username}
        onChangeText={setUsername}
        error={error}
      />
      <TextInput
        placeholderTextColor={theme.components.inputPlaceholder.color}
        style={{ ...theme.components.input, ...styles.input }}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        error={error}
        secure
      />

      <TouchableOpacity onPress={submit}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={[theme.colors.primary, theme.colors.primaryDark]}
          style={[theme.components.primaryButton.button, styles.button]}
        >
          <Text style={theme.components.primaryButton.text}>Accedi</Text>
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
