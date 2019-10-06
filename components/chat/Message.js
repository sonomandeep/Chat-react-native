import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Fonts, Colors } from '../../style/styles';

const styles = StyleSheet.create({
  message: {
    marginTop: 12,
    maxWidth: 240,
  },
  sentMessage: { alignSelf: 'flex-end' },
  messageText: {
    ...Fonts.body,
    color: '#fff',
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 25,
    backgroundColor: Colors.primary,
    borderRadius: 500,
    borderBottomLeftRadius: 0,
  },
  sentMessageText: {
    borderBottomLeftRadius: 500,
    borderBottomRightRadius: 0,
  },
  messageInfo: { marginTop: 2, flexDirection: 'row', alignItems: 'center' },
  sentMessageInfo: {
    justifyContent: 'flex-end',
  },
  messageReadingConfirmations: {
    flexDirection: 'row',
    marginLeft: 5,
    alignItems: 'center',
  },
  circle: {
    marginLeft: 2,
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#bbb',
  },
  circleVisualized: {
    backgroundColor: Colors.primary,
  },
  messageTime: { ...Fonts.lowContrast },
});

const Message = ({ message }) => {
  const [isVisualized, setVisualized] = useState(message.isVisualized);
  const userID = useSelector(state => state.user.user._id);

  const date = new Date(message.createdAt);
  const time = `${`0${date.getHours()}`.slice(-2)}:${`0${date.getMinutes()}`.slice(-2)}`;
  const isSent = message.senderUserID === userID;

  return (
    <View style={isSent ? [styles.message, styles.sentMessage] : styles.message}>
      <Text style={isSent ? [styles.messageText, styles.sentMessageText] : styles.messageText}>
        {message.message}
      </Text>
      <View style={isSent ? [styles.messageInfo, styles.sentMessageInfo] : styles.messageInfo}>
        <Text style={styles.messageTime}>{time}</Text>

        {isSent && (
          <View style={styles.messageReadingConfirmations}>
            <View style={[styles.circle, isVisualized && styles.circleVisualized]} />
          </View>
        )}
      </View>
    </View>
  );
};

Message.propTypes = {
  message: PropTypes.shape({
    message: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    senderUserID: PropTypes.string.isRequired,
    isVisualized: PropTypes.bool.isRequired,
  }).isRequired,
};

export default Message;
