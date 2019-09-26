import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';

const SettingsSection = ({ title, iconName, iconSize, iconColor, children }) => {
  return (
    <View>
      <View>
        <Icon name={iconName} size={iconSize} color={iconColor} />
        <Text>{title}</Text>
      </View>
      <View>{children}</View>
    </View>
  );
};

SettingsSection.propTypes = {
  title: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  iconSize: PropTypes.number.isRequired,
  iconColor: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default SettingsSection;
