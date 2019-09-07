import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({ text: { color: '#333333' } });

const HomeScreen = () => {
  return (
    <View>
      <Text style={styles.text}>Home screen</Text>
    </View>
  );
};

export default HomeScreen;
