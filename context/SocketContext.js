import React, { Component, createContext } from 'react';
import { connect } from 'react-redux';
import openSocket from 'socket.io-client';
import PropTypes from 'prop-types';
import { API_LINK } from '../constants/apiLinks';

const socket = openSocket(API_LINK, {
  transports: ['websocket'],
  jsonp: false,
});

let newConnection = false;

socket.on('connect', () => {
  console.log('Connesso');
  newConnection = true;
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
    const { children, user } = this.props;

    if (newConnection) {
      socket.emit('new_user', {
        username: user.username,
        _id: user._id,
      });
      newConnection = false;
    }

    return <SocketContext.Provider value={{ ...this.state }}>{children}</SocketContext.Provider>;
  }
}

SocketContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({ user: state.user.user });

export default connect(mapStateToProps)(SocketContextProvider);
