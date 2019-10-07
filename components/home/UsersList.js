import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import { MainStyles } from '../../style/styles';
import User from './User';

const UsersList = ({ users, query }) => {
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    setUsersList([...users]);
  }, [users]);

  return (
    <View style={[MainStyles.alignCenter, { ...MainStyles.container, paddingHorizontal: 0 }]}>
      <FlatList
        style={[MainStyles.parentFullWidth, { paddingHorizontal: 16 }]}
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
