import React, { useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Fonts, Colors, MainStyles } from '../../style/styles';
import { PLACEHOLDER_IMAGE_LINK, getImageLink } from '../../constants/imageLinks';
import Button from '../input/Button';

const styles = StyleSheet.create({
  wrapper: { marginBottom: 20, width: '100%', paddingHorizontal: 20 },
  imageWrapper: {
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderColor: Colors.primary,
    borderWidth: 2,
    borderRadius: 500,
  },
  infoSection: {},
  info: { marginTop: 15 },
  icon: { width: 30, textAlign: 'center' },
  text: { ...Fonts.body, marginLeft: 12 },
  buttonSection: {
    flex: 1,
    width: 100,
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cancelButton: { marginRight: 14 },
  button: {},
  input: { ...Fonts.body, paddingVertical: 0, margin: 0, marginLeft: 12 },
});

const ProfileSettings = ({ user, data, values, onChangeTextHandler }) => {
  const [isUpdating, setUpdating] = useState(false);
  const iconSize = 24;

  const infoList = data.map(d => (
    <View key={d.id} style={[MainStyles.row, styles.info]}>
      <Icon name={d.iconName} size={iconSize} color={Colors.primary} style={styles.icon} />
      <Text style={styles.text}>{d.text}</Text>
    </View>
  ));

  const updatingInfoList = data.map(d => (
    <View key={d.id} style={[MainStyles.row, styles.info]}>
      <Icon name={d.iconName} size={iconSize} color={Colors.primary} style={styles.icon} />
      <TextInput
        style={styles.input}
        value={values[d.fieldName]}
        onChangeText={value => onChangeTextHandler(value, d.fieldName)}
        placeholder={d.placeHolder}
      />
    </View>
  ));

  return (
    <View style={[styles.wrapper]}>
      <View style={styles.imageWrapper}>
        <Image
          style={styles.profileImage}
          source={{
            uri: user.profileImageURL ? getImageLink(user.profileImageURL) : PLACEHOLDER_IMAGE_LINK,
          }}
        />
      </View>

      <View>
        <View style={styles.infoSection}>{isUpdating ? updatingInfoList : infoList}</View>

        <View style={styles.buttonSection}>
          {isUpdating && (
            <TouchableOpacity style={styles.cancelButton} onPress={() => setUpdating(false)}>
              <Text>Annulla</Text>
            </TouchableOpacity>
          )}
          <Button
            text={isUpdating ? 'Conferma' : 'Modifica'}
            pressHandler={() => setUpdating(true)}
            style={styles.button}
          />
        </View>
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
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      iconName: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      fieldName: PropTypes.string.isRequired,
      placeHolder: PropTypes.string.isRequired,
    })
  ).isRequired,
  values: PropTypes.instanceOf(Object).isRequired,
  onChangeTextHandler: PropTypes.func.isRequired,
};

export default ProfileSettings;
