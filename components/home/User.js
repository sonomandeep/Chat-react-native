import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import { Colors, Fonts } from '../../style/styles';
import { PLACEHOLDER_IMAGE_LINK, getImageLink } from '../../constants/imageLinks';

const styles = StyleSheet.create({
  user: {},
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 30,
    width: 360,
  },
  left: {
    flexDirection: 'row',
  },
  profileImage: {
    width: 44,
    height: 44,
    borderColor: Colors.primary,
    borderWidth: 2,
    borderRadius: 500,
    marginRight: 18,
  },
  name: { ...Fonts.headLine },
  message: { ...Fonts.body },
  hour: { ...Fonts.lowContrast },
});

const User = ({ data, navigation }) => {
  const { user, messages } = data;

  return (
    <TouchableOpacity
      style={styles.user}
      onPress={() => navigation.navigate('Chat', { messages, user })}
    >
      <View style={styles.inner}>
        <View style={styles.left}>
          <Image
            style={styles.profileImage}
            source={{
              uri: user.profileImageURL
                ? getImageLink(user.profileImageURL)
                : PLACEHOLDER_IMAGE_LINK,
            }}
          />
          <View>
            <Text style={styles.name}>{user.username}</Text>
            <Text style={styles.message}>
              {messages[messages.length - 1]
                ? messages[messages.length - 1].message
                : 'Acnora nessun messaggio'}
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.hour}>10 min</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

User.propTypes = {
  data: PropTypes.shape({
    messages: PropTypes.instanceOf(Array).isRequired,
    user: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      profileImageURL: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default withNavigation(User);
