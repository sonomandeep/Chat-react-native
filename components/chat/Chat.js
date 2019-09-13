import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import Message from './Message';
import Input from './Input';
import { MainStyles } from '../../style/styles';
import { SocketContext } from '../../context/SocketContext';

const styles = StyleSheet.create({
  messageList: {
    flex: 1,
    alignSelf: 'center',
    width: MainStyles.container.width,
  },
  sendMessageInput: { flex: 1, height: 60 },
});

const Chat = ({ navigation }) => {
  const { messages } = navigation.state.params;
  const { socket } = useContext(SocketContext);
  const user = useSelector(state => state.user.user);

  const sendMessage = message => {
    socket.emit('send_message', {
      _id: '123456789',
      message,
      senderUserID: user._id,
      receiverUserID: navigation.state.params.user._id,
      createdAt: Date.now(),
    });
  };

  return (
    <View style={[MainStyles.container, MainStyles.fullWidth]}>
      <View style={styles.messageList}>
        {messages.map(message => (
          <Message message={message} key={message._id} />
        ))}
      </View>
      <Input sendMessage={sendMessage} />
    </View>
  );
};

Chat.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        messages: PropTypes.instanceOf(Array).isRequired,
        user: PropTypes.shape({
          _id: PropTypes.string.isRequired,
        }),
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default withNavigation(Chat);
