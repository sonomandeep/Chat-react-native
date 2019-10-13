import React, { Component } from 'react';
import { AppState } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { exitAppAction } from '../../store/actions/userActions';
import { SocketContext } from '../../context/SocketContext';
import { setUserOfflineAction, setUserOnlineAction } from '../../store/actions/chatActions';

class Middleware extends Component {
  constructor(props, context) {
    super(props);

    const { socket } = context;
    const { setUserOffline, setUserOnline } = props;

    // socket.on('user_online', data => setUserOnline(data._id));
    socket.on('user_offline', data => setUserOffline(data.user._id));

    this.state = { socket };
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = nextAppState => {
    const { socket } = this.state;
    const { user } = this.props;
    if (!user) return;
    if (nextAppState === 'background') {
      socket.emit('user_exit', { _id: user._id });
    } else if (nextAppState) {
      socket.emit('user_active', { _id: user._id });
    }
    console.log('NextAppState:', nextAppState);
    // this.props.exitApp();
  };

  render() {
    const { children } = this.props;
    return <>{children}</>;
  }
}

Middleware.contextType = SocketContext;

Middleware.propTypes = {
  children: PropTypes.node.isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
  setUserOffline: PropTypes.func.isRequired,
  setUserOnline: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ user: state.user.user });

const mapDispatchToProps = {
  exitApp: exitAppAction,
  setUserOffline: setUserOfflineAction,
  setUserOnline: setUserOnlineAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Middleware);
