import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import { MainStyles } from '../../style/styles';
import User from './User';

const UsersList = ({ users, query }) => {
  const [usersList, setUsersList] = useState([]);

  const compareUsers = (a, b) => {
    const aCreatedAt = a.messages[a.messages.length - 1].createdAt;
    const bCreatedAt = b.messages[b.messages.length - 1].createdAt;

    let comparison = 0;

    if (aCreatedAt < bCreatedAt) {
      comparison = 1;
    } else if (aCreatedAt > bCreatedAt) {
      comparison = -1;
    }

    return comparison;
  };

  useEffect(() => {
    setUsersList([...users.sort(compareUsers)]);
  }, [users]);

  return (
    <View style={[MainStyles.alignCenter, MainStyles.container]}>
      <FlatList
        style={MainStyles.parentFullWidth}
        data={usersList.filter(u => {
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
