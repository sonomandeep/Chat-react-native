import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Message from '../components/chat/Message';
import { MainStyles, Colors } from '../style/styles';
import Header from '../components/chat/Header';
import Input from '../components/chat/Input';

const styles = StyleSheet.create({
  messageList: {
    flex: 1,
    alignSelf: 'center',
    width: MainStyles.container.width,
  },
  sendMessageInput: { flex: 1, height: 60 },
});

class ChatScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: { backgroundColor: Colors.primary },
    headerTitle: <Header user={navigation.state.params.user} />,
  });

  render() {
    const { navigation } = this.props;
    const { messages } = navigation.state.params;

    return (
      <View style={[MainStyles.container, MainStyles.fullWidth]}>
        <View style={styles.messageList}>
          {messages.map(message => (
            <Message message={message} key={message._id} />
          ))}
        </View>
        <Input />
      </View>
    );
  }
}

ChatScreen.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        messages: PropTypes.instanceOf(Array).isRequired,
        user: PropTypes.shape({
          username: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default ChatScreen;
