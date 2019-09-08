import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  text: { color: '#333333' },
  container: { flex: 1 },
});

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home screen</Text>
    </View>
  );
};

export default HomeScreen;
