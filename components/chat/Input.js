import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Platform } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Colors, Fonts } from '../../style/styles';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: '#ffffff',

    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: { elevation: 5 },
    }),
  },
  input: {
    ...Fonts.body,
    flex: 1,
    marginRight: 16,
    paddingLeft: 16,
    paddingVertical: 8,
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
    <View style={[styles.wrapper]}>
      <TextInput
        placeholder="Inserisci il messaggio..."
        value={message}
        onChangeText={handleChangeText}
        style={styles.input}
      />
      <TouchableOpacity onPress={handleSendMessage} style={styles.button}>
        <Icon name="paper-plane" size={40} color={Colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

Input.propTypes = {
  sendMessage: PropTypes.func.isRequired,
};

export default Input;
