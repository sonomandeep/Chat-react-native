import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import { Fonts, Colors, MainStyles } from '../../style/styles';

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.primary,
    height: 140,
    flexDirection: 'column',
    paddingTop: 20,
    justifyContent: 'center',
  },
  title: { ...Fonts.headLine, ...MainStyles.alignCenter, color: '#fff' },
  search: {
    ...Fonts.body,
    width: '70%',
    alignSelf: 'center',
    color: '#fff',
    marginHorizontal: MainStyles.padding.mainPadding,
    marginTop: 16,
    paddingHorizontal: 16,
    borderBottomColor: '#fff',
    borderBottomWidth: 2,
  },
});

const Header = ({ handleQueryChange }) => {
  const [query, setQuery] = useState('');

  const onChangeText = q => {
    setQuery(q);
  };

  useEffect(() => {
    if (handleQueryChange) handleQueryChange(query);
  }, [query]);

  return (
    <View style={styles.header}>
      <Text style={styles.title}>Home</Text>
      <TextInput
        placeholderTextColor="#fff"
        placeholder="Cerca..."
        value={query}
        onChangeText={onChangeText}
        style={styles.search}
      />
    </View>
  );
};

Header.propTypes = {
  handleQueryChange: PropTypes.func,
};

Header.defaultProps = {
  handleQueryChange: null,
};

export default Header;
