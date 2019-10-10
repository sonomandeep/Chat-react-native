import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Fonts, Colors } from '../../style/styles';
import { PLACEHOLDER_IMAGE_LINK, getImageLink } from '../../constants/imageLinks';

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.primary,
  },
  content: {
    justifyContent: 'center',
  },
  image: {
    width: 36,
    height: 36,
    borderColor: '#fff',
    borderRadius: 20,
    marginRight: 10,
  },
  title: { ...Fonts.headLine, color: '#fff' },
  status: { ...Fonts.lowContrast, color: '#fff' },
});

const Header = ({ user }) => {
  const foundUser = useSelector(state => state.chat.users.find(u => u.user._id === user._id).user);
  const [isOnline, setOnline] = useState(foundUser.isOnline);
  const [lastAccess, setLastAccess] = useState(foundUser.lastAccess);

  useEffect(() => {
    setOnline(foundUser.isOnline);
    setLastAccess(foundUser.lastAccess);
  }, [foundUser]);

  const formatLastAccess = date => {
    return date
      ? moment(date).calendar(null, {
          sameDay: '[Oggi alle] HH:mm',
          lastDay: '[Ieri alle] HH:mm',
          sameElse: 'll [alle] HH:mm',
        })
      : '';
  };

  return (
    <TouchableOpacity onPress={() => console.log('Premuto')} style={styles.wrapper}>
      <Image
        style={styles.image}
        source={{
          uri: user.profileImageURL ? getImageLink(user.profileImageURL) : PLACEHOLDER_IMAGE_LINK,
        }}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{user.username}</Text>
        <Text style={styles.status}>{isOnline ? 'online' : `${formatLastAccess(lastAccess)}`}</Text>
      </View>
    </TouchableOpacity>
  );
};

Header.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    profileImageURL: PropTypes.string.isRequired,
  }).isRequired,
};

export default Header;
