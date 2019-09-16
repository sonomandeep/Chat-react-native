import React, { useContext, useEffect, useState, createRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import { FlatList } from 'react-native-gesture-handler';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Message from './Message';
import Input from './Input';
import { MainStyles, Colors } from '../../style/styles';
import { SocketContext } from '../../context/SocketContext';
import { sendMessageAction } from '../../store/actions/chatActions';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.lowConstrastGray,
  },
  messageList: {
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: MainStyles.padding.mainPadding,
  },
});

const Chat = ({ navigation }) => {
  const { socket } = useContext(SocketContext);
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  let messageList = createRef();

  const activeUser = useSelector(state =>
    state.chat.users.filter(u => u.user._id === navigation.state.params.user._id)
  );

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages(activeUser[0].messages);
  }, [activeUser]);

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
    <View style={[MainStyles.containerWithoutPadding, styles.wrapper]}>
      <FlatList
        ref={e => {
          messageList = e;
        }}
        style={styles.messageList}
        data={messages}
        renderItem={({ item }) => <Message message={item} />}
        keyExtractor={item => item._id}
        onContentSizeChange={() => messageList.scrollToEnd({ animated: false })}
      />
      <Input sendMessage={sendMessage} />
      <KeyboardSpacer />
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
