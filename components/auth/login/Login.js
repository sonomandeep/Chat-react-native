import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import { MainStyles, Fonts, Colors } from '../../../style/styles';
import LoginForm from './LoginForm';

const styles = StyleSheet.create({
  title: {
    fontSize: Fonts.title.fontSize,
    fontWeight: Fonts.title.fontWeight,
    color: Colors.primary,
    alignSelf: 'center',
    paddingBottom: 35,
  },
  bottom: { alignItems: 'center' },
  textLowContract: { ...Fonts.lowContrast, marginTop: 10 },
  text: { ...Fonts.body },
  iscrivitiView: {
    borderTopColor: Colors.primary,
    borderTopWidth: 0.5,
    marginTop: 20,
    paddingTop: 20,
  },
});

const Login = ({ navigation }) => {
  return (
    <View style={[MainStyles.container, MainStyles.alignCenterVertically]}>
      <Text style={styles.title}>Chat</Text>
      <Text style={{ ...Fonts.headerTwo }}>Accedi</Text>

      <LoginForm />

      <View style={MainStyles.alignCenter}>
        <TouchableHighlight
          style={MainStyles.alignCenter}
          onPress={() => navigation.navigate('ForgotPassword')}
        >
          <>
            {/* <Text style={styles.textLowContract}>Hai dimenticato le credenziali?</Text>
            <Text style={styles.text}>Richiedi assistenza.</Text> */}
            <Text style={styles.text}>Hai dimenticato la password?</Text>
          </>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => navigation.navigate('Signup')}
          style={MainStyles.alignCenter}
        >
          <View style={[MainStyles.alignCenter, styles.iscrivitiView]}>
            <Text style={styles.textLowContract}>Non possiedi un account?</Text>
            <Text style={styles.text}>Creane uno.</Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
};

Login.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default withNavigation(Login);
