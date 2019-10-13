import fonts from './fonts';
import colors from './colors';
import utils from './utils';

const components = {
  primaryButton: {
    button: {
      ...utils.center,
      backgroundColor: colors.primary,
      paddingVertical: 15,
      borderRadius: 500,
    },
    text: {
      fontSize: 17,
      color: colors.white,
      fontWeight: '600',
    },
  },
  input: {
    ...fonts.body,
    padding: 0,
    margin: 0,
    paddingBottom: 8,
    borderBottomColor: colors.grayText,
    borderBottomWidth: 0.5,
  },
  inputPlaceholder: {
    color: colors.lightGray,
  },
  backIcon: {
    width: 30,
  },
};

export default components;
