/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import InputField from '../../input/InputField';
import PrimaryButton from '../../input/Button';
import { MainStyles, Fonts, Colors } from '../../../style/styles';
import { resetPasswordAction } from '../../../store/actions/userActions';

const styles = StyleSheet.create({
  wrapper: { width: '100%' },
  title: {
    fontSize: Fonts.title.fontSize,
    fontWeight: Fonts.title.fontWeight,
    color: Colors.primary,
    alignSelf: 'center',
    marginBottom: 35,
  },
  header: { ...Fonts.headerTwo },
  marginTop: { marginTop: 15 },
  textLowContract: { ...Fonts.lowContrast, marginTop: 10 },
  text: { ...Fonts.body },
});

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const handleSendButton = async () => {
    try {
      const res = await dispatch(resetPasswordAction(email.trim().toLowerCase()));
      Alert.alert(
        'Email inviata',
        "E' stata inviata un email all'indizzo col quale ti sei iscritto, segui le istruzioni per recuperare la password."
      );
      navigation.navigate('ForgotPasswordCode');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={[MainStyles.container, MainStyles.alignCenterVertically]}>
      <Text style={styles.title}>Recupero password</Text>
      <View>
        <Text style={styles.header}>Indirizzo email</Text>
        <InputField
          style={styles.marginTop}
          placeHolder="Es. example@example.com"
          value={email}
          onChangeHandler={setEmail}
          error={error}
        />
        <PrimaryButton
          text="Invia email"
          pressHandler={handleSendButton}
          style={styles.marginTop}
        />
      </View>
      <View style={MainStyles.alignCenter}>
        <Text style={styles.textLowContract}>Non hai ricevuto l'email?</Text>
        <Text style={styles.text}>Richiedi assistenza.</Text>
      </View>
    </View>
  );
};

ForgotPassword.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default withNavigation(ForgotPassword);
