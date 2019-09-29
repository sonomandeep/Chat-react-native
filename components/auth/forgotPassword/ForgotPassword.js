/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import InputField from '../../input/InputField';
import PrimaryButton from '../../input/Button';
import { MainStyles, Fonts, Colors } from '../../../style/styles';

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

const ForgotPassword = () => {
  const [code, setCode] = useState('');
  const { error, setError } = useState(false);

  console.log(error);

  return (
    <View style={[MainStyles.container, MainStyles.alignCenterVertically]}>
      <Text style={styles.title}>Chat</Text>
      <View>
        <Text style={styles.header}>Recupero password</Text>
        <InputField
          style={styles.marginTop}
          placeHolder="Username"
          value={code}
          onChangeHandler={setCode}
          error={error}
        />
        <PrimaryButton
          text="Conferma"
          pressHandler={() => console.log('Premuto.')}
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

export default ForgotPassword;
