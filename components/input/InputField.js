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
    // shadowColor: '#707070',
    // shadowOffset: { width: 2, height: 4 },
    // shadowOpacity: 100,
    // shadowRadius: 10,
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
    // shadowColor: '#707070',
    // shadowOffset: { width: 2, height: 4 },
    // shadowOpacity: 100,
    // shadowRadius: 10,
  },
});

const InputField = ({
  placeHolder,
  name,
  onChangeHandler,
  style,
  secureTextEntry,
  error,
  value,
}) => {
  return (
    <TextInput
      style={error ? { ...styles.textInputError, ...style } : { ...styles.textInput, ...style }}
      placeholder={placeHolder}
      value={value}
      placeholderTextColor={error ? Colors.error : '#C7C7CD'}
      onChangeText={text => onChangeHandler(name, text)}
      secureTextEntry={secureTextEntry}
    />
  );
};

InputField.propTypes = {
  placeHolder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
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
