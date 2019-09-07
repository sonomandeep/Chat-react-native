import React, { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({});

const InputField = ({ placeHolder, name, onChangeHandler }) => {
  const [value, setValue] = useState('');

  return (
    <TextInput
      value={value}
      placeholder={placeHolder}
      onChange={text => {
        setValue(text);
        onChangeHandler(name, value);
      }}
    />
  );
};

InputField.propTypes = {
  placeHolder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
};

export default InputField;
