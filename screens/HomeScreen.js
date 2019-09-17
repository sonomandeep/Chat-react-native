import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutAction } from '../store/actions/userActions';
import {
  getUsersAction,
  receiveMessageAction,
  setMessageVisualizedAction,
} from '../store/actions/chatActions';
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

    socket.on('visualize', data => {
      props.setMessageVisualized(data);
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
  }

  handleLogout = () => {
    const { logout, navigation } = this.props;
    logout();
    navigation.navigate('Auth');
  };

  handleQueryChange = query => {
    this.setState({ query });
  };

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
  setMessageVisualized: PropTypes.func.isRequired,
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
  {
    logout: logoutAction,
    getUsers: getUsersAction,
    receiveMessage: receiveMessageAction,
    setMessageVisualized: setMessageVisualizedAction,
  }
)(HomeScreen);
