import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, KeyboardAvoidingView } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TextInput } from '../input';
import { MainStyles, Colors, Fonts } from '../../style/styles';
import Button from '../input/Button';

const styles = StyleSheet.create({
  wrapper: { backgroundColor: Colors.screenBackgound, flex: 1 },
  header: {
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 50,
  },
  title: { ...Fonts.title, fontSize: 48 },
  subtitle: { ...Fonts.body },
  content: { justifyContent: 'center' },
  tabs: {
    paddingHorizontal: MainStyles.padding.mainPadding,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-around',
    marginTop: 40,
    marginBottom: 20,
  },
  tab: { flexGrow: 1, alignItems: 'center' },
  tabText: { ...Fonts.body, color: Colors.lightTextGray },
  activeTab: { borderBottomColor: Colors.primary, borderBottomWidth: 4, paddingBottom: 6 },
  activeTabText: { ...Fonts.headLine },
  inputWrapper: { paddingHorizontal: MainStyles.padding.mainPadding },
  input: { ...MainStyles.input, marginVertical: 6, padding: 0 },
  button: { marginHorizontal: MainStyles.padding.mainPadding, marginTop: 10 },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 40 },
  footerText: { ...Fonts.body, color: Colors.gray, marginRight: 8 },
  footerLink: {
    ...Fonts.body,
    color: Colors.black,
    borderBottomColor: Colors.black,
    borderBottomWidth: 1,
  },
});

export class Auth extends Component {
  constructor(props) {
    super(props);

    this.state = { email: '', password: '', passwordConfirm: '' };
  }

  render() {
    const { email, password, passwordConfirm } = this.state;

    return (
      // <TextInput value="Prova" onChangeText={() => console.log('Premuto')} placeholder="Prova" />
      <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>
        <ImageBackground style={styles.header}>
          <Text style={styles.title}>Ermess</Text>
          <Text style={styles.subtitle}>Entra subito per messaggiare con chi vuoi</Text>
        </ImageBackground>

        <View style={styles.content}>
          <View style={styles.tabs}>
            <View style={[styles.tab, styles.activeTab]}>
              <Text style={[styles.tabText, styles.activeTabText]}>Iscriviti</Text>
            </View>
            <View style={styles.tab}>
              <Text style={styles.tabText}>Accedi</Text>
            </View>
          </View>

          <View>
            <View style={styles.inputWrapper}>
              <TextInput style={styles.input} value={email} placeholder="Indirizzo e-mail" />
              <TextInput style={styles.input} value={password} placeholder="Password" />
              <TextInput
                style={styles.input}
                value={passwordConfirm}
                placeholder="Conferma password"
              />
            </View>

            {/* <TouchableOpacity style={styles.button}>
          <Text>Iscriviti</Text>
        </TouchableOpacity> */}

            <Button
              text="Iscriviti"
              pressHandler={() => console.log('premuto')}
              style={styles.button}
            />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Sei già iscritto?</Text>
            <Text style={styles.footerLink}>Accedi</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

Auth.propTypes = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
