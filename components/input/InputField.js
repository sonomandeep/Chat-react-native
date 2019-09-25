import React from 'react';
import { StyleSheet, TextInput, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { Colors } from '../../style/styles';

const styles = StyleSheet.create({
  textInput: {
    borderColor: Colors.lightGray,
    borderWidth: 0.5,
    backgroundColor: Colors.lowConstrastGray,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 17,
  },
  textInputError: {
    borderColor: Colors.error,
    borderWidth: 0.5,
    backgroundColor: Colors.errorBackground,
    color: Colors.error,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 17,
  },
});

const InputField = ({ placeHolder, onChangeHandler, style, secureTextEntry, error, value }) => {
  return (
    <TextInput
      style={error ? { ...styles.textInputError, ...style } : { ...styles.textInput, ...style }}
      placeholder={placeHolder}
      value={value}
      placeholderTextColor={error ? Colors.error : '#C7C7CD'}
      onChangeText={text => onChangeHandler(text)}
      secureTextEntry={secureTextEntry}
    />
  );
};

InputField.propTypes = {
  placeHolder: PropTypes.string.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
  style: ViewPropTypes.style,
  secureTextEntry: PropTypes.bool,
  error: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};

InputField.defaultProps = {
  style: {},
  secureTextEntry: false,
};

export default InputField;
