import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutAction } from '../store/actions/userActions';
import { getUsersAction, receiveMessageAction } from '../store/actions/chatActions';
import UsersList from '../components/home/UsersList';
import { SocketContext } from '../context/SocketContext';

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home',
  };

  componentDidMount() {
    const { getUsers, user } = this.props;
    getUsers(user._id);
  }

  handleLogout = () => {
    const { logout, navigation } = this.props;
    logout();
    navigation.navigate('Auth');
  };

  render() {
    const { users, receiveMessage } = this.props;
    const { socket } = this.context;

    socket.on('message', data => {
      console.log('Risolvere il fatto che questa funzione viene invocata 2 volte.');
      receiveMessage(data);
    });

    return <UsersList users={users || []} />;
  }
}

HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
  users: PropTypes.instanceOf(Array),
  logout: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
};

HomeScreen.defaultProps = {
  users: [],
};

HomeScreen.contextType = SocketContext;

const mapStateToProps = state => ({
  user: state.user.user,
  users: state.chat.users,
});

export default connect(
  mapStateToProps,
  { logout: logoutAction, getUsers: getUsersAction, receiveMessage: receiveMessageAction }
)(HomeScreen);
