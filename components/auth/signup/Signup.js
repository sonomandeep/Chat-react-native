import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import { TouchableHighlight } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import { MainStyles, Fonts, Colors } from '../../../style/styles';
import SignupForm from './SignupForm';

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

const Signup = ({ navigation }) => {
  return (
    <View style={[MainStyles.container, MainStyles.alignCenterVertically]}>
      <Text style={styles.title}>Chat</Text>
      <Text style={{ ...Fonts.headerTwo }}>Iscriviti</Text>

      <SignupForm />

      <View style={MainStyles.alignCenter}>
        <View style={MainStyles.alignCenter}>
          <Text style={styles.textLowContract}>Problemi con l'iscrizione?</Text>
          <Text style={styles.text}>Richiedi assistenza.</Text>
        </View>
        <TouchableHighlight onPress={() => navigation.navigate('Login')}>
          <View style={[MainStyles.alignCenter, styles.iscrivitiView]}>
            <Text style={styles.textLowContract}>Sei già iscritto?</Text>
            <Text style={styles.text}>Accedi subito.</Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
};

Signup.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default withNavigation(Signup);
