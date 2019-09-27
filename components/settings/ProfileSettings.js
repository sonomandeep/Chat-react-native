import React, { useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
import { Fonts, Colors, MainStyles } from '../../style/styles';
import { PLACEHOLDER_IMAGE_LINK, getImageLink } from '../../constants/imageLinks';
import Button from '../input/Button';

const styles = StyleSheet.create({
  wrapper: { marginBottom: 20, width: '100%', paddingHorizontal: 20 },
  imageWrapper: {
    alignItems: 'center',
  },
  profileImage: {
    marginTop: 10,
    width: 60,
    height: 60,
    borderColor: Colors.primary,
    borderWidth: 2,
    borderRadius: 500,
  },
  infoSection: {},
  info: { alignItems: 'center', marginTop: 18 },
  icon: { width: 30, textAlign: 'center' },
  input: {
    ...Fonts.body,
    padding: 0,
    paddingBottom: 2,
    width: '60%',
    marginLeft: 14,
  },
  updatingInput: {
    borderBottomColor: Colors.lowConstrastGray,
    borderBottomWidth: 1,
  },
  buttonSection: {
    flex: 1,
    marginTop: 12,
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cancelButton: { marginRight: 24 },
  button: { paddingHorizontal: 10 },
});

const ProfileSettings = ({ user, data }) => {
  const [isUpdating, setUpdating] = useState(false);
  const [values, setValues] = useState({
    username: user.username,
    email: user.email,
    password: '',
  });
  const [imageUrl, setImageUrl] = useState(null);
  const iconSize = 24;

  const changeUpdating = () => {
    setValues({ username: '', email: '', password: '' });
    setUpdating(true);
  };

  const cancelHandler = () => {
    setValues({
      username: user.username,
      email: user.email,
      password: '',
    });
    setUpdating(false);
  };

  const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const handleImageUpload = () => {
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };

        setImageUrl(source);
      }
    });
  };

  const infoList = data.map(d => (
    <View key={d.id} style={[MainStyles.row, styles.info]}>
      <Icon name={d.iconName} size={iconSize} color={Colors.primary} style={styles.icon} />
      <TextInput
        style={[styles.input, isUpdating && styles.updatingInput]}
        editable={isUpdating}
        value={values[d.fieldName]}
        onChangeText={value => setValues({ ...values, [d.fieldName]: value })}
        placeholder={d.placeHolder}
      />
    </View>
  ));

  return (
    <View style={[styles.wrapper]}>
      <View style={styles.imageWrapper}>
        <TouchableOpacity onPress={handleImageUpload}>
          <Image
            style={styles.profileImage}
            source={{
              uri: user.profileImageURL
                ? getImageLink(user.profileImageURL)
                : PLACEHOLDER_IMAGE_LINK,
            }}
          />
        </TouchableOpacity>
      </View>

      <View>
        <View style={styles.infoSection}>{infoList}</View>

        <View style={styles.buttonSection}>
          {isUpdating && (
            <TouchableOpacity style={styles.cancelButton} onPress={cancelHandler}>
              <Text>Annulla</Text>
            </TouchableOpacity>
          )}
          <Button
            text={isUpdating ? 'Conferma' : 'Modifica'}
            pressHandler={changeUpdating}
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
};

export default ProfileSettings;
