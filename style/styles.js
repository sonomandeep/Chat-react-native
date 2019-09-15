import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
// const { height } = Dimensions.get('window');

export const Colors = {
  primary: '#33E1ED',
  black: '#111111',
  gray: '#333333',
  lightGray: '#707070',
  error: '#F44336',
  errorBackground: 'rgba(244,67,54,0.2)',
  lowConstrastGray: '#F3F3F3',
};

export const Fonts = {
  title: { fontSize: 34, fontWeight: 'bold', color: Colors.black },
  headerOne: { fontSize: 28, fontWeight: 'normal', color: Colors.black },
  headerTwo: { fontSize: 22, fontWeight: 'normal', color: Colors.black },
  headLine: { fontSize: 17, fontWeight: '600', color: Colors.gray },
  body: { fontSize: 17, fontWeight: 'normal', color: Colors.gray },
  lowContrast: { fontSize: 15, fontWeight: '200', color: Colors.lightGray },
};

export const MainStyles = {
  alignCenter: { alignItems: 'center', alignSelf: 'center' },
  container: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 16,
  },
  containerWithoutPadding: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
  },
  alignCenterVertically: { justifyContent: 'center' },
  fullWidth: { width },
  parentFullWidth: { width: '100%' },
  padding: { mainPadding: 16 },
};
