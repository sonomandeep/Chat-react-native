import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { TextInput } from '../../input';
import { loginAction, checkUsernameAction } from '../../../store/actions/userActions';
import { getToken } from '../../../utils/notifications';
import theme from '../../../style';

const styles = StyleSheet.create({
  wrapper: { marginTop: theme.utils.margin.base * 2 },
  imageWrapper: { alignItems: 'center', marginVertical: 30 },
  image: {
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 500,
    borderColor: theme.colors.secondary,
    borderWidth: 2,
  },
  input: { marginTop: theme.utils.margin.base * 4 },
  button: { marginTop: theme.utils.margin.base * 4 },
});

const validate = username => {
  let errors = {};
  if (!username) errors = { ...errors, username: 'Devi inserire un nome utente.' };
  if (username.length < 3)
    errors = { ...errors, username: 'Il  nome utente deve contenere almeno 3 caratteri.' };
  return errors;
};

const CompleteSignupForm = ({ navigation }) => {
  // L'utente deve inserire il nome utente e se vuole può inserire una foto profilo
  // Vengono controllati eventuali errori
  // Se non ci sono errori, tutti i dati verranno iniviati al server
  // Per fare ciò devo creare un formData contenente i dati della schermata precedente
  // e i dati inseriti in questa schermata

  const [username, setUsername] = useState('');
  const [error, setError] = useState({ username: null });
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const submit = async () => {
    // if (!validate()) {
    //   setLoading(false);
    //   return;
    // }
    // dispatch(loginAction(username, password))
    //   .then(() => {
    //     setLoading(false);
    //     getToken();
    //     navigation.navigate('Home');
    //   })
    //   .catch(err => {
    //     setError({ ...err.fields });
    //     setLoading(false);
    //   });

    setLoading(true);
    let errors = validate(username);

    try {
      await dispatch(checkUsernameAction(username));
    } catch (err) {
      errors = { ...errors, username: err.response.data.error.message };
    }

    setLoading(false);

    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

    console.log('Nome disponibile.');
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.imageWrapper}>
        <View style={styles.image}>
          <Icon color={theme.colors.grayText} size={35} name="user" solid />
        </View>
      </TouchableOpacity>

      <TextInput
        placeholderTextColor={theme.components.inputPlaceholder.color}
        style={{ ...theme.components.input, ...styles.input }}
        placeholder="Nome utente"
        value={username}
        onChangeText={setUsername}
        error={error.username}
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
            <Text style={theme.components.primaryButton.text}>Iscriviti</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

CompleteSignupForm.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    state: PropTypes.shape({
      params: PropTypes.shape({
        email: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default withNavigation(CompleteSignupForm);
