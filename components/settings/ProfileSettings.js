import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Fonts, Colors, MainStyles } from '../../style/styles';
import { PLACEHOLDER_IMAGE_LINK, getImageLink } from '../../constants/imageLinks';

const styles = StyleSheet.create({
  wrapper: { marginBottom: 20 },
  profileImage: {
    width: 50,
    height: 50,
    borderColor: Colors.primary,
    borderWidth: 2,
    borderRadius: 500,
  },
});

const ProfileSettings = ({ user }) => {
  console.log('User:', user);

  return (
    <View style={[{ ...MainStyles.alignCenter }, styles.wrapper]}>
      <View>
        <Image
          style={styles.profileImage}
          source={{
            uri: user.profileImageURL ? getImageLink(user.profileImageURL) : PLACEHOLDER_IMAGE_LINK,
          }}
        />
      </View>
    </View>
  );
};

ProfileSettings.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    profileImageURL: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProfileSettings;
