import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native-gesture-handler';
import { MainStyles, Colors } from '../../style/styles';
import SettingsSection from './SettingsSection';
import ProfileSettings from './ProfileSettings';

const styles = StyleSheet.create({
  main: { backgroundColor: Colors.lowConstrastGray },
  scrollView: { width: '100%' },
  section: {
    marginTop: 20,
  },
});

const Settings = ({ navigation }) => {
  const iconSize = 28;
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigation.navigate('Auth');
  };

  return (
    <View
      style={[
        MainStyles.container,
        MainStyles.alignCenter,
        MainStyles.alignCenterVertically,
        styles.main,
      ]}
    >
      <ScrollView style={styles.scrollView}>
        <SettingsSection
          style={styles.section}
          title="Profile"
          iconName="user"
          iconColor={Colors.primary}
          iconSize={iconSize}
          defaultOpened
        >
          <ProfileSettings user={user} />
        </SettingsSection>

        <SettingsSection
          style={styles.section}
          title="Statistiche"
          iconName="info"
          iconColor={Colors.primary}
          iconSize={iconSize}
        >
          <View />
        </SettingsSection>

        <SettingsSection
          style={styles.section}
          title="Esci"
          iconName="sign-out"
          iconColor={Colors.primary}
          iconSize={iconSize}
        >
          <Button title="Logout" onPress={handleLogout} />
        </SettingsSection>
      </ScrollView>
    </View>
  );
};

Settings.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default withNavigation(Settings);
