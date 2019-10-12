import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const Colors = {
  primary: '#33E1ED',
  primaryDark: '#29C1E1',
  secondary: '#FF6935',
  text: '#343434',
  grayText: '#B2B2B2',
  white: '#FFFFFF',
  gray: '#444',
  black: '#111111',
  lightGray: '#707070',
  error: '#F44336',
  errorBackground: 'rgba(244,67,54,0.2)',
  lowConstrastGray: '#F3F3F3',
  backgroud: '#F0F0F0',
  screenBackgound: '#F6F6F6',
  lightTextGray: '#B6B6B6',
};

export const Fonts = {
  title: { fontSize: 34, fontWeight: 'bold', color: Colors.black },
  headerOne: { fontSize: 28, fontWeight: 'normal', color: Colors.black },
  headerTwo: { fontSize: 22, fontWeight: 'normal', color: Colors.black },
  headerTwoSemiBold: { fontSize: 22, fontWeight: '600', color: Colors.black },
  headLine: { fontSize: 17, fontWeight: '500', color: Colors.gray },
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
  row: { flexDirection: 'row' },
  input: {
    ...Fonts.body,
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    margin: 0,
    borderRadius: 12,
    elevation: 1,
  },
};

const utils = {
  fontFamily: {
    regular: 'Montserrat-Regular',
    medium: 'Montserrat-Medium',
    semiBold: 'Montserrat-SemiBold',
    bold: 'Montserrat-Bold',
  },
  center: { alignItems: 'center' },
  padding: { screenPadding: 20 },
};

export const theme = {
  fonts: {
    title: {
      fontSize: 44,
      color: Colors.primary,
      fontFamily: utils.fontFamily.bold,
    },
    headLine: {
      fontSize: 17,
      color: Colors.text,
      fontFamily: utils.fontFamily.medium,
    },
    body: { fontSize: 44 },
    grayText: {
      fontSize: 17,
      color: Colors.grayText,
      fontFamily: utils.fontFamily.regular,
    },
  },
  screen: {
    container: {},
    content: { paddingHorizontal: utils.padding.screenPadding },
  },
  components: {
    primaryButton: {
      button: {
        ...utils.center,
        backgroundColor: Colors.primary,
        paddingVertical: 15,
        borderRadius: 500,
      },
      text: {
        fontSize: 17,
        color: Colors.white,
        fontWeight: '600',
      },
    },
    input: {
      padding: 0,
      margin: 0,
      paddingBottom: 8,
      placeholderColor: Colors.grayText,
      borderBottomColor: Colors.grayText,
      borderBottomWidth: 0.5,
      fontFamily: utils.fontFamily.regular,
    },
  },
};
