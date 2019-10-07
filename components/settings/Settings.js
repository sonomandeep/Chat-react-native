import React, { Component } from 'react';
import { View, Button, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import { MainStyles, Colors } from '../../style/styles';
import SettingsSection from './SettingsSection';
import ProfileSettings from './ProfileSettings';
import { logoutAction, setFcmTokenAction } from '../../store/actions/userActions';

const styles = StyleSheet.create({
  main: { backgroundColor: Colors.lowConstrastGray, paddingHorizontal: 0 },
  scrollView: { width: '100%', marginTop: 20 },
  section: {},
});

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        {
          id: uuid(),
          iconName: 'id-card',
          text: props.user.username,
          fieldName: 'username',
          placeHolder: 'Username',
        },
        {
          id: uuid(),
          iconName: 'envelope',
          text: props.user.email,
          fieldName: 'email',
          placeHolder: 'E-mail',
        },
        {
          id: uuid(),
          iconName: 'lock',
          text: 'password',
          fieldName: 'password',
          placeHolder: 'Password',
        },
      ],
    };
  }

  handleLogout = () => {
    const { user, logout, navigation, setFcmToken } = this.props;
    setFcmToken(user._id, '');
    logout();
    navigation.navigate('Auth');
  };

  render() {
    const { data } = this.state;
    const { user } = this.props;
    const iconSize = 28;

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
            <ProfileSettings user={user} data={data} />
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
            <Button title="Logout" onPress={this.handleLogout} />
          </SettingsSection>
        </ScrollView>
      </View>
    );
  }
}

Settings.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  logout: PropTypes.func.isRequired,
  setFcmToken: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return { user: state.user.user };
};

export default connect(
  mapStateToProps,
  { logout: logoutAction, setFcmToken: setFcmTokenAction }
)(withNavigation(Settings));
