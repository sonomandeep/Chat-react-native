import React from 'react';
import { View, Text } from 'react-native';
import { MainStyles } from '../style/styles';

const SettingsScreen = () => {
  return (
    <View style={[MainStyles.defaultLayout, MainStyles.alignCenter]}>
      <Text>Settings Screen</Text>
    </View>
  );
};

export default SettingsScreen;
