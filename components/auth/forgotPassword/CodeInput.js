import React from 'react';
import { View, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Colors, Fonts } from '../../../style/styles';

const CodeInput = () => {
  return (
    <View>
      <TextInput placeholder="Es. 012345" />
    </View>
  );
};

export default CodeInput;
