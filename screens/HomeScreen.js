import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { MainStyles } from '../style/styles';

const styles = StyleSheet.create({
  text: { color: '#333333' },
});

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home',
  };

  render() {
    return (
      <View style={[MainStyles.defaultLayout, MainStyles.alignCenter]}>
        <Text style={styles.text}>Home screen</Text>
      </View>
    );
  }
}

export default HomeScreen;
