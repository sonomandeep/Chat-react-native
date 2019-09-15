import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Colors } from '../style/styles';
import Header from '../components/chat/Header';
import SocketContextProvider from '../context/SocketContext';
import Chat from '../components/chat/Chat';

class ChatScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: { backgroundColor: Colors.primary },
    headerTitle: <Header user={navigation.state.params.user} />,
  });

  render() {
    return (
      <SocketContextProvider>
        <Chat />
      </SocketContextProvider>
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
