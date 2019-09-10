import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginAction } from '../store/actions/userActions';
import InputField from '../components/input/InputField';
import { MainStyles, Fonts, Colors } from '../style/styles';
import PrimaryButton from '../components/input/Button';

const styles = StyleSheet.create({
  title: {
    fontSize: Fonts.title.fontSize,
    fontWeight: Fonts.title.fontWeight,
    color: Colors.primary,
    alignSelf: 'center',
    paddingBottom: 35,
  },
  marginTop: { marginTop: 15 },
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

class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      error: false,
    };
  }

  onChangeHandler = (field, value) => {
    this.setState({ [field]: value });
  };

  submit = async () => {
    const { navigation, login } = this.props;
    const { username, password } = this.state;
    if (!(username.trim() && password.trim())) return;

    let data;
    try {
      data = await login(username, password);
      if (data.error) {
        this.setState({ error: true });
      } else {
        navigation.navigate('Home');
      }
    } catch (error) {
      console.log('Errore:', error);
    }
  };

  render() {
    const { username, password, error } = this.state;

    return (
      <View style={MainStyles.defaultLayout}>
        <Text style={styles.title}>Chat</Text>
        <Text style={{ ...Fonts.headerTwo }}>Accedi</Text>
        <View>
          <InputField
            style={styles.marginTop}
            placeHolder="Username"
            name="username"
            value={username}
            onChangeHandler={this.onChangeHandler}
            error={error}
          />
          <InputField
            style={styles.marginTop}
            placeHolder="Password"
            name="password"
            value={password}
            onChangeHandler={this.onChangeHandler}
            secureTextEntry
            error={error}
          />
          <PrimaryButton style={styles.marginTop} text="Accedi" pressHandler={this.submit} />
        </View>
        <View style={MainStyles.alignCenter}>
          <View style={MainStyles.alignCenter}>
            <Text style={styles.textLowContract}>Hai dimenticato le credenziali?</Text>
            <Text style={styles.text}>Richiedi assistenza.</Text>
          </View>
          <View style={[MainStyles.alignCenter, styles.iscrivitiView]}>
            <Text style={styles.textLowContract}>Non possiedi un account?</Text>
            <Text style={styles.text}>Creane uno.</Text>
          </View>
        </View>
      </View>
    );
  }
}

LoginScreen.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func.isRequired }).isRequired,
  login: PropTypes.func.isRequired,
};

export default connect(
  null,
  { login: loginAction }
)(LoginScreen);
