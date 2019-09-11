import React from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, Button } from 'react-native';
import { MainStyles } from '../style/styles';
import { loginAction } from '../store/actions/userActions';

const SettingsScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigation.navigate('Auth');
  };

  return (
    <View style={[MainStyles.container, MainStyles.alignCenter, MainStyles.alignCenterVertically]}>
      <Text>Settings Screen</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default SettingsScreen;
