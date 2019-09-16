import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutAction } from '../store/actions/userActions';
import { getUsersAction, receiveMessageAction } from '../store/actions/chatActions';
import UsersList from '../components/home/UsersList';
import { SocketContext } from '../context/SocketContext';
import Header from '../components/home/Header';

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: <Header handleQueryChange={navigation.getParam('handleQueryChange')} />,
  });

  static getDerivedStateFromProps(nextProps) {
    return {
      users: nextProps.users,
    };
  }

  constructor(props, context) {
    super(props, context);

    const { receiveMessage } = props;
    const { socket } = context;

    socket.on('message', data => {
      receiveMessage(data);
    });

    this.state = {
      users: props.users,
      query: '',
    };
  }

  componentDidMount() {
    const { getUsers, user, navigation } = this.props;
    getUsers(user._id);
    navigation.setParams({ handleQueryChange: this.handleQueryChange });
    // this.sortUsers();
  }

  handleLogout = () => {
    const { logout, navigation } = this.props;
    logout();
    navigation.navigate('Auth');
  };

  handleQueryChange = query => {
    this.setState({ query });
  };

  // compareUsers = (a, b) => {
  //   const aCreatedAt = a.messages[a.messages.length - 1].createdAt;
  //   const bCreatedAt = b.messages[b.messages.length - 1].createdAt;

  //   let comparison = 0;

  //   if (aCreatedAt > bCreatedAt) {
  //     comparison = 1;
  //   } else if (aCreatedAt < bCreatedAt) {
  //     comparison = -1;
  //   }

  //   return comparison;
  // };

  // sortUsers = () => {
  // const sorted = this.state.users.sort(
  //   (a, b) =>
  //     a.messages[a.messages.length - 1].createdAt < b.messages[b.messages.length - 1].createdAt
  // );
  // const sorted = this.state.users.sort((a, b) => {
  //   console.log(
  //     a.messages[a.messages.length - 1].createdAt,
  //     b.messages[b.messages.length - 1].createdAt,
  //     a.messages[a.messages.length - 1].createdAt < b.messages[b.messages.length - 1].createdAt
  //   );
  //   return a.messages[a.messages.length - 1].createdAt >
  //     b.messages[b.messages.length - 1].createdAt
  //     ? 1
  //     : -1;
  // });
  // const sorted = [...this.state.users];
  // sorted.map(u => console.log('Username:', u.user.username));
  // sorted.sort(this.compareUsers);
  // sorted.map(u => console.log('Username:', u.user.username));
  // this.setState({ users: sorted });
  // };

  render() {
    const { query, users } = this.state;

    return <UsersList users={users || []} query={query} />;
  }
}

HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    setParams: PropTypes.func.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
  users: PropTypes.instanceOf(Array),
  logout: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
  receiveMessage: PropTypes.func.isRequired,
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
