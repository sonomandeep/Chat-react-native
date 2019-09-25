import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { withNavigation } from 'react-natigation';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
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
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('Signup')}
          style={MainStyles.alignCenter}
        >
          <Text style={styles.textLowContract}>Hai dimenticato le credenziali?</Text>
          <Text style={styles.text}>Richiedi assistenza.</Text>
        </TouchableWithoutFeedback>
        <View style={[MainStyles.alignCenter, styles.iscrivitiView]}>
          <Text style={styles.textLowContract}>Non possiedi un account?</Text>
          <Text style={styles.text}>Creane uno.</Text>
        </View>
      </View>
    </View>
  );
};

export default withNavigation(Login);
