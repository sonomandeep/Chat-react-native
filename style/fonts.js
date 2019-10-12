import colors from './colors';

const fontFamily = {
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
};

export default fonts;
