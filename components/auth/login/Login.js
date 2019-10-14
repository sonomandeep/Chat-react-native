import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LoginForm from './LoginForm';
import theme from '../../../style';

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  header: { marginTop: 50 },
  footer: {
    marginTop: 18,
  },
  footerInner: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  link: { marginLeft: 10, textDecorationLine: 'underline' },
});

const Login = ({ navigation }) => {
  return (
    <View style={{ ...theme.utils.screen.content, ...styles.wrapper }}>
      <KeyboardAvoidingView behavior="position">
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ ...theme.components.backIcon }}
          >
            <Icon
              color={theme.colors.secondary}
              size={theme.utils.sizes.backIcon}
              name="angle-left"
            />
          </TouchableOpacity>
          <Text style={theme.fonts.title}>Accedi</Text>
          <Text style={theme.fonts.headLine}>Bentornato su Ermess!</Text>
        </View>

        <LoginForm />

        <View style={styles.footer}>
          <View style={styles.footerInner}>
            <Text style={theme.fonts.grayText}>Non possiedi un account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={{ ...theme.fonts.link, ...styles.link }}>Iscriviti!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

Login.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default withNavigation(Login);
