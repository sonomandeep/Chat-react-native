import React, { Component } from 'react';
import { Text, StyleSheet, View, Button } from 'react-native';
import PropTypes from 'prop-types';
import InputField from '../components/InputField';

const styles = StyleSheet.create({ title: { fontSize: 34 } });

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  onChangeHandler = (field, value) => {
    this.setState({ [field]: value });
  };

  render() {
    const { navigation } = this.props;

    return (
      <View>
        <Text style={styles.title}>Chat</Text>
        <Text>Accedi</Text>
        <InputField placeHolder="Username" name="username" onChangeHandler={this.onChangeHandler} />
        <Button
          title="Accedi"
          onPress={() => {
            navigation.navigate('HomeScreen');
            console.log(this.state);
          }}
        />
      </View>
    );
  }
}

LoginScreen.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func.isRequired }).isRequired,
};
