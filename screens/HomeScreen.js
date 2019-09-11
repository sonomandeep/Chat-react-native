import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutAction } from '../store/actions/userActions';
import { getUsersAction } from '../store/actions/chatActions';
import UsersList from '../components/home/UsersList';

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
    const { users } = this.props;

    return <UsersList users={users} />;
  }
}

HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  logout: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
  users: PropTypes.instanceOf(Array).isRequired,
};

const mapStateToProps = state => ({
  user: state.user.user,
  users: state.chat.users,
});

export default connect(
  mapStateToProps,
  { logout: logoutAction, getUsers: getUsersAction }
)(HomeScreen);
