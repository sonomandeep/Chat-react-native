import colors from './colors';

const fontFamily = {
  light: 'Montserrat-Light',
  regular: 'Montserrat-Regular',
  medium: 'Montserrat-Medium',
  semiBold: 'Montserrat-SemiBold',
  bold: 'Montserrat-Bold',
};

const fonts = {
  title: {
    fontSize: 44,
    color: colors.primary,
    fontFamily: fontFamily.bold,
  },
  headLine: {
    fontSize: 17,
    color: colors.text,
    fontFamily: fontFamily.medium,
  },
  body: { fontSize: 17, fontFamily: fontFamily.regular, color: colors.text },
  grayText: {
    fontSize: 17,
    color: colors.grayText,
    fontFamily: fontFamily.regular,
  },
  link: {
    fontSize: 17,
    fontFamily: fontFamily.regular,
    color: colors.secondary,
  },
  inputError: { fontSize: 14, fontFamily: fontFamily.light, color: colors.error },
  caption: { fontSize: 14, fontFamily: fontFamily.semiBold, color: colors.grayText },
};

export default fonts;
