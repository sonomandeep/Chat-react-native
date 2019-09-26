import React, { useState } from 'react';
import { View, Text, StyleSheet, ViewPropTypes } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import { TouchableHighlight, TouchableNativeFeedback } from 'react-native-gesture-handler';
import { Colors, Fonts } from '../../style/styles';

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 8,
    flexDirection: 'column',
    backgroundColor: '#FFF',
    elevation: 2,
  },
  header: {
    flex: 1,
    height: 60,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: { flexDirection: 'row' },
  icon: { paddingRight: 15 },
  title: {},
  right: {},
  childre: {},
});

const SettingsSection = ({ title, iconName, iconSize, iconColor, children, style }) => {
  const [isOpened, setOpened] = useState(false);

  return (
    <View style={[{ ...style }, styles.wrapper]}>
      <View style={styles.header}>
        <View style={styles.left}>
          <Icon style={styles.icon} name={iconName} size={iconSize} color={iconColor} />
          <Text style={{ ...Fonts.headerTwoSemiBold }}>{title}</Text>
        </View>
        <TouchableNativeFeedback onPress={() => setOpened(!isOpened)} style={styles.right}>
          <Icon name={isOpened ? 'angle-up' : 'angle-down'} size={30} color={Colors.primary} />
        </TouchableNativeFeedback>
      </View>
      {isOpened && <View>{children}</View>}
    </View>
  );
};

SettingsSection.propTypes = {
  title: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  iconSize: PropTypes.number.isRequired,
  iconColor: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  style: ViewPropTypes.style,
};

SettingsSection.defaultProps = {
  style: {},
};

export default SettingsSection;
