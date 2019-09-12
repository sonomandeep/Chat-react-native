import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Message from '../components/chat/Message';
import { MainStyles, Colors } from '../style/styles';
import Header from '../components/chat/Header';

class ChatScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: { backgroundColor: Colors.primary },
    headerTitle: <Header user={navigation.state.params.user} />,
  });

  render() {
    const { navigation } = this.props;
    const { messages } = navigation.state.params;

    return (
      <View style={MainStyles.container}>
        {messages.map(message => (
          <Message message={message} key={message._id} />
        ))}
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
