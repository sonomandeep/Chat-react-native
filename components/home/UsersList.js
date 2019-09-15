import React from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import { MainStyles } from '../../style/styles';
import User from './User';

const UsersList = ({ users, query }) => {
  return (
    <View style={[MainStyles.alignCenter, MainStyles.container]}>
      <FlatList
        style={MainStyles.parentFullWidth}
        data={users.filter(u => {
          if (query) {
            return u.user.username.includes(query);
          }
          return u.messages.length > 0;
        })}
        renderItem={({ item }) => <User data={item} />}
        keyExtractor={item => item.user._id}
      />
    </View>
  );
};

UsersList.propTypes = { users: PropTypes.instanceOf(Array), query: PropTypes.string.isRequired };

UsersList.defaultProps = {
  users: [],
};

export default UsersList;
