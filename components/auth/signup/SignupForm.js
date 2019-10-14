import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import { signupAction } from '../../../store/actions/userActions';
import { getToken } from '../../../utils/notifications';
import { showAlert } from '../../../utils/errors';
import theme from '../../../style';
import { TextInput } from '../../input';

const styles = StyleSheet.create({
  wrapper: { marginTop: theme.utils.margin.base * 2 },
  input: { marginTop: theme.utils.margin.base * 4 },
  button: { marginTop: theme.utils.margin.base * 4 },
});

const SignupForm = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const submit = () => {
    // L'utente inserisce i dati
    // Quando preme avanti i dati vengono validati:
    //  1. Indirizzo e-mail valido
    //  2. Password valida
    //  3. Conferm password coincide con la password
    // Se è tutto giusto si passa alla prossima schermata
    // Altrimenti vengono visualizzati gli errori

    // dispatch(signupAction(name, email, username, password))
    //   .then(() => {
    //     getToken();
    //     navigation.navigate('Home');
    //   })
    //   .catch(err => {
    //     showAlert(err.title, err.message);
    //     setError(true);
    //   });
    navigation.navigate('CompleteSignup', { email, password });
  };

  return (
    <View style={styles.wrapper}>
      <TextInput
        placeholderTextColor={theme.components.inputPlaceholder.color}
        style={{ ...theme.components.input, ...styles.input }}
        placeholder="Indirizzo e-mail"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholderTextColor={theme.components.inputPlaceholder.color}
        style={{ ...theme.components.input, ...styles.input }}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        placeholderTextColor={theme.components.inputPlaceholder.color}
        style={{ ...theme.components.input, ...styles.input }}
        placeholder="Conferma password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity onPress={() => submit()}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={[theme.colors.primary, theme.colors.primaryDark]}
          style={[theme.components.primaryButton.button, styles.button]}
        >
          <Text style={theme.components.primaryButton.text}>Avanti</Text>
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
