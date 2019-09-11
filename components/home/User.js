import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';
import { Colors, Fonts } from '../../style/styles';

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
    width: 40,
    height: 40,
    borderColor: Colors.primary,
    borderWidth: 2,
    borderRadius: 500,
    marginRight: 18,
  },
  name: { ...Fonts.headLine },
  message: { ...Fonts.body },
  hour: { ...Fonts.lowContrast },
});

const User = ({ data }) => {
  const { user, messages } = data;

  console.log('Messaggi', messages[messages.length - 1]);

  return (
    <View style={styles.user}>
      <View style={styles.inner}>
        <View style={styles.left}>
          <Image
            style={styles.profileImage}
            source={{
              uri: user.profileImageURL
                ? `https://localhost:5000/${user.profileImageURL}`
                : 'https://pronksiapartments.ee/wp-content/uploads/2015/10/placeholder-face-big.png',
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
    </View>
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
};

export default User;
