import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native-gesture-handler';
import { MainStyles, Colors } from '../../style/styles';
import SettingsSection from './SettingsSection';

const styles = StyleSheet.create({
  main: { backgroundColor: Colors.lowConstrastGray },
  scrollView: { width: '100%' },
  section: {
    marginTop: 20,
  },
});

const Settings = ({ navigation }) => {
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
          iconSize={28}
        >
          <Text>Children</Text>
        </SettingsSection>
        <SettingsSection
          style={styles.section}
          title="Esci"
          iconName="user"
          iconColor={Colors.primary}
          iconSize={28}
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
