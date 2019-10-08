import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
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

const Header = ({ user, navigation }) => {
  const [isOnline, setOnline] = useState(user.isOnline);

  useEffect(() => {
    console.log('Cambiato');
    setOnline(user.isOnline);
  }, [user]);

  useEffect(() => {
    console.log('Parametri aggiornati');
    console.log(navigation.getParam('user'));
  }, [navigation]);

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
    username: PropTypes.string.isRequired,
    profileImageURL: PropTypes.string.isRequired,
    isOnline: PropTypes.bool,
  }),
};

Header.defaultProps = {
  user: { isOnline: false },
};

export default withNavigation(Header);
