import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import { MainStyles, Fonts, Colors } from '../../../style/styles';
import LoginForm from './LoginForm';
import theme from '../../../style';
import { TextInput } from '../../input';

// const styles = StyleSheet.create({
//   title: {
//     fontSize: Fonts.title.fontSize,
//     fontWeight: Fonts.title.fontWeight,
//     color: Colors.primary,
//     alignSelf: 'center',
//     paddingBottom: 35,
//   },
//   bottom: { alignItems: 'center' },
//   textLowContract: { ...Fonts.lowContrast, marginTop: 10 },
//   text: { ...Fonts.body },
//   iscrivitiView: {
//     borderTopColor: Colors.primary,
//     borderTopWidth: 0.5,
//     marginTop: 20,
//     paddingTop: 20,
//   },
// });
const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  header: { marginTop: 50 },
  inputWrapper: { marginTop: theme.utils.margin.base * 2 },
  input: { marginTop: theme.utils.margin.base * 4 },
  button: { marginTop: theme.utils.margin.base * 4 },
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
    // <View style={[MainStyles.container, MainStyles.alignCenterVertically]}>
    //   <Text style={styles.title}>Chat</Text>
    //   <Text style={{ ...Fonts.headerTwo }}>Accedi</Text>

    //   <LoginForm />

    //   <View style={MainStyles.alignCenter}>
    //     <TouchableOpacity
    //       style={MainStyles.alignCenter}
    //       onPress={() => navigation.navigate('ForgotPassword')}
    //     >
    //       <>
    //         <Text style={styles.textLowContract}>Hai dimenticato la password?</Text>
    //         <Text style={styles.text}>Recuperala subito.</Text>
    //       </>
    //     </TouchableOpacity>
    //     <TouchableOpacity
    //       onPress={() => navigation.navigate('Signup')}
    //       style={MainStyles.alignCenter}
    //     >
    //       <View style={[MainStyles.alignCenter, styles.iscrivitiView]}>
    //         <Text style={styles.textLowContract}>Non possiedi un account?</Text>
    //         <Text style={styles.text}>Creane uno.</Text>
    //       </View>
    //     </TouchableOpacity>
    //   </View>
    // </View>
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
