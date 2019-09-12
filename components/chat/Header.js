import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';
import { Fonts } from '../../style/styles';
import { PLACEHOLDER_IMAGE_LINK, getImageLink } from '../../constants/imageLinks';

const styles = StyleSheet.create({
  wrapper: { flex: 1, alignItems: 'center', flexDirection: 'row' },
  image: {
    width: 40,
    height: 40,
    borderColor: '#fff',
    borderRadius: 20,
    marginRight: 6,
  },
  title: { ...Fonts.headerTwo, color: '#fff' },
});

const Header = ({ user }) => {
  return (
    <View style={styles.wrapper}>
      <Image
        style={styles.image}
        source={{
          uri: user.profileImageURL ? getImageLink(user.profileImageURL) : PLACEHOLDER_IMAGE_LINK,
        }}
      />
      <Text style={styles.title}>{user.username}</Text>
    </View>
  );
};

Header.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    profileImageURL: PropTypes.string.isRequired,
  }).isRequired,
};

export default Header;
