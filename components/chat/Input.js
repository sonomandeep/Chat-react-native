import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { Colors, Fonts } from '../../style/styles';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  input: {
    ...Fonts.body,
    flex: 1,
    marginRight: 20,
    paddingLeft: 16,
    paddingVertical: 10,
    backgroundColor: Colors.lowConstrastGray,
    borderRadius: 8,
  },
  button: {},
});

const Input = ({ sendMessage }) => {
  const [message, setMessage] = useState('');

  const handleChangeText = text => {
    setMessage(text);
  };

  const handleSendMessage = () => {
    sendMessage(message);
    setMessage('');
  };

  return (
    <View style={styles.wrapper}>
      <TextInput
        placeholder="Inserisci il messaggio..."
        value={message}
        onChangeText={handleChangeText}
        style={styles.input}
      />
      <TouchableOpacity onPress={handleSendMessage} style={styles.button}>
        <Ionicons name="ios-paper-plane" size={40} color={Colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

Input.propTypes = {
  sendMessage: PropTypes.func.isRequired,
};

export default Input;
