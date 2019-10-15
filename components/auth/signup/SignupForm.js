import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import emailValidator from 'email-validator';
import { signupAction, checkEmailACtion } from '../../../store/actions/userActions';
import { getToken } from '../../../utils/notifications';
import theme from '../../../style';
import { TextInput } from '../../input';

const styles = StyleSheet.create({
  wrapper: { marginTop: theme.utils.margin.base * 2 },
  input: { marginTop: theme.utils.margin.base * 4 },
  button: { marginTop: theme.utils.margin.base * 4 },
});

const validate = (email, password, confirmPassword) => {
  let errors = {};

  if (!email) errors = { ...errors, email: 'Devi inserire un indirizzo e-mail.' };
  if (!emailValidator.validate(email))
    errors = { ...errors, email: "L'indirizzo e-mail inserito non è valido." };
  if (!password) errors = { ...errors, password: 'Devi inserire una password.' };
  if (password) {
    if (password.length < 8)
      errors = { ...errors, password: 'La password deve contere almeno 8 caratteri.' };
  }
  if (!confirmPassword) errors = { ...errors, confirmPassword: 'Devi confermare la password.' };
  if (password !== confirmPassword)
    errors = { ...errors, confirmPassword: 'Le password non corrispondono.' };
  return errors;
};

const SignupForm = ({ navigation }) => {
  const [email, setEmail] = useState('m@gmail.com');
  const [password, setPassword] = useState('Test1234');
  const [confirmPassword, setConfirmPassword] = useState('Test1234');
  const [error, setError] = useState({ email: null, password: null, confirmPassword: null });
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const submit = async () => {
    setLoading(true);
    let errors = validate(email, password, confirmPassword);

    try {
      await dispatch(checkEmailACtion(email));
    } catch (err) {
      errors = { ...errors, email: err.response.data.error.message };
    }

    setLoading(false);

    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

    navigation.navigate('CompleteSignup', { email, password, confirmPassword });
  };

  return (
    <View style={styles.wrapper}>
      <TextInput
        placeholderTextColor={theme.components.inputPlaceholder.color}
        style={{ ...theme.components.input, ...styles.input }}
        placeholder="Indirizzo e-mail"
        value={email}
        onChangeText={setEmail}
        error={error.email}
        email
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
      <TextInput
        placeholderTextColor={theme.components.inputPlaceholder.color}
        style={{ ...theme.components.input, ...styles.input }}
        placeholder="Conferma password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        error={error.confirmPassword}
        secure
      />

      <TouchableOpacity onPress={() => submit()}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={[theme.colors.primary, theme.colors.primaryDark]}
          style={[theme.components.primaryButton.button, styles.button]}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text style={theme.components.primaryButton.text}>Avanti</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

SignupForm.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default withNavigation(SignupForm);
