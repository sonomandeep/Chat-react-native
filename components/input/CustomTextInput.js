import React from 'react';
import { View, TextInput } from 'react-native';
import PropTypes from 'prop-types';

const CustomTextInput = ({ value, onChangeText, style, placeholder, placeholderColor }) => {
  return (
    <View>
      <TextInput
        placeholderTextColor={placeholderColor}
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
  placeholderColor: PropTypes.string,
};

CustomTextInput.defaultProps = {
  placeholderColor: null,
};

export default CustomTextInput;
