import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Colors } from '../style/styles';
import Header from '../components/chat/Header';
import { SocketContext } from '../context/SocketContext';
import Chat from '../components/chat/Chat';

class ChatScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: { backgroundColor: Colors.primary },
    headerTitle: <Header user={navigation.state.params.user} />,
  });

  constructor(props, context) {
    super(props, context);

    const { navigation, user } = props;
    const { socket } = context;

    console.log(navigation.state.params.user);
    // socket.emit('visualize', { receiver: navigation.state.params.user, sender: user });
  }

  render() {
    return <Chat />;
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
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

ChatScreen.contextType = SocketContext;

const mapStateToProps = state => {
  return { user: state.user.user };
};

export default connect(mapStateToProps)(ChatScreen);
