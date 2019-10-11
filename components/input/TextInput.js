import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  wrapper: {},
  inner: {},
  textInput: {},
  toggle: {
    position: 'absolute',
    alignItems: 'flex-end',
  },
  errors: {},
});

const CustomTextInput = ({
  secure,
  error,
  value,
  onChangeText,
  style,
  placeholder,
  placeholderColor,
  email,
  phone,
  number,
}) => {
  const [inputError, setError] = useState(error);
  // const [toggleSecure, setSecure] = useState(false);
  const inputStyle = [{ ...styles.textInput }, { ...style }, inputError && { ...styles.errors }];

  useEffect(() => {
    setError(error);
  }, [error]);

  const getKeyboardType = () => {
    if (email) return 'email-adress';
    if (phone) return 'phone-pad';
    if (number) return 'numeric';
    return 'default';
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.inner}>
        <TextInput
          secureTextEntry={secure}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeolderTextColor={placeholderColor}
          style={inputStyle}
          keyboardType={getKeyboardType()}
        />
        {/* <TouchableOpacity style={styles.toggle}>
          <Icon color="gray" size={16} name="eye" />
        </TouchableOpacity> */}
      </View>
      {inputError ? <Text>Errore</Text> : null}
    </View>
  );
};

CustomTextInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  style: PropTypes.instanceOf(Object).isRequired,
  placeholder: PropTypes.string.isRequired,
  placeholderColor: PropTypes.string,
  email: PropTypes.bool,
  phone: PropTypes.bool,
  number: PropTypes.bool,
  secure: PropTypes.bool,
  error: PropTypes.string,
};

CustomTextInput.defaultProps = {
  placeholderColor: null,
  email: false,
  phone: false,
  number: false,
  secure: false,
  error: '',
};

export default CustomTextInput;
