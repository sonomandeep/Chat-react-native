import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Message from '../components/chat/Message';
import { MainStyles } from '../style/styles';

const ChatScreen = ({ navigation }) => {
  const { messages } = navigation.state.params;
  return (
    <View style={MainStyles.container}>
      {messages.map(message => (
        <Message message={message} key={message._id} />
      ))}
    </View>
  );
};

ChatScreen.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        messages: PropTypes.instanceOf(Array).isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default ChatScreen;
