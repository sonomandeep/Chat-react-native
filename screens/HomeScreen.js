import React, { Component } from 'react';
import { Text, StyleSheet, View, Button } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MainStyles } from '../style/styles';
import { logoutAction } from '../store/actions/userActions';

const styles = StyleSheet.create({
  text: { color: '#333333' },
});

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home',
  };

  handleLogout = () => {
    const { logout, navigation } = this.props;
    logout();
    navigation.navigate('Auth');
  };

  render() {
    return (
      <View style={[MainStyles.defaultLayout, MainStyles.alignCenter]}>
        <Text style={styles.text}>Home screen</Text>
        <Button title="Logout" onPress={this.handleLogout} />
      </View>
    );
  }
}

HomeScreen.propTypes = {
  logout: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(
  null,
  { logout: logoutAction }
)(HomeScreen);
