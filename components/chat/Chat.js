import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import { FlatList } from 'react-native-gesture-handler';
import Message from './Message';
import Input from './Input';
import { MainStyles } from '../../style/styles';
import { SocketContext } from '../../context/SocketContext';
import { sendMessageAction } from '../../store/actions/chatActions';

const styles = StyleSheet.create({
  messageList: {
    flex: 1,
    alignSelf: 'center',
    width: '100%',
  },
  sendMessageInput: { flex: 1, height: 60 },
});

const Chat = ({ navigation }) => {
  // const { messages } = navigation.state.params;
  const { socket } = useContext(SocketContext);
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  const activeUser = useSelector(state =>
    state.chat.users.filter(u => u.user._id === navigation.state.params.user._id)
  );

  const { messages } = activeUser[0];

  const sendMessage = message => {
    const data = {
      _id: uuid(),
      message,
      senderUserID: user._id,
      receiverUserID: navigation.state.params.user._id,
      createdAt: Date(),
    };

    socket.emit('send_message', data);
    dispatch(sendMessageAction(data));
  };

  return (
    <View style={[MainStyles.containerWithoutPadding, MainStyles.fullWidth]}>
      <FlatList
        style={styles.messageList}
        data={messages}
        renderItem={({ item }) => <Message message={item} />}
        keyExtractor={item => item._id}
        initialScrollIndex={messages.length - 1}
      />
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
