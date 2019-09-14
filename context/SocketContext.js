import React, { Component, createContext } from 'react';
import { connect } from 'react-redux';
import openSocket from 'socket.io-client';
import PropTypes from 'prop-types';
import { API_LINK } from '../constants/apiLinks';
import { receiveMessageAction } from '../store/actions/chatActions';

const socket = openSocket(API_LINK, {
  transports: ['websocket'],
  jsonp: false,
});

socket.on('connect', () => {
  console.log('Connesso');
});

socket.on('message', () => {
  console.log('Messaggio');
});

export const SocketContext = createContext({ socket });

class SocketContextProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      socket,
    };
  }

  render() {
    const { children, receiveMessage } = this.props;

    // socket.on('message', data => {
    //   receiveMessage(data);
    //   console.log('Entrato');
    // });

    return <SocketContext.Provider value={{ ...this.state }}>{children}</SocketContext.Provider>;
  }
}

SocketContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  receiveMessage: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ user: state.user.user });

export default connect(
  mapStateToProps,
  { receiveMessage: receiveMessageAction }
)(SocketContextProvider);
