import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
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

  useEffect(() => {
    setOnline(foundUser.isOnline);
  }, [foundUser]);

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
        <Text style={styles.status}>{isOnline ? 'online' : 'Ultimo accesso'}</Text>
      </View>
    </TouchableOpacity>
  );
};

Header.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    profileImageURL: PropTypes.string.isRequired,
  }),
};

export default Header;
