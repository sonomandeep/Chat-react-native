import React from 'react';
import { View, TextInput } from 'react-native';
import PropTypes from 'prop-types';

const CustomTextInput = ({ value, onChangeText, style, placeholder }) => {
  return (
    <View>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={style}
      />
    </View>
  );
};

CustomTextInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  style: PropTypes.instanceOf(Object).isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default CustomTextInput;
