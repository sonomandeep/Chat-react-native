import React from 'react';
import { View, Text, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import { MainStyles, Colors } from '../../style/styles';
import SettingsSection from './SettingsSection';

const Settings = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigation.navigate('Auth');
  };

  return (
    <View style={[MainStyles.container, MainStyles.alignCenter, MainStyles.alignCenterVertically]}>
      <Text>Settings Screen</Text>
      <SettingsSection title="title" iconName="user" iconColor={Colors.primary} iconSize={20}>
        <Text>Children</Text>
      </SettingsSection>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

Settings.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default withNavigation(Settings);
