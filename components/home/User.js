import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/it';
import { Colors, Fonts } from '../../style/styles';
import { PLACEHOLDER_IMAGE_LINK, getImageLink } from '../../constants/imageLinks';

const styles = StyleSheet.create({
  user: {
    marginTop: 24,
  },
  inner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    flexDirection: 'row',
    width: '65%',
    alignItems: 'center',
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
  right: { justifyContent: 'center' },
  hour: { ...Fonts.lowContrast },
  newMessages: {
    backgroundColor: Colors.primary,
    width: 12,
    height: 12,
    borderRadius: 500,
    alignSelf: 'center',
  },
});

const User = ({ data, navigation }) => {
  const { user, messages } = data;
  moment.locale('it');

  const getLastReceivedMessage = array => {
    for (let i = 0; i < array.length; i += 1) {
      if (array[i].senderUserID === user._id) {
        return array[i];
      }
    }
    return null;
  };

  const lastReceivedMessage = getLastReceivedMessage(messages);

  const dateToFromNowDaily = date => {
    // ensure the date is displayed with today and yesterday
    return moment(date).calendar(null, {
      // when the date is closer, specify custom values
      lastWeek: 'DD/MM/YY',
      lastDay: '[Ieri]',
      sameDay: 'HH:mm',
      nextDay: '[Domani]',
      nextWeek: 'dddd',

      // when the date is further away, use from-now functionality
      sameElse() {
        return `DD/MM/YY`;
      },
    });
  };

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
            {messages.length > 0 && (
              <Text style={styles.message} numberOfLines={1}>
                {messages[0].message}
              </Text>
            )}
          </View>
        </View>
        {messages.length > 0 && (
          <View style={styles.right}>
            {lastReceivedMessage && !lastReceivedMessage.isVisualized ? (
              <View style={styles.newMessages} />
            ) : null}
            <Text style={styles.hour}>{dateToFromNowDaily(new Date(messages[0].createdAt))}</Text>
          </View>
        )}
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
