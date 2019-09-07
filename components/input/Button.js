import React from 'react';
import { TouchableOpacity, Text, ViewPropTypes, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Colors, Fonts } from '../../style/styles';

const styles = StyleSheet.create({
  button: { borderRadius: 8, backgroundColor: Colors.primary, alignItems: 'center' },
  text: { ...Fonts.body, color: '#fff', paddingVertical: 10 },
});

const PrimaryButton = ({ text, pressHandler, style }) => {
  return (
    <TouchableOpacity onPress={pressHandler} style={{ ...styles.button, ...style }}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

PrimaryButton.propTypes = {
  text: PropTypes.string.isRequired,
  pressHandler: PropTypes.func.isRequired,
  style: ViewPropTypes.style,
};

PrimaryButton.defaultProps = { style: {} };

export default PrimaryButton;
