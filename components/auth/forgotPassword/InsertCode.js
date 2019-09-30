/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import { MainStyles, Fonts, Colors } from '../../../style/styles';
import InputField from '../../input/InputField';
import PrimaryButton from '../../input/Button';
import { verifyResetPasswordAction } from '../../../store/actions/userActions';

const styles = StyleSheet.create({
  wrapper: { width: '100%' },
  title: {
    fontSize: Fonts.title.fontSize,
    fontWeight: Fonts.title.fontWeight,
    color: Colors.primary,
    alignSelf: 'center',
    marginBottom: 35,
  },
  header: { ...Fonts.body },
  marginTop: { marginTop: 15 },
  textLowContract: { ...Fonts.lowContrast, marginTop: 10 },
  text: { ...Fonts.body },
});

const InsertCode = ({ navigation }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const user = { ...navigation.state.params };

  const handleSubmit = async () => {
    if (new Date(user.resetPasswordExpires).getTime() < Date.now()) {
      if (user.resetPasswordToken === code) {
        const res = await dispatch(
          verifyResetPasswordAction({ email: user.email, token: user.resetPasswordToken })
        );
        if (res) {
          navigation.navigate('Home');
          return;
        }
      }
    }
    setError(true);
  };

  return (
    <View style={[MainStyles.container, MainStyles.alignCenterVertically]}>
      <Text style={styles.title}>Recupero password</Text>
      <View>
        <Text style={styles.header}>
          Inserisci il codice contenuto nell'email inviata a {user.email}
        </Text>
        <InputField
          style={styles.marginTop}
          placeHolder="Es. 123456"
          value={code}
          onChangeHandler={setCode}
          error={error}
        />
        <PrimaryButton text="Invia email" pressHandler={handleSubmit} style={styles.marginTop} />
      </View>
      <View style={MainStyles.alignCenter}>
        <Text style={styles.textLowContract}>Non hai ricevuto l'email?</Text>
        <Text style={styles.text}>Richiedi assistenza.</Text>
      </View>
    </View>
  );
};

InsertCode.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    state: PropTypes.shape({
      params: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        resetPasswordToken: PropTypes.string.isRequired,
        resetPasswordExpires: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default withNavigation(InsertCode);
