import React from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import { MainStyles } from '../../style/styles';
import User from './User';

const UsersList = ({ users }) => {
  return (
    <View style={MainStyles.alignCenter}>
      <FlatList
        data={users}
        renderItem={({ item }) => <User data={item} />}
        keyExtractor={item => item.user._id}
      />
    </View>
  );
};

UsersList.propTypes = { users: PropTypes.instanceOf(Array).isRequired };

export default UsersList;
