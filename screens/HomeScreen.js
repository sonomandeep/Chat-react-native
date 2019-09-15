import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutAction } from '../store/actions/userActions';
import { getUsersAction, receiveMessageAction } from '../store/actions/chatActions';
import UsersList from '../components/home/UsersList';
import { SocketContext } from '../context/SocketContext';
import CustomTextInput from '../components/input/CustomTextInput';
import { MainStyles, Colors, Fonts } from '../style/styles';

const styles = StyleSheet.create({
  search: {
    ...Fonts.body,
    backgroundColor: Colors.lowConstrastGray,
    marginHorizontal: MainStyles.padding.mainPadding,
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
});

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home',
  };

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
    const { getUsers, user } = this.props;
    getUsers(user._id);
  }

  handleLogout = () => {
    const { logout, navigation } = this.props;
    logout();
    navigation.navigate('Auth');
  };

  handleChangeText = query => {
    this.setState({ query });
  };

  render() {
    const { query, users } = this.state;

    return (
      <>
        <View>
          <CustomTextInput
            placeholder="Cerca..."
            value={query}
            onChangeText={this.handleChangeText}
            style={styles.search}
          />
        </View>
        <UsersList users={users || []} query={query} />
      </>
    );
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
