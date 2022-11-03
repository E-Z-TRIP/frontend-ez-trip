import { useTheme } from '@react-navigation/native';

export function rnPaperTextInputTheme() {
  const { profile } = useTheme();

  return {
    theme: {
      colors: {
        primary: profile.textInputPrimary,
        accent: profile.textInputActive,
        placeholder: profile.textInputPlaceholder,
        text: profile.textInputTxt,
        background: 'transparent',
        error: profile.error,
      },
    },
    underlineColor: profile.textInputUnderline,
    underlineColorAndroid: profile.textInputUnderline,
  };
}
