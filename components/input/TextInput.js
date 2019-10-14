import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../../style';

const styles = StyleSheet.create({
  wrapper: {},
  inner: {},
  textInput: {},
  toggle: {
    position: 'absolute',
    right: 0,
    bottom: 10,
  },
  error: { borderBottomColor: theme.colors.error },
  errorText: { ...theme.fonts.inputError, marginTop: 4 },
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
  const [isHidden, setHidden] = useState(secure);
  const inputStyle = [
    { ...theme.components.input },
    { ...styles.textInput },
    { ...style },
    inputError && { ...styles.error },
  ];

  useEffect(() => {
    setError(error);
  }, [error]);

  const getKeyboardType = () => {
    if (email) return 'email-address';
    if (phone) return 'phone-pad';
    if (number) return 'numeric';
    return 'default';
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.inner}>
        <TextInput
          secureTextEntry={isHidden}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeolderTextColor={placeholderColor}
          style={inputStyle}
          keyboardType={getKeyboardType()}
        />
        {secure && (
          <TouchableOpacity style={styles.toggle} onPress={() => setHidden(!isHidden)}>
            <Icon color={theme.colors.grayText} size={20} name={isHidden ? 'eye' : 'eye-slash'} />
          </TouchableOpacity>
        )}
      </View>
      {inputError ? <Text style={styles.errorText}>{error}</Text> : null}
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
